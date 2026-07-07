"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { SortOrder } from "@/types/product";

const SORT_OPTIONS: { label: string; value: SortOrder | null }[] = [
  { label: "Default", value: null },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

/**
 * SortControls — Client Component.
 *
 * Renders a fieldset of radio buttons for sorting visible products by price
 * ("Default", "Price: Low to High", "Price: High to Low").
 *
 * Reads `filters.sortOrder` and calls `setSortOrder` from CatalogContext.
 * Must be rendered inside <CatalogProvider>.
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
              className={`cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1 ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
              }`}
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