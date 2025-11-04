"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchButton() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <form
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search for products..."
        autoComplete="off"
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 focus:outline-none focus:border-neutral-600 transition-colors"
        name="q"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center pointer-events-none">
        <Search className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
      </div>
    </form>
  );
}