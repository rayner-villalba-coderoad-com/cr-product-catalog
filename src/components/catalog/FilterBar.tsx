I need to apply all 6 suggestions. Let me analyze what changes are needed:

1. **AC2**: Change to multi-select with checkboxes, `Category[]` state (but this file only — I'll handle what's possible in FilterBar.tsx, noting the context change is needed)
2. **AC5**: Add "Clear all filters" button
3. **Medium**: Add contracted props (`activeCategory`, `onCategoryChange`)
4. **Medium**: Add JSDoc comment
5. **Low**: Extract `pillClass` helper (inline here or reference — I'll add it inline since it's in this file)
6. **Low**: Accept optional props with context fallback

Combining suggestions 3 and 6 (both about props), suggestion 1 (multi-select checkboxes), suggestion 2 (clear all button), suggestion 4 (JSDoc), and suggestion 5 (pillClass helper):

Key decisions:
- Props will be optional, falling back to context (suggestion 6 pattern)
- For multi-select: `activeCategory` prop becomes `activeCategories?: Category[]`, and context needs `categories` — I'll use what context provides, adapting the interface
- The "Clear all" button needs `setSortOrder` from context
- `pillClass` extracted as a local function (since suggestion 5 says extract to a shared file, but I can only edit this file — I'll add it here)

For the multi-select, the props interface should use `Category[]` per suggestion 1. The "All" option becomes a special case (clear selection).

"use client";

import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

function pillClass(isActive: boolean): string {
  const base =
    "cursor-pointer rounded border px-4 py-2 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1";
  return isActive
    ? `${base} border-gray-900 bg-gray-900 text-white`
    : `${base} border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900`;
}

interface FilterBarProps {
  activeCategories?: Category[];
  onCategoryChange?: (categories: Category[]) => void;
}

/**
 * FilterBar — Client Component.
 *
 * Reads `filters.categories` and calls `setCategories` from CatalogContext.
 * Must be rendered inside <CatalogProvider>.
 *
 * Note: the component-props contract lists explicit props for isolated testing;
 * in practice this component is context-driven and accepts no props.
 * Accepts optional `activeCategories` and `onCategoryChange` props for
 * isolated use and testing; falls back to CatalogContext when omitted.
 */
export default function FilterBar({
  activeCategories: propCategories,
  onCategoryChange: propOnChange,
}: FilterBarProps = {}) {
  const { filters, setCategories, setSortOrder } = useCatalog();

  const activeCategories =
    propCategories !== undefined ? propCategories : filters.categories;

  const handleChange = propOnChange ?? setCategories;

  const hasActiveFilters =
    activeCategories.length > 0 || filters.sortOrder !== null;

  function toggleCategory(value: Category) {
    const next = activeCategories.includes(value)
      ? activeCategories.filter((c) => c !== value)
      : [...activeCategories, value];
    handleChange(next);
  }

  function handleClearAll() {
    handleChange([]);
    setSortOrder(null);
  }

  return (
    <fieldset>
      <div className="mb-2 flex items-center justify-between">
        <legend className="text-sm font-semibold text-gray-700">
          Category
        </legend>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm underline text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => {
          const isActive = activeCategories.includes(value);
          return (
            <label key={label} className={pillClass(isActive)}>
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