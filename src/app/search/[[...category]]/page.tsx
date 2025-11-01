"use client";

import { use } from "react";
import Card from "@/components/ui/card";
import productsData from "@/data/products.json";
import Link from "next/link";

const categories = [
  { name: "All", value: "" },
  { name: "Bags", value: "bags" },
  { name: "Drinkware", value: "drinkware" },
  { name: "Electronics", value: "electronics" },
  { name: "Footwear", value: "footwear" },
  { name: "Headwear", value: "headwear" },
  { name: "Hoodies", value: "hoodies" },
  { name: "Jackets", value: "jackets" },
  { name: "Kids", value: "kids" },
  { name: "Pets", value: "pets" },
  { name: "Shirts", value: "shirts" },
  { name: "Stickers", value: "stickers" },
];

export default function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ category?: string[] }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category } = use(params);
  const { q } = use(searchParams);
  const selectedCategory = category?.[0] || "";

  // Filter products based on selected category and search query
  let filteredProducts =
    selectedCategory === ""
      ? productsData.products
      : productsData.products.filter(
          (product) => product.category === selectedCategory
        );

  // Apply search filter if there's a search query from URL
  if (q && q.trim()) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Detect which category to highlight based on search results
  const detectedCategory = (() => {
    if (selectedCategory) return selectedCategory;
    if (filteredProducts.length > 0 && q && q.trim()) {
      // If all filtered products belong to the same category, highlight that category
      const firstCategory = filteredProducts[0].category;
      const allSameCategory = filteredProducts.every(
        (p) => p.category === firstCategory
      );
      return allSameCategory ? firstCategory : "";
    }
    return selectedCategory;
  })();

  const currentCategoryName =
    categories.find((cat) => cat.value === selectedCategory)?.name || "All";

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      {/* Sidebar Navigation */}
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
            Collections
          </h3>

          {/* Desktop Navigation */}
          <ul className="hidden md:block">
            {categories.map((cat) => {
              const isActive = detectedCategory === cat.value;
              const href = cat.value === "" ? "/search" : `/search/${cat.value}`;

              return (
                <li
                  key={cat.value}
                  className="mt-2 flex text-black dark:text-white"
                >
                  <Link
                    href={href}
                    className={`w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 ${
                      isActive ? "underline font-medium" : ""
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Dropdown */}
          <ul className="md:hidden">
            <div className="relative">
              <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
                <div>{currentCategoryName}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </ul>
        </nav>
      </div>

      {/* Products Grid */}
      <div className="order-last min-h-screen w-full md:order-none">
        {/* Products Grid or No Results */}
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                size="grid"
              />
            ))}
          </ul>
        ) : (
          <div className="py-3">
            <p className="text-md text-black dark:text-white">
              There are no products that match <span className="font-bold">&quot;{q}&quot;</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
