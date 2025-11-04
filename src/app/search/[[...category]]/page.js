"use client";

import { use, useState } from "react";
import Card from "@/components/ui/card";
import productsData from "@/data/products.json";
import Link from "next/link";

const categories = [
  { name: "All", value: "" },
  { name: "La Male", value: "la-male" },
  { name: "Le Beau", value: "le-beau" },
  { name: "Scandal", value: "scandal" },
  { name: "Gaultier Divine", value: "divine" },
  { name: "La Belle", value: "la-belle" },
  { name: "Yves Saint Laurent", value: "ysl" },
];

const categories2 = [
  { name: "Relevance" },
  { name: "Trending" },
  { name: "Latest arrivals" },
  { name: "Price: Low to high" },
  { name: "Price: High to low" },
];

export default function SearchPage({ params, searchParams }) {
  const { category } = use(params);
  const { q } = use(searchParams);
  const selectedCategory = category?.[0] || "";

  const [activeSort, setActiveSort] = useState("Relevance");

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
      const firstCategory = filteredProducts[0].category;
      const allSameCategory = filteredProducts.every(
        (p) => p.category === firstCategory
      );
      return allSameCategory ? firstCategory : "";
    }
    return selectedCategory;
  })();

  const currentCategoryName =
    categories.find((category) => category.value === selectedCategory)?.name ||
    "All";

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col md:flex-row gap-8 px-4 pb-4 text-black dark:text-white">
      {/* Sidebar Navigation */}
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
            Collections
          </h3>

          {/* Desktop Navigation */}
          <ul className="hidden md:block">
            {categories.map((category) => {
              const isActive = detectedCategory === category.value;
              const href =
                category.value === "" ? "/search" : `/search/${category.value}`;

              return (
                <li
                  key={category.value}
                  className="mt-2 flex text-black dark:text-white"
                >
                  <Link
                    href={href}
                    className={`w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 ${
                      isActive ? "underline font-medium" : ""
                    }`}
                  >
                    {category.name}
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
              There are no products that match{" "}
              <span className="font-bold">&quot;{q}&quot;</span>
            </p>
          </div>
        )}
      </div>

      {/* Right Sidebar - Sort by */}
      <div className="order-last w-full flex-none md:max-w-[125px] md:order-last">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
            Sort by
          </h3>
          <ul className="hidden md:block ">
            {categories2.map((cati) => {
              const isActive = activeSort === cati.name;
              return (
                <li
                  key={cati.name}
                  className="mt-2 flex text-black dark:text-white"
                >
                  <button
                    onClick={() => setActiveSort(cati.name)}
                    className={`w-full text-start text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 ${
                      isActive ? "underline font-medium" : ""
                    }`}
                  >
                    {cati.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}