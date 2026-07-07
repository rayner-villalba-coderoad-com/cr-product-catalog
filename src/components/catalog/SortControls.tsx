"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { SortOrder } from "@/types/product";

const SORT_OPTIONS: { label: string; value: SortOrder | null }[] = [
  { label: "Default", value: null },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const getPillClass = (isActive: boolean) =>
  `cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1 ${
    isActive
      ? "border-gray-900 bg-gray-900 text-white"
      : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
  }`;

/**
 * SortControls — Price sort control for the product catalog.
 *
 * Renders a radio-button group (styled as pill buttons) that lets the shopper
 * order the visible products by price ascending or descending, or restore the
 * default order.
 *
 * **Context dependency**: Must be rendered inside `<CatalogProvider>`. Reads
 * `filters.sortOrder` and calls `setSortOrder` from `useCatalog()`.
 *
 * @example
 * <CatalogProvider>
 *   <SortControls />
 *   <ProductGrid products={PRODUCTS} />
 * </CatalogProvider>
 */
export default function SortControls() {
  const { filters, setSortOrder } = useCatalog();

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Sort by price
      </legend>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map(({ label, value }) => {
          const isActive = filters.sortOrder === value;
          return (
            <label
              key={label}
              className={getPillClass(isActive)}
            >
              <input
                type="radio"
                name="sort-order"
                className="sr-only"
                checked={isActive}
                onChange={() => setSortOrder(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}