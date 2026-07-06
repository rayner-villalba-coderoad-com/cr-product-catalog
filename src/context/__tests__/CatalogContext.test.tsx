src/context/__tests__/CatalogContext.test.tsx
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CatalogProvider, useCatalog } from '../CatalogContext';

function Consumer() {
  const { filters, setCategory, setSortOrder } = useCatalog();
  return (
    <>
      <span data-testid="category">{filters.category ?? 'null'}</span>
      <span data-testid="sort">{filters.sortOrder ?? 'null'}</span>
      <button onClick={() => setCategory('Tops')}>Set Tops</button>
      <button onClick={() => setSortOrder('price-asc')}>Set Asc</button>
      <button onClick={() => setCategory(null)}>Clear</button>
    </>
  );
}

describe('CatalogContext', () => {
  it('provides default null values', () => {
    render(<CatalogProvider><Consumer /></CatalogProvider>);
    expect(screen.getByTestId('category').textContent).toBe('null');
    expect(screen.getByTestId('sort').textContent).toBe('null');
  });

  it('updates category via setCategory', async () => {
    render(<CatalogProvider><Consumer /></CatalogProvider>);
    await userEvent.click(screen.getByText('Set Tops'));
    expect(screen.getByTestId('category').textContent).toBe('Tops');
  });

  it('updates sortOrder via setSortOrder', async () => {
    render(<CatalogProvider><Consumer /></CatalogProvider>);
    await userEvent.click(screen.getByText('Set Asc'));
    expect(screen.getByTestId('sort').textContent).toBe('price-asc');
  });

  it('clears category via setCategory(null)', async () => {
    render(<CatalogProvider><Consumer /></CatalogProvider>);
    await userEvent.click(screen.getByText('Set Tops'));
    expect(screen.getByTestId('category').textContent).toBe('Tops');
    await userEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('category').textContent).toBe('null');
  });

  it('throws when useCatalog is called outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow('useCatalog must be used inside <CatalogProvider>');
    spy.mockRestore();
  });
});
```