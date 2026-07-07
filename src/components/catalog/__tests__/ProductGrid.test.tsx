// src/components/catalog/__tests__/ProductGrid.test.tsx
import { render, screen } from '@testing-library/react';
import { CatalogProvider } from '@/context/CatalogContext';
import ProductGrid from '../ProductGrid';
import type { Product } from '@/types/product';

const makeProduct = (id: string, category: 'Tops' | 'Bottoms'): Product => ({
  id,
  name: `Product ${id}`,
  category,
  price: 10,
  images: [{ src: '/img.png', alt: 'img', index: 0 }],
  sizes: ['M'],
  colors: [{ name: 'Red', hex: '#f00' }],
  description: 'desc',
  inventoryStatus: 'In Stock',
});

const PRODUCTS = [makeProduct('1', 'Tops'), makeProduct('2', 'Bottoms')];

describe('ProductGrid', () => {
  it('renders all products when no category filter is set (null)', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={PRODUCTS} />
      </CatalogProvider>
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('renders only matching products when a category filter is set', () => {
    render(
      <CatalogProvider initialCategory="Tops">
        <ProductGrid products={PRODUCTS} />
      </CatalogProvider>
    );
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('renders EmptyState when filtered result is empty', () => {
    render(
      <CatalogProvider initialCategory="Outerwear">
        <ProductGrid products={PRODUCTS} />
      </CatalogProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument(); // EmptyState
  });

  it('renders EmptyState with the correct category label when no products match', () => {
    render(
      <CatalogProvider initialCategory="Outerwear">
        <ProductGrid products={PRODUCTS} />
      </CatalogProvider>
    );
    const emptyState = screen.getByRole('status');
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent('Outerwear');
  });

  it('renders all products when products list is empty and category is null', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={[]} />
      </CatalogProvider>
    );
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});