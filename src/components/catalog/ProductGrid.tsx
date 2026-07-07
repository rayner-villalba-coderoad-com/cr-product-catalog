"use client";

import { useMemo } from "react";
import type { Product } from "@/types/product";
import { useCatalog } from "@/context/CatalogContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid — Renders the catalog product grid.
 *
 * @param products - The full list of products to display. Filtering and sorting
 *   are applied internally using the active `CatalogContext` state, so the
 *   caller should pass the *complete* product array rather than a pre-filtered
 *   subset.
 *
 * **Context dependency**: Must be rendered inside `<CatalogProvider>`.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  const { filters } = useCatalog();

  const sortedProducts = useMemo(() => {
    const filtered =
      filters.category === null
        ? products
        : products.filter((product) => product.category === filters.category);

    if (filters.sortOrder === null) return filtered;

    return [...filtered].sort((a, b) =>
      filters.sortOrder === "price-asc"
        ? a.price.amount - b.price.amount
        : b.price.amount - a.price.amount
    );
  }, [products, filters.category, filters.sortOrder]);

  if (sortedProducts.length === 0) {
    return <EmptyState activeCategory={filters.category} />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {sortedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}