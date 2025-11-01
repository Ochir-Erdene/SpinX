"use client";

import Card from "@/components/ui/card";
import productsData from "@/data/products.json";
import Marquee from "react-fast-marquee";

export default function Home() {
  const products = productsData.products;

  // Get featured products for the hero section
  const heroProduct = products.find((p) => p.id === "acme-tshirt-003"); // Circles T-Shirt
  const bagProduct = products.find((p) => p.id === "acme-bag-001"); // Tote Bag
  const cupProduct = products.find((p) => p.id === "acme-cup-001"); // Ceramic Mug

  // Get products for carousel (showing a selection of products)
  const carouselProducts = [
    products.find((p) => p.id === "acme-cup-001"),
    products.find((p) => p.id === "acme-hoodie-001"),
    products.find((p) => p.id === "acme-onesie-001"),
    products.find((p) => p.id === "acme-baby-cap-001"),
  ].filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <>
      {/* Hero Grid Section */}
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        {/* Hero Card - Takes up 4 columns and 2 rows on desktop */}
        <div className="md:col-span-4 md:row-span-2">
          {heroProduct && (
            <Card
              id={heroProduct.id}
              name={heroProduct.name}
              price={heroProduct.price}
              image={heroProduct.images[0]}
              size="hero"
              className="relative block aspect-square h-full w-full"
            />
          )}
        </div>

        {/* Large Card - Top Right */}
        <div className="md:col-span-2 md:row-span-1">
          {bagProduct && (
            <Card
              id={bagProduct.id}
              name={bagProduct.name}
              price={bagProduct.price}
              image={bagProduct.images[0]}
              size="large"
              className="relative block aspect-square h-full w-full"
            />
          )}
        </div>

        {/* Large Card - Bottom Right */}
        <div className="md:col-span-2 md:row-span-1">
          {cupProduct && (
            <Card
              id={cupProduct.id}
              name={cupProduct.name}
              price={cupProduct.price}
              image={cupProduct.images[0]}
              size="large"
              className="relative block aspect-square h-full w-full"
            />
          )}
        </div>
      </section>

      {/* Horizontal Scrolling Carousel Section */}
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4">
          {carouselProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              size="carousel"
            />
          ))}
          {/* Duplicate products for infinite scroll effect */}
          {carouselProducts.map((product) => (
            <Card
              key={`${product.id}-duplicate`}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              size="carousel"
            />
          ))}
        </ul>
      </div>
    </>
  );
}
