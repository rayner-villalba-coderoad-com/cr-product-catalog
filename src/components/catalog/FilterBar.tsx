"use client";

/**
 * FilterBar — renders a checkbox group for filtering the product catalog
 * by category (All, Tops, Bottoms, Outerwear). Multiple categories can be
 * selected simultaneously.
 *
 * Must be rendered inside a <CatalogProvider>. Reads and updates
 * `filters.categories` via the CatalogContext `toggleCategory` and
 * `clearAllFilters` actions. Also syncs active filters to URL search params
 * so that filters persist after page refresh.
 *
 * @see CatalogContext
 * @see SortControls for the companion price-sort control
 */

import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

export default function FilterBar() {
  const { filters, toggleCategory, clearAllFilters } = useCatalog();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleToggle = (value: Category) => {
    toggleCategory(value);

    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("category");
    if (current.includes(value)) {
      // Remove this category from params
      params.delete("category");
      current
        .filter((c) => c !== value)
        .forEach((c) => params.append("category", c));
    } else {
      params.append("category", value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleClearAll = () => {
    clearAllFilters();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("sort");
    router.push(`/products?${params.toString()}`);
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.sortOrder !== null;

  return (
    <div>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-gray-700">
          Category
        </legend>
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
                  onChange={() => handleToggle(value)}
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearAll}
          className="mt-2 text-sm text-red-600 underline hover:text-red-800"
        >
          Clear all filters
        </button>
      )}

      {/* ARIA live region to announce active filter state to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {filters.categories.length > 0
          ? `Filtering by ${filters.categories.join(", ")}`
          : "Showing all categories"}
      </div>
    </div>
  );
}