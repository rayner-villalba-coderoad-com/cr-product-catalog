src/components/catalog/SortControls.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControls from './SortControls';
import { CatalogProvider } from '@/context/CatalogContext';

describe('SortControls', () => {
  it('renders all sort options', () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    expect(screen.getByRole('radio', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: High to Low' })).toBeInTheDocument();
  });

  it('defaults to Default selected', () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    expect(screen.getByRole('radio', { name: 'Default' })).toBeChecked();
  });

  it('activates price-asc when Low to High is clicked', async () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    await userEvent.click(screen.getByRole('radio', { name: 'Price: Low to High' }));
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeChecked();
  });

  it('switches from price-desc to price-asc when order is reversed', async () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    await userEvent.click(screen.getByRole('radio', { name: 'Price: High to Low' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Price: Low to High' }));
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Price: High to Low' })).not.toBeChecked();
  });
});