// ---------------------------------------------------------------------------
// Primitive domain types
// ---------------------------------------------------------------------------

/** Top-level product grouping. Extensible — add new literals without structural changes. */
export type Category = "Tops" | "Bottoms" | "Outerwear";

/** Available size options for a clothing item. */
export type Size = "S" | "M" | "L" | "XL";

/** Inventory availability state displayed to the shopper. */
export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

/** Price in USD. Display-only — stored as a decimal number (e.g. 49.99). */
export type Money = number;

/** Sort order for the product grid. */
export type SortOrder = "price-asc" | "price-desc";

// ---------------------------------------------------------------------------
// Composite types
// ---------------------------------------------------------------------------

/** A single image asset belonging to a product. */
export interface ProductImage {
  /** Relative or absolute URL for the image asset. */
  src: string;
  /** Descriptive alt text for assistive technology. Required — never empty. */
  alt: string;
  /** Zero-based display order index within the product's image list. */
  index: number;
}

/** A named color option available for a product. */
export interface Color {
  /** Human-readable color name displayed in the UI (e.g. "Midnight Blue"). */
  name: string;
  /** CSS-compatible hex or named color value used to render the swatch (e.g. "#1a1a2e"). */
  hex: string;
}

// ---------------------------------------------------------------------------
// Core entity
// ---------------------------------------------------------------------------

/**
 * A clothing item available in the product catalog.
 *
 * Invariants:
 *  - `images` MUST contain at least one entry (images[0] is the primary thumbnail).
 *  - `sizes` MUST contain at least one entry.
 *  - `colors` MUST contain at least one entry.
 *  - `price` MUST be > 0.
 *  - `id` MUST be unique across the catalog dataset.
 */
export interface Product {
  /** Unique stable identifier used in the /products/[id] URL segment. */
  id: string;
  /** Display name of the clothing item. */
  name: string;
  /** Top-level category used for filtering. */
  category: Category;
  /** Price in USD (display-only decimal, e.g. 49.99). */
  price: Money;
  /**
   * Ordered list of product images.
   * images[0] is used as the card thumbnail in the grid.
   * All images are displayed in the detail view gallery.
   */
  images: ProductImage[];
  /** Available sizes for this product. */
  sizes: Size[];
  /** Available color options for this product. */
  colors: Color[];
  /** Rich textual description shown on the detail page. */
  description: string;
  /** Current inventory availability shown on the detail page. */
  inventoryStatus: InventoryStatus;
}

// ---------------------------------------------------------------------------
// UI state types (not persisted — runtime only)
// ---------------------------------------------------------------------------

/** Active filter and sort selections for the catalog grid (managed via CatalogContext). */
export interface CatalogFilters {
  /** Currently selected category filter. null = show all categories. */
  category: Category | null;
  /** Currently active sort order. null = default (no sort applied). */
  sortOrder: SortOrder | null;
}

/** The CatalogContext value shape. */
export interface CatalogContextValue {
  filters: CatalogFilters;
  setCategory: (category: Category | null) => void;
  setSortOrder: (sortOrder: SortOrder | null) => void;
}

/** Selected product attributes on the detail page (managed via useState — local to page). */
export interface ProductDetailSelections {
  selectedSize: Size | null;
  selectedColor: Color | null;
}
