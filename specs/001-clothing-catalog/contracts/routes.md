# Route Contracts: Clothing Brand Product Catalog

**Feature**: `001-clothing-catalog`
**Date**: 2026-06-24

---

## `/products`

**File**: `app/products/page.tsx`
**Type**: React Server Component (shell)
**Renders**: `FilterBar` + `SortControls` + `ProductGrid`

### Behaviour

- Renders the full clothing catalog.
- Wraps interactive controls (`FilterBar`, `SortControls`, `ProductGrid`) inside
  `<CatalogProvider>` (the Context provider) so all three share filter/sort state.
- No URL params required; filter/sort state is held in React Context (client-side).
- Displays `<EmptyState>` when no products match the active filter.

### Page Structure (semantic outline)

```
<main aria-label="Product catalog">
  <h1>Catalog</h1>
  <section aria-label="Filter and sort controls">
    <FilterBar />
    <SortControls />
  </section>
  <ProductGrid />   <!-- renders <EmptyState> internally when empty -->
</main>
```

---

## `/products/[id]`

**File**: `app/products/[id]/page.tsx`
**Type**: React Server Component (shell); interactive subcomponents are Client
**URL param**: `id` — must match a `Product.id` in the mock dataset

### Behaviour

- Looks up the product by `id` from the mock dataset.
- If no product matches `id`: renders a "Product not found" message (404-like UX).
- Renders the full product detail view.
- Size and color selections are local `useState` on this page (not in Context).

### Page Structure (semantic outline)

```
<main aria-label="{product.name} — product detail">
  <nav aria-label="Breadcrumb">
    <a href="/products">← Back to catalog</a>
  </nav>
  <article>
    <h1>{product.name}</h1>
    <ImageGallery images={product.images} productName={product.name} />
    <InventoryBadge status={product.inventoryStatus} />
    <p>{product.description}</p>
    <SizeSelector ... />
    <ColorSwatches ... />
    <AddToCartPlaceholder disabled={!selectedSize || !selectedColor} />
  </article>
</main>
```

### Dynamic Segment

| Segment | Type | Source |
|---|---|---|
| `[id]` | `string` | `Product.id` from `src/data/products.ts` |

### Not Found Behaviour

When `id` does not match any product in the dataset:
- Render a friendly "Product not found" message with a link back to `/products`.
- Do not throw an unhandled error; do not render a blank page.

---

## `/` (root)

**File**: `app/page.tsx`
**Behaviour**: Redirect to `/products`.
