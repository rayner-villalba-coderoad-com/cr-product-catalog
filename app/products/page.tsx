import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/catalog/ProductGrid";
import { CatalogProvider } from "@/context/CatalogContext";
import FilterBar from "@/components/catalog/FilterBar";
import SortControls from "@/components/catalog/SortControls";

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
      <CatalogProvider>
        <div className="flex flex-wrap gap-6 mb-4">
          <FilterBar />
          <SortControls />
        </div>
        <div className="mt-8">
          <ProductGrid products={PRODUCTS} />
        </div>
      </CatalogProvider>
    </div>
  );
}