import { test, expect } from "@playwright/test";

test.describe("Product catalog filtering", () => {
  test("filters to Tops only", async ({ page }) => {
    await page.goto("/products");
    await page.getByLabel("Tops").check();
    const cards = page.getByRole("listitem");
    for (const card of await cards.all()) {
      await expect(card).toContainText(/(Oxford|Linen|Striped|Turtleneck)/i);
    }
  });

  test("URL reflects active category filter", async ({ page }) => {
    await page.goto("/products");
    await page.getByLabel("Tops").check();
    expect(page.url()).toContain("categories=Tops");
  });

  test("filter persists after page refresh", async ({ page }) => {
    await page.goto("/products?categories=Tops");
    await expect(page.getByLabel("Tops")).toBeChecked();
  });

  test("clearing filters restores all products", async ({ page }) => {
    await page.goto("/products?categories=Tops");
    await page.getByRole("button", { name: /clear all/i }).click();
    const cards = page.getByRole("listitem");
    await expect(cards).toHaveCount(10);
  });

  test("shows empty state when no products match", async ({ page }) => {
    await page.goto("/products?categories=Tops,Bottoms,Outerwear");
    // Force zero match scenario if applicable
    await expect(page.getByText(/no.*items found/i)).toBeVisible();
  });
});