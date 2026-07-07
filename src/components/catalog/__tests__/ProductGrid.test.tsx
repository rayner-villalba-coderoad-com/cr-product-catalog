// src/components/catalog/__tests__/ProductGrid.test.tsx
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { CatalogProvider } from '@/context/CatalogContext';
import type { Product } from '@/types/product';

const mockProducts: Product[] = [
  { id: '1', name: 'Oxford Shirt', category: 'Tops', price: { amount: 49.99, currency: 'USD' }, images: [{ src: '/shirt.jpg', alt: 'Shirt' }], sizes: ['M'], colors: [] },
  { id: '2', name: 'Slim Chinos', category: 'Bottoms', price: { amount: 79.99, currency: 'USD' }, images: [{ src: '/chinos.jpg', alt: 'Chinos' }], sizes: ['M'], colors: [] },
];

describe('ProductGrid', () => {
  it('renders all products when category filter is null (All)', () => {
    render(<CatalogProvider><ProductGrid products={mockProducts} /></CatalogProvider>);
    expect(screen.getByText('Oxford Shirt')).toBeInTheDocument();
    expect(screen.getByText('Slim Chinos')).toBeInTheDocument();
  });

  it('renders EmptyState with active category when no products match', async () => {
    // Set category to Outerwear (no matches in mockProducts)
    render(<CatalogProvider initialCategory="Outerwear"><ProductGrid products={mockProducts} /></CatalogProvider>);
    expect(screen.getByText(/No Outerwear items found/i)).toBeInTheDocument();
  });

  it('filters to only Tops when category is Tops', async () => {
    render(<CatalogProvider initialCategory="Tops"><ProductGrid products={mockProducts} /></CatalogProvider>);
    expect(screen.getByText('Oxford Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Slim Chinos')).not.toBeInTheDocument();
  });
});