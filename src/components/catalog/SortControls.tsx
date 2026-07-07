"use client";

import type { SortOrder } from "@/types/product";

const SORT_OPTIONS: { label: string; value: SortOrder | null }[] = [
  { label: "Default", value: null },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

interface SortControlsProps {
  activeSortOrder: SortOrder | null;
  onSortChange: (sortOrder: SortOrder | null) => void;
}

/**
 * SortControls — price sort UI for the product catalog.
 *
 * Accepts the active sort order and a change handler as props, allowing the
 * parent to control sort state. Renders a `<fieldset>` with radio options for
 * Default, Low to High, and High to Low price ordering.
 */
export default function SortControls({ activeSortOrder, onSortChange }: SortControlsProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        Sort by price
      </legend>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map(({ label, value }) => {
          const isActive = activeSortOrder === value;
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
                onChange={() => onSortChange(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}