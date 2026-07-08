// e2e/filter-sort.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('Category filter shows only matching products', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('radio', { name: 'Tops' }).click();
  const cards = page.locator('[data-testid="product-card"]');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i).getByTestId('product-category')).toHaveText('Tops');
  }
});

test('Clear all filters restores full catalog', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('radio', { name: 'Tops' }).click();
  await page.getByRole('button', { name: 'Clear all filters' }).click();
  await expect(page.locator('[data-testid="product-card"]')).toHaveCount(10);
});

test('Filters persist after page refresh', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('radio', { name: 'Bottoms' }).click();
  await page.reload();
  await expect(page.getByRole('radio', { name: 'Bottoms' })).toBeChecked();
});