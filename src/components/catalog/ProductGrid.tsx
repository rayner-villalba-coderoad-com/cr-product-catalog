"use client";

import type { Product } from "@/types/product";
import { useCatalog } from "@/context/CatalogContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid — displays the filtered and sorted product catalog grid.
 *
 * Accepts the full unfiltered `products` list as a prop; active category and
 * sort-order filters are read from `CatalogContext` (must be inside a
 * `<CatalogProvider>`). Renders `<EmptyState>` when no products match the
 * active filter.
 *
 * @param products - The complete list of products to filter and display.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  const { filters } = useCatalog();

  const filteredProducts = (
    filters.category === null
      ? products
      : products.filter((product) => product.category === filters.category)
  ).sort((a, b) => {
    if (filters.sortOrder === "price-asc") return a.price.amount - b.price.amount;
    if (filters.sortOrder === "price-desc") return b.price.amount - a.price.amount;
    return 0;
  });

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