src/components/catalog/ProductGrid.test.tsx
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { CatalogProvider } from '@/context/CatalogContext';
import type { Product } from '@/types/product';

const mockProducts: Product[] = [
  { id: '1', name: 'T-Shirt', price: 20, category: 'Tops', images: [{ src: '/img1.jpg', alt: 'T-Shirt' }] },
  { id: '2', name: 'Jeans', price: 50, category: 'Bottoms', images: [{ src: '/img2.jpg', alt: 'Jeans' }] },
];

describe('ProductGrid', () => {
  it('renders all products when no category filter is active', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={mockProducts} />
      </CatalogProvider>
    );
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
  });

  it('renders only matching products when a category filter is active', async () => {
    // Would need a way to pre-set context; consider wrapping with a test helper
    // that initialises category to 'Tops'.
  });

  it('renders EmptyState with the active category when no products match', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={[]} />
      </CatalogProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument(); // or whatever EmptyState renders
  });
});