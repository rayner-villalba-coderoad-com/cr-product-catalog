import { render, screen } from "@testing-library/react";
import ProductGrid from "./ProductGrid";
import { CatalogProvider } from "@/context/CatalogContext";
import type { Product } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Linen Tee",
    category: "Tops",
    price: { amount: 29.99, currency: "USD" },
    images: [],
    sizes: [],
    colors: [],
    description: "",
    inventoryStatus: "In Stock",
  },
  {
    id: "2",
    name: "Slim Chinos",
    category: "Bottoms",
    price: { amount: 59.99, currency: "USD" },
    images: [],
    sizes: [],
    colors: [],
    description: "",
    inventoryStatus: "In Stock",
  },
];

describe("ProductGrid filtering", () => {
  it("renders all products when no category filter is active", () => {
    render(
      <CatalogProvider>
        <ProductGrid products={mockProducts} />
      </CatalogProvider>
    );
    expect(screen.getByText("Linen Tee")).toBeInTheDocument();
    expect(screen.getByText("Slim Chinos")).toBeInTheDocument();
  });

  it("shows only Tops when Tops filter is set", async () => {
    render(
      <CatalogProvider initialCategory="Tops">
        <ProductGrid products={mockProducts} />
      </CatalogProvider>
    );
    expect(screen.getByText("Linen Tee")).toBeInTheDocument();
    expect(screen.queryByText("Slim Chinos")).not.toBeInTheDocument();
  });

  it("shows EmptyState with category name when nothing matches", () => {
    render(
      <CatalogProvider initialCategory="Outerwear">
        <ProductGrid products={mockProducts} />
      </CatalogProvider>
    );
    expect(screen.getByText(/no outerwear items found/i)).toBeInTheDocument();
  });
});