// src/components/catalog/FilterBar.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';
import { CatalogProvider } from '@/context/CatalogContext';

function renderWithProvider(ui: React.ReactElement) {
  return render(<CatalogProvider>{ui}</CatalogProvider>);
}

describe('FilterBar', () => {
  it('renders all category options', () => {
    renderWithProvider(<FilterBar />);
    expect(screen.getByRole('radio', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Tops' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Bottoms' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Outerwear' })).toBeInTheDocument();
  });

  it('selects "All" by default', () => {
    renderWithProvider(<FilterBar />);
    expect(screen.getByRole('radio', { name: 'All' })).toBeChecked();
  });

  it('activates the clicked category filter', async () => {
    renderWithProvider(<FilterBar />);
    await userEvent.click(screen.getByRole('radio', { name: 'Tops' }));
    expect(screen.getByRole('radio', { name: 'Tops' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked();
  });
});