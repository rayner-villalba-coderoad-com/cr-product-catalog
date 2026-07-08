/**
 * SortControls — radio-button group that lets shoppers order visible products
 * by price (Low to High / High to Low).
 *
 * TODO: Render this component inside <FilterBar /> or alongside it in
 * app/products/page.tsx once the CatalogContext `setSortOrder` handler
 * applies sorting in ProductGrid (see FR-004).
 */
"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { SortOrder } from "@/types/product";

const SORT_OPTIONS: { label: string; value: SortOrder | null }[] = [
  { label: "Default", value: null },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

// Shared radio button class helper. The same logic is used in FilterBar.tsx.
// TODO: Extract to a shared styles/utils module (e.g. src/lib/styles.ts) so
// that a single change propagates to both FilterBar and SortControls.
const radioButtonClass = (isActive: boolean) =>
  `cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1 ${
    isActive
      ? "border-gray-900 bg-gray-900 text-white"
      : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
  }`;

/**
 * SortControls — renders a radio-button group that lets shoppers sort the
 * visible product list by price.
 *
 * Supported sort orders (from the `SortOrder` union type):
 *  - null          → default / unordered
 *  - 'price-asc'   → Price: Low to High
 *  - 'price-desc'  → Price: High to Low
 *
 * Must be rendered inside a <CatalogProvider>. Reads and updates
 * `filters.sortOrder` via the CatalogContext `setSortOrder` action.
 *
 * @see FilterBar for the companion category-filter control
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
              className={radioButtonClass(isActive)}
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