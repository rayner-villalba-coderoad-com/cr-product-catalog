import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControls from '../SortControls';
import { CatalogProvider } from '@/context/CatalogContext';

function renderWithProvider() {
  return render(
    <CatalogProvider>
      <SortControls />
    </CatalogProvider>
  );
}

describe('SortControls', () => {
  it('renders all sort options', () => {
    renderWithProvider();
    expect(screen.getByRole('radio', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Price: High to Low' })).toBeInTheDocument();
  });

  it('"Default" is selected by default', () => {
    renderWithProvider();
    expect(screen.getByRole('radio', { name: 'Default' })).toBeChecked();
  });

  it('selecting "Price: Low to High" updates sortOrder', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('radio', { name: 'Price: Low to High' }));
    expect(screen.getByRole('radio', { name: 'Price: Low to High' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Default' })).not.toBeChecked();
  });
});