"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";

const CATEGORIES: { label: string; value: Category | null }[] = [
  { label: "All", value: null },
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

export default function FilterBar() {
  const { filters, setCategory } = useCatalog();

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Category
      </legend>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => {
          const isActive = filters.category === value;
          return (
            <label
              key={label}
              className={`cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1 ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              <input
                type="radio"
                name="category-filter"
                className="sr-only"
                checked={isActive}
                onChange={() => setCategory(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
