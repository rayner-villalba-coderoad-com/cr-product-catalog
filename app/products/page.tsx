import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/catalog/ProductGrid";

export const metadata = {
  title: "Shop — CodeRoad Catalog",
  description: "Browse our full collection of clothing.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
        Catalog
      </h1>
      <ProductGrid products={PRODUCTS} />
    </div>
  );
}
