"use client";
import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Categories = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams(); // Use searchParams to get current query params
  const [category, setCategory] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category");
    setCategory(currentCategory || ""); // Set the category from query params if exists
  }, [searchParams]);

  const handleTags = (tag: string) => {
    setCategory(tag);
    router.push(`${path}?category=${tag}`);
  };

  const clearFilter = () => {
    setCategory(""); // Reset state
    router.replace(path); // Clear category in URL
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="gap-2 flex overflow-auto">
        <button
          className={`font-normal px-4 py-3 rounded-lg whitespace-nowrap capitalize`}
          type="button"
          onClick={clearFilter} // Use clearFilter to reset
        >
          Clear Filter
        </button>
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg whitespace-nowrap capitalize`}
            type="button"
            onClick={() => handleTags(filter)}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
