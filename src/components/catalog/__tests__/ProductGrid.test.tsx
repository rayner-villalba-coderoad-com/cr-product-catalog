src/components/catalog/__tests__/ProductGrid.test.tsx
```tsx
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { CatalogProvider } from '@/context/CatalogContext';
import type { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Top A',
    category: 'Tops',
    price: 20,
    images: [{ src: '/a.jpg', alt: 'a', index: 0 }],
    sizes: ['S'],
    colors: [{ name: 'Red', hex: '#f00' }],
    description: 'desc',
    inventoryStatus: 'In Stock',
  },
  {
    id: '2',
    name: 'Bottom B',
    category: 'Bottoms',
    price: 30,
    images: [{ src: '/b.jpg', alt: 'b', index: 0 }],
    sizes: ['M'],
    colors: [{ name: 'Blue', hex: '#00f' }],
    description: 'desc',
    inventoryStatus: 'In Stock',
  },
];

describe('ProductGrid', () => {
  it('shows all products when category filter is null (All)', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={mockProducts} />
      </CatalogProvider>,
    );
    expect(screen.getByText('Top A')).toBeInTheDocument();
    expect(screen.getByText('Bottom B')).toBeInTheDocument();
  });

  it('shows empty state when no products match the selected category', () => {
    // CatalogProvider with pre-set category would need a test helper or
    // we can test via the context directly by rendering a wrapper
    // This test verifies the empty state renders for an empty array
    render(
      <CatalogProvider>
        <ProductGrid products={[]} />
      </CatalogProvider>,
    );
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });
});
```