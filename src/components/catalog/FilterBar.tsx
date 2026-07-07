"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types/product";

const CATEGORIES: Category[] = ["Tops", "Bottoms", "Outerwear"];

/**
 * FilterBar — Category filter control for the product catalog.
 *
 * Renders a checkbox group (styled as pill buttons) that lets the shopper
 * narrow the product grid by one or more categories (Tops, Bottoms, Outerwear).
 * Multiple categories can be selected simultaneously.
 *
 * **URL-driven state**: Filter selections are written to and read from the URL
 * query parameter `categories` (comma-separated), so filters persist across
 * page refreshes and are shareable/bookmarkable.
 *
 * **Context dependency**: Must be rendered inside `<CatalogProvider>`. Calls
 * `toggleCategory` and `clearFilters` from `useCatalog()`.
 *
 * @example
 * <CatalogProvider>
 *   <FilterBar />
 *   <ProductGrid products={PRODUCTS} />
 * </CatalogProvider>
 */
export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategories: Category[] = (
    searchParams.get("categories")?.split(",").filter(Boolean) ?? []
  ) as Category[];

  const toggleCategory = (cat: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    const updated = activeCategories.includes(cat)
      ? activeCategories.filter((c) => c !== cat)
      : [...activeCategories, cat];
    if (updated.length) {
      params.set("categories", updated.join(","));
    } else {
      params.delete("categories");
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("sort");
    router.push(`?${params.toString()}`);
  };

  const sortOrder = searchParams.get("sort");

  return (
    <div>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-gray-700">
          Category
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategories.includes(cat);
            return (
              <label
                key={cat}
                className={`cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1 ${
                  isActive
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isActive}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            );
          })}
          {(activeCategories.length > 0 || sortOrder !== null) && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-4 text-sm underline text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
          )}
        </div>
      </fieldset>

      {activeCategories.length > 0 && (
        <div
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Active filters"
        >
          {activeCategories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
            >
              {cat}
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                aria-label={`Remove ${cat} filter`}
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