src/components/catalog/FilterBar.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';
import { CatalogProvider } from '@/context/CatalogContext';

function renderWithProvider(ui: React.ReactElement) {
  return render(<CatalogProvider>{ui}</CatalogProvider>);
}

describe('FilterBar', () => {
  it('renders all category options including All', () => {
    renderWithProvider(<FilterBar />);
    expect(screen.getByRole('radio', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Tops' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Bottoms' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Outerwear' })).toBeInTheDocument();
  });

  it('defaults to All being selected', () => {
    renderWithProvider(<FilterBar />);
    expect(screen.getByRole('radio', { name: 'All' })).toBeChecked();
  });

  it('selects a category when clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<FilterBar />);
    await user.click(screen.getByRole('radio', { name: 'Tops' }));
    expect(screen.getByRole('radio', { name: 'Tops' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked();
  });
});