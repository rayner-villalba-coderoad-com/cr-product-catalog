src/components/catalog/__tests__/ProductGrid.test.tsx
```tsx
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { CatalogProvider } from '@/context/CatalogContext';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types/product';

const topsOnly = PRODUCTS.filter(p => p.category === 'Tops');
const allProducts = PRODUCTS;

function renderGrid(products: Product[], initialCategory = null) {
  return render(
    <CatalogProvider>
      <ProductGrid products={products} />
    </CatalogProvider>
  );
}

describe('ProductGrid', () => {
  it('renders all products when no category filter is active', () => {
    renderGrid(allProducts);
    // With the bug fix (null → show all), all cards should appear
    expect(screen.getAllByRole('article')).toHaveLength(allProducts.length);
  });

  it('renders EmptyState when products array is empty', () => {
    renderGrid([]);
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it('renders EmptyState with category info when filter returns no results', () => {
    // Provide only Tops items but set category to Bottoms via context mock
    renderGrid(topsOnly);
    // This test would require context manipulation — expand with a mock provider
  });
});
```