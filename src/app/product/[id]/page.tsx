"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/card";
import AddToCart from "@/components/ui/add-to-cart";
import VariantSelector from "@/components/ui/variant-selector";
import productsData from "@/data/products.json";
import { useState, use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = productsData.products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const canAddToCart = selectedColor !== null && selectedSize !== null;

  // Function to handle color selection and update image
  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    // Find the color object and get its image
    const color = product.colors?.find((c) => c.value === colorValue);
    if (color && color.image) {
      // Find the index of this image in the product images array
      const imageIndex = product.images.findIndex((img) => img === color.image);
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Get related products (fixed selection for all products)
  const relatedProducts = productsData.products
    .filter((p) => p.id !== product.id)
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        {/* Left: Image Gallery */}
        <div className="h-full w-full basis-full lg:basis-4/6">
          {/* Main Image */}
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
            <Image
              alt={product.name}
              src={product.images[selectedImageIndex]}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-full w-full object-contain"
              priority
            />

            {/* Image Navigation Buttons */}
            {product.images.length > 1 && (
              <div className="absolute bottom-[15%] flex w-full justify-center">
                <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous product image"
                    className="flex h-full items-center justify-center px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>
                  <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next product image"
                    className="flex h-full items-center justify-center px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <ul className="my-12 flex flex-wrap items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
            {product.images.map((image, index) => (
              <li key={index} className="h-20 w-20">
                <button
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <div
                    className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black ${
                      index === selectedImageIndex
                        ? "border-2 border-blue-600"
                        : "border-neutral-200 dark:border-neutral-800"
                    }`}
                  >
                    <Image
                      alt={`${product.name} - ${index + 1}`}
                      src={image}
                      width={80}
                      height={80}
                      className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Product Details */}
        <div className="basis-full lg:basis-2/6">
          {/* Product Title & Price */}
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <p>
                ${product.price.toFixed(2)}
                <span className="ml-1 inline">USD</span>
              </p>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <VariantSelector
              title="Color"
              variants={product.colors}
              selectedValue={selectedColor}
              onSelect={handleColorSelect}
              isAvailable={product.inStock}
            />
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <VariantSelector
              title="Size"
              variants={product.sizes.map((size) => ({
                name: size,
                value: size,
              }))}
              selectedValue={selectedSize}
              onSelect={setSelectedSize}
              isAvailable={product.inStock}
            />
          )}

          {/* Product Description */}
          <div className="prose mx-auto mb-6 max-w-6xl text-sm leading-tight text-black dark:text-white/60">
            {product.description}
          </div>

          {/* Add to Cart Button */}
          <AddToCart disabled={!canAddToCart} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-8">
          <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
          <ul className="flex w-full gap-4 overflow-x-auto pt-1">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                price={relatedProduct.price}
                image={relatedProduct.images[0]}
                size="grid"
                className="w-full flex-none md:w-1/3"
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
