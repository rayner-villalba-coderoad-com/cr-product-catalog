// src/components/catalog/__tests__/SortControls.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CatalogProvider } from '@/context/CatalogContext';
import SortControls from '../SortControls';

function renderWithProvider() {
  return render(
    <CatalogProvider>
      <SortControls />
    </CatalogProvider>
  );
}

describe('SortControls', () => {
  it('renders a fieldset with legend "Sort by price"', () => {
    renderWithProvider();
    expect(screen.getByRole('group', { name: /sort by price/i })).toBeInTheDocument();
  });

  it('renders Default, Low to High, High to Low options', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/default/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/low to high/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/high to low/i)).toBeInTheDocument();
  });

  it('Default option is checked initially', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/default/i)).toBeChecked();
  });

  it('selects "Price: Low to High" when clicked', () => {
    renderWithProvider();
    const lowToHigh = screen.getByLabelText(/low to high/i);
    fireEvent.click(lowToHigh);
    expect(lowToHigh).toBeChecked();
  });
});