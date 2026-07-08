import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { CatalogProvider } from '@/context/CatalogContext';
import type { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Oxford Shirt',
    category: 'Tops',
    price: { amount: 49.99, currency: 'USD' },
    images: [],
    sizes: [],
    colors: [],
    description: '',
    inventoryStatus: 'In Stock',
  },
  {
    id: '2',
    name: 'Slim Chinos',
    category: 'Bottoms',
    price: { amount: 69.99, currency: 'USD' },
    images: [],
    sizes: [],
    colors: [],
    description: '',
    inventoryStatus: 'In Stock',
  },
];

describe('ProductGrid', () => {
  it('renders all products when no category filter is active', () => {
    render(
      <CatalogProvider>
        <ProductGrid products={mockProducts} />
      </CatalogProvider>,
    );
    expect(screen.getByText('Oxford Shirt')).toBeInTheDocument();
    expect(screen.getByText('Slim Chinos')).toBeInTheDocument();
  });

  it('filters products by active category', async () => {
    render(
      <CatalogProvider initialCategory="Tops">
        <ProductGrid products={mockProducts} />
      </CatalogProvider>,
    );
    expect(screen.getByText('Oxford Shirt')).toBeInTheDocument();
    expect(screen.queryByText('Slim Chinos')).not.toBeInTheDocument();
  });

  it('shows EmptyState with active category when no match', () => {
    render(
      <CatalogProvider initialCategory="Outerwear">
        <ProductGrid products={mockProducts} />
      </CatalogProvider>,
    );
    expect(screen.getByText(/No Outerwear items found/i)).toBeInTheDocument();
  });
});