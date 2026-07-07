// src/components/catalog/SortControls.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControls from './SortControls';
import { CatalogProvider } from '@/context/CatalogContext';

describe('SortControls', () => {
  it('renders Default, Price Low to High, and Price High to Low options', () => {
    render(
      <CatalogProvider>
        <SortControls />
      </CatalogProvider>
    );
    expect(screen.getByRole('radio', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: High to Low' })).toBeInTheDocument();
  });

  it('defaults to Default being selected', () => {
    render(
      <CatalogProvider>
        <SortControls />
      </CatalogProvider>
    );
    expect(screen.getByRole('radio', { name: 'Default' })).toBeChecked();
  });

  it('selects Price Low to High when clicked', async () => {
    const user = userEvent.setup();
    render(
      <CatalogProvider>
        <SortControls />
      </CatalogProvider>
    );
    await user.click(screen.getByRole('radio', { name: 'Price: Low to High' }));
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeChecked();
  });
});