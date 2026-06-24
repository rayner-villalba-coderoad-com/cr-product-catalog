# Component Contracts: Clothing Brand Product Catalog

**Feature**: `001-clothing-catalog`
**Date**: 2026-06-24

These contracts define the public prop interfaces for every shared component.
They are the binding API contract between pages and components — implementation
details (internal state, styling) are not part of this contract.

---

## Catalog Components (`src/components/catalog/`)

### `ProductGrid`

```typescript
interface ProductGridProps {
  /** Full list of products to render (pre-filtered and pre-sorted by the consumer). */
  products: Product[];
}
```

- Renders a responsive `<ul role="list">` grid.
- Delegates each item to `<ProductCard>`.
- Renders `<EmptyState>` when `products` is empty.
- **Client Component** — reads `CatalogContext` to apply filter/sort, then passes
  the derived list to its own render. (Alternatively the page can derive the list
  and pass `products` directly — implementation choice at task time.)

---

### `ProductCard`

```typescript
interface ProductCardProps {
  product: Product;
}
```

- Renders a `<article>` containing: `<Image>` (thumbnail = `product.images[0]`),
  product name, formatted price, and a "View Details" `<Link>` to
  `/products/{product.id}`.
- **No internal state** — pure presentational, RSC-compatible.

---

### `FilterBar`

```typescript
interface FilterBarProps {
  /** Currently active category filter. null = "All". */
  activeCategory: Category | null;
  /** Callback fired when the shopper selects a category option. */
  onCategoryChange: (category: Category | null) => void;
}
```

- Renders a `<fieldset>` with `<legend>Category</legend>` and one control per
  category plus an "All" option.
- **Client Component** — consumes `CatalogContext` for read/write in practice;
  props listed here represent the minimum testable interface.

---

### `SortControls`

```typescript
interface SortControlsProps {
  /** Currently active sort order. null = no sort. */
  activeSortOrder: SortOrder | null;
  /** Callback fired when the shopper changes the sort selection. */
  onSortChange: (sortOrder: SortOrder | null) => void;
}
```

- Renders a `<fieldset>` with `<legend>Sort by price</legend>` and options for
  "Low to High", "High to Low", and "None" (default).
- **Client Component**.

---

### `EmptyState`

```typescript
interface EmptyStateProps {
  /** The active category label shown in the message. null if "All" filter active. */
  activeCategory: Category | null;
}
```

- Renders a descriptive message when the filtered product list is empty.
- **No internal state** — RSC-compatible.

---

## Product Detail Components (`src/components/product/`)

### `ImageGallery`

```typescript
interface ImageGalleryProps {
  /** Ordered list of images for this product. Length ≥ 1. */
  images: ProductImage[];
  /** Product name used for accessible label context. */
  productName: string;
}
```

- Renders the active image via `<Image fill>` in a sized container (no CLS).
- Prev/Next `<button>` controls; hidden (or `aria-hidden`) when `images.length === 1`.
- **Client Component** — manages `activeIndex` via `useState`.

---

### `SizeSelector`

```typescript
interface SizeSelectorProps {
  /** Available sizes for this product. */
  sizes: Size[];
  /** Currently selected size. null if none yet selected. */
  selectedSize: Size | null;
  /** Callback fired when a size button is clicked. */
  onSizeChange: (size: Size) => void;
}
```

- Renders a `<fieldset>` with `<legend>Select size</legend>` and a `<button>` per
  size; selected size receives `aria-pressed="true"`.
- **Client Component** (state lifted to the detail page via `useState`).

---

### `ColorSwatches`

```typescript
interface ColorSwatchesProps {
  /** Available colors for this product. */
  colors: Color[];
  /** Currently selected color. null if none yet selected. */
  selectedColor: Color | null;
  /** Callback fired when a color swatch is clicked. */
  onColorChange: (color: Color) => void;
}
```

- Renders a `<fieldset>` with `<legend>Select color</legend>` and a `<button>` per
  color; each button has `aria-label="{color.name}"` and `aria-pressed` state.
- **Client Component** (state lifted to the detail page via `useState`).

---

### `InventoryBadge`

```typescript
interface InventoryBadgeProps {
  status: InventoryStatus;
}
```

- Renders a visually styled badge: green for "In Stock", amber for "Low Stock",
  grey for "Out of Stock".
- **No internal state** — RSC-compatible.

---

### `AddToCartPlaceholder`

```typescript
interface AddToCartPlaceholderProps {
  /** Disable the button when no size or color has been selected (optional guard). */
  disabled?: boolean;
}
```

- Renders a styled, non-functional "Add to Cart" button area.
- Button is visually complete and keyboard-reachable but has no `onClick` handler
  (cart logic is out of scope for this feature).
- **No internal state** — RSC-compatible.
