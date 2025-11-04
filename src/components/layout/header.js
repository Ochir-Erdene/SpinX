"use client";

import Link from "next/link";
import { useState } from "react";
import SearchButton from "@/components/ui/search";

const menuItems = [
  { name: "All", href: "/search" },
  { name: "La Male", href: "/search/la-male" },
  { name: "Le Beau", href: "/search/le-beau" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto max-w-screen-2xl px-4 py-4">
        <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-4">
          <div className="flex items-center gap-6">
          <Link
      href="/"
      className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
    >
      <div className="flex flex-none items-center justify-center  bg-white mb-1 dark:bg-black">
        <img
          src="/icons/logo.png"
          alt="SpinX Logo"
          className="h-6 w-6"
        />
      </div>
      <span className=" mb-1 font-bold">
        SpinX
      </span>
    </Link>
            <nav className="flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-sm text-neutral-500 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex justify-center">
            <SearchButton />
          </div>
          <div className="flex justify-end">
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4 lg:hidden">
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-sm text-neutral-500 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex justify-center">
            <SearchButton />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            <SearchButton />
            <nav className="flex flex-col gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 text-sm text-neutral-500 transition-colors hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
