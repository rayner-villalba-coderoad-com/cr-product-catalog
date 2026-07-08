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
 * ProductGrid — displays a responsive grid of product cards.
 *
 * Reads `filters` from CatalogContext to apply category filtering and
 * price sorting. Must be rendered inside a <CatalogProvider>.
 *
 * @param products - Full unfiltered product list; filtering and sorting are applied internally.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  const { filters } = useCatalog();

  // filters.category === null means "All" — no category restriction applied.
  const filteredProducts = useMemo(() => {
    let result = filters.category
      ? products.filter((p) => p.category === filters.category)
      : products;

    if (filters.sortOrder === "price-asc") {
      result = [...result].sort((a, b) => a.price.amount - b.price.amount);
    } else if (filters.sortOrder === "price-desc") {
      result = [...result].sort((a, b) => b.price.amount - a.price.amount);
    }

    return result;
  }, [products, filters.category, filters.sortOrder]);

  if (filteredProducts.length === 0) {
    return <EmptyState activeCategory={filters.category} />;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {filteredProducts.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}