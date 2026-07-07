"use client";

import { useMemo } from "react";
import type { Product } from "@/types/product";
import { useCatalog } from "@/context/CatalogContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { filters } = useCatalog();

  const filteredProducts = useMemo(() => {
    const base =
      filters.category === null
        ? products
        : products.filter((p) => p.category === filters.category);

    if (filters.sortOrder === "price-asc") {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (filters.sortOrder === "price-desc") {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
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