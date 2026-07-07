"use client";

import type { Product } from "@/types/product";
import { useCatalog } from "@/context/CatalogContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { filters } = useCatalog();

  const filteredProducts = products.filter(
    (product) => product.category === filters.category
  );

  if (filteredProducts.length === 0) {
    return <EmptyState activeCategory={null} />;
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
