"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCatalog } from "@/context/CatalogContext";
import type { Category } from "@/types/product";
import { filterButtonClass } from "./filterButtonClass";

const CATEGORIES: { label: string; value: Category | null }[] = [
  { label: "All", value: null },
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
];

export default function FilterBar() {
  const { filters, toggleCategory, setCategory, setSortOrder } = useCatalog();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: Category | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete("category");
    } else {
      // Toggle the category in the URL params list
      const existing = params.getAll("category");
      if (existing.includes(value)) {
        const updated = existing.filter((c) => c !== value);
        params.delete("category");
        updated.forEach((c) => params.append("category", c));
      } else {
        params.append("category", value);
      }
    }

    router.push(`${pathname}?${params.toString()}`);
    toggleCategory(value);
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.sortOrder !== null;

  return (
    <>
      <fieldset>
        <legend className="sr-only">Filter by category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, value }) => {
            const isActive =
              value === null
                ? filters.categories.length === 0
                : filters.categories.includes(value);
            return (
              <label key={label} className={filterButtonClass(isActive)}>
                <input
                  type="checkbox"
                  name="category-filter"
                  value={value ?? "all"}
                  className="sr-only"
                  checked={isActive}
                  onChange={() => handleChange(value)}
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
          onClick={() => {
            setCategory(null);
            setSortOrder(null);
            const params = new URLSearchParams(searchParams.toString());
            params.delete("category");
            params.delete("sortOrder");
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="text-sm underline text-gray-600 hover:text-gray-900"
        >
          Clear all filters
        </button>
      )}
    </>
  );
}