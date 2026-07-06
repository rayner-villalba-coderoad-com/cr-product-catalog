"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";

/**
 * Available filter options. `value: null` represents the "All" / no-filter state.
 */
const CATEGORIES: { label: string; value: Category | null }[] = [
  { label: "All", value: null },
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

/**
 * FilterBar — category filter control.
 *
 * Reads and writes `filters.categories` from `CatalogContext`.
 * Must be rendered inside `<CatalogProvider>`.
 */
export default function FilterBar() {
  const { filters, toggleCategory } = useCatalog();

  return (
    <fieldset>
      <legend className="sr-only">Filter by category</legend>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => {
          const isActive =
            value === null
              ? filters.categories.length === 0
              : filters.categories.includes(value);
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
                type="checkbox"
                name="category-filter"
                className="sr-only"
                checked={isActive}
                onChange={() => toggleCategory(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}