"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

const CATEGORY_FILTER_NAME = "category-filter" as const;

interface FilterBarProps {
  activeCategories?: Category[];
  onCategoryChange?: (category: Category) => void;
}

/**
 * FilterBar — category filter UI for the product catalog.
 *
 * Reads the active categories from {@link CatalogContext} and writes back via
 * `setCategories`. Must be rendered inside a `<CatalogProvider>`.
 *
 * Also syncs filter state into URL query parameters via Next.js `useRouter`.
 *
 * Renders a `<fieldset>` with one checkbox per {@link Category} literal
 * defined in `src/types/product.ts`, plus a "Clear all filters" control
 * when any filter is active.
 */
export default function FilterBar({
  activeCategories: propActiveCategories,
  onCategoryChange: propOnCategoryChange,
}: FilterBarProps = {}) {
  const { filters, setCategories, setSortOrder } = useCatalog();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategories =
    propActiveCategories !== undefined
      ? propActiveCategories
      : filters.categories;

  function handleCategoryChange(value: Category) {
    if (propOnCategoryChange) {
      propOnCategoryChange(value);
      return;
    }

    const next = activeCategories.includes(value)
      ? activeCategories.filter((c) => c !== value)
      : [...activeCategories, value];

    setCategories(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next.length) {
      params.set("categories", next.join(","));
    } else {
      params.delete("categories");
    }
    router.replace(`/products?${params.toString()}`);
  }

  function handleClearAll() {
    setCategories([]);
    setSortOrder(null);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("sort");
    router.replace(`/products?${params.toString()}`);
  }

  const hasActiveFilters =
    activeCategories.length > 0 || filters.sortOrder !== null;

  return (
    <fieldset>
      <div className="mb-2 flex items-center gap-2">
        <legend className="text-sm font-semibold text-gray-700">
          Category
        </legend>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="ml-4 text-sm underline text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => {
          const isActive = activeCategories.includes(value);
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
                name={CATEGORY_FILTER_NAME}
                className="sr-only"
                checked={isActive}
                onChange={() => handleCategoryChange(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}