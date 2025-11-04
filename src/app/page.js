"use client";

import Card from "@/components/ui/card";
import productsData from "@/data/products.json";
import Marquee from "react-fast-marquee";

export default function Home() {
  const products = productsData.products;

  // Hero and featured products
  const heroProduct = products.find((p) => p.id === "jpg-le-male-elixir-collector"); // Circles T-Shirt
  const bagProduct = products.find((p) => p.id === "jpg-la-male-elixir"); // Tote Bag
  const cupProduct = products.find((p) => p.id === "jpg-la-male"); // Ceramic Mug

  // Products for carousel
  const carouselProducts = [
    "le-beau-flower",
    "jpg-le-beau-le-parfum",
    "scandal-pour-homme-absolu",
    "la-belle-paradise",
  ]
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => p !== undefined);

  return (
    <>
      {/* Hero Grid Section */}
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        {/* Hero Card */}
        {heroProduct && (
          <div className="md:col-span-4 md:row-span-2">
            <Card
              id={heroProduct.id}
              name={heroProduct.name}
              price={heroProduct.price}
              image={heroProduct.images[0]}
              size="hero"
              className="relative block aspect-square h-full w-full"
            />
          </div>
        )}

        {/* Top Right Large Card */}
        {bagProduct && (
          <div className="md:col-span-2 md:row-span-1">
            <Card
              id={bagProduct.id}
              name={bagProduct.name}
              price={bagProduct.price}
              image={bagProduct.images[0]}
              size="large"
              className="relative block aspect-square h-full w-full"
            />
          </div>
        )}

        {/* Bottom Right Large Card */}
        {cupProduct && (
          <div className="md:col-span-2 md:row-span-1">
            <Card
              id={cupProduct.id}
              name={cupProduct.name}
              price={cupProduct.price}
              image={cupProduct.images[0]}
              size="large"
              className="relative block aspect-square h-full w-full"
            />
          </div>
        )}
      </section>

      {/* Horizontal Scrolling Carousel */}
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <Marquee speed={30}>
          <ul className="flex gap-4">
            {carouselProducts.concat(carouselProducts).map((product, index) => (
              <Card
                key={`${product.id}-${index}`}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                size="carousel"
              />
            ))}
          </ul>
        </Marquee>
      </div>
    </>
  );
}