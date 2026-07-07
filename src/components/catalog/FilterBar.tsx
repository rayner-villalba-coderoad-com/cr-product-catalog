"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

/**
 * FilterBar — category filter control for the product catalog.
 *
 * Reads and writes the `categories` filter via `useCatalog()`. Must be rendered
 * inside a `<CatalogProvider>` — throws if the context is missing.
 *
 * @example
 * <CatalogProvider>
 *   <FilterBar />
 * </CatalogProvider>
 */
export default function FilterBar() {
  const { filters, toggleCategory, setCategory, setSortOrder } = useCatalog();

  const hasActiveFilters =
    filters.categories.length > 0 || filters.sortOrder !== null;

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Filter by category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, value }) => {
            const isActive = filters.categories.includes(value);
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
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setCategory([]);
                setSortOrder(null);
              }}
              className="ml-4 text-sm underline text-gray-600 hover:text-gray-900"
            >
              Clear all filters
            </button>
          )}
        </div>
      </fieldset>
      {filters.categories.length > 0 && (
        <div className="mt-2 flex items-center gap-2" aria-live="polite">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 rounded bg-gray-900 px-2 py-1 text-xs text-white"
            >
              {cat}
              <button
                type="button"
                aria-label={`Remove ${cat} filter`}
                onClick={() => toggleCategory(cat)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}