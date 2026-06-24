---

description: "Task list for Clothing Brand Product Catalog implementation"
---

# Tasks: Clothing Brand Product Catalog

**Input**: Design documents from `specs/001-clothing-catalog/`

**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅

**Tests**: Not requested — omitted per plan.md (Testing: Not in scope).

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story. All file paths are relative to the repository root.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task description

---

## Phase 1: Setup

**Purpose**: Bootstrap and configure the Next.js project before any feature work.

- [ ] T001 Bootstrap Next.js 14+ project at repo root using `create-next-app` with TypeScript, Tailwind CSS, and App Router options; confirm `app/` directory structure is created
- [ ] T002 Configure `tsconfig.json` for strict mode: set `"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, and path alias `"@/*": ["./src/*"]`
- [ ] T003 [P] Configure `tailwind.config.ts` content paths to include `./app/**/*.{ts,tsx}` and `./src/**/*.{ts,tsx}`; add a `theme.extend` section as the shared token extension point
- [ ] T004 [P] Configure ESLint in `.eslintrc.json` (or `eslint.config.mjs`) with `next/core-web-vitals` and `@typescript-eslint/recommended` rulesets; verify `npm run lint` passes on the empty project

**Checkpoint**: `npm run dev` starts without errors; `npx tsc --noEmit` reports zero errors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types, mock data, and root layout that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T005 Define all domain types in `src/types/product.ts` exactly as specified in `specs/001-clothing-catalog/data-model.md`: `Category`, `Size`, `InventoryStatus`, `Money`, `SortOrder`, `ProductImage`, `Color`, `Product`, `CatalogFilters`, `CatalogContextValue`, `ProductDetailSelections` — no `any`, strict union types throughout
- [ ] T006 Create mock dataset in `src/data/products.ts` exporting `PRODUCTS: Product[]` — 10 products: 4 Tops (e.g. Oxford Shirt, Linen Tee, Striped Polo, Turtleneck), 3 Bottoms (e.g. Slim Chinos, Denim Jeans, Cargo Shorts), 3 Outerwear (e.g. Wool Coat, Bomber Jacket, Trench Coat); prices range $19.99–$199.99; each product has 2 `ProductImage` entries with meaningful `alt` text; each has 2–4 sizes and 2–3 colors; at least 2 products have `inventoryStatus: 'Low Stock'`
- [ ] T007 Create root layout in `app/layout.tsx`: `<html lang="en">`, `<body>` with Tailwind base classes, a `<header>` with site name "Catalog" and a nav `<Link href="/products">Shop</Link>`; import `globals.css`
- [ ] T008 Create root redirect in `app/page.tsx`: use Next.js `redirect('/products')` from `next/navigation` so the root URL sends shoppers to the catalog

**Checkpoint**: Foundation ready — `npx tsc --noEmit` zero errors; dev server loads and redirects `/` to `/products` (404 is fine until US1 page exists).

---

## Phase 3: User Story 1 — Browse the Product Grid (Priority: P1) 🎯 MVP

**Goal**: Render all mock products in a responsive grid; each card shows image, name, price, and a keyboard-accessible "View Details" link.

**Independent Test**: Start dev server → navigate to `/products` → confirm all 10 products appear; resize to mobile width → single column; resize to desktop → 3+ columns; Tab through all cards, press Enter on "View Details" → URL updates to `/products/{id}`.

- [ ] T009 [P] [US1] Create `EmptyState` component in `src/components/catalog/EmptyState.tsx`: accepts `activeCategory: Category | null`; renders a `<p>` with message `"No {category} items found."` (or `"No items found."` when null); no internal state (RSC-compatible)
- [ ] T010 [P] [US1] Create `ProductCard` component in `src/components/catalog/ProductCard.tsx`: accepts `product: Product`; renders `<article>` containing `<Image src={product.images[0].src} alt={product.images[0].alt} width={400} height={500} className="object-cover w-full">` from `next/image`, `<h2>` with product name, `<p>` with price formatted as `$XX.XX`, and `<Link href={"/products/" + product.id}>View Details</Link>` with `focus-visible:ring-2` Tailwind utility; RSC-compatible
- [ ] T011 [US1] Create `ProductGrid` component in `src/components/catalog/ProductGrid.tsx`: accepts `products: Product[]`; renders `<ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">` with `<li>` per item wrapping `<ProductCard>`; renders `<EmptyState activeCategory={null}>` when `products` array is empty; RSC-compatible for now
- [ ] T012 [US1] Create `/products` page in `app/products/page.tsx`: RSC; imports `PRODUCTS` from `@/data/products`; renders `<main aria-label="Product catalog">`, `<h1 className="...">Clothing Catalog</h1>`, and `<ProductGrid products={PRODUCTS} />`; no filters yet (added in US2)

**Checkpoint**: Navigate to `/products` — all 10 mock products render with images, names, prices, and links; grid reflows correctly at mobile/tablet/desktop; keyboard Tab moves through cards with visible focus rings.

---

## Phase 4: User Story 2 — Filter and Sort Products (Priority: P2)

**Goal**: Add category filter and price sort controls that update the grid immediately without a page reload.

**Independent Test**: On `/products`, select "Tops" → only 4 Tops visible; select "Price: Low to High" → prices ascend; select "High to Low" → prices descend; clear to "All" → all 10 return; filter to a category with 0 matches → EmptyState message appears.

- [ ] T013 [P] [US2] Create `CatalogContext` in `src/context/CatalogContext.tsx`: `"use client"`; `CatalogProvider` component that wraps `children` and provides `CatalogContextValue` via `React.createContext`; internal state: `category: Category | null` (default `null`) and `sortOrder: SortOrder | null` (default `null`); exports `CatalogProvider` and `useCatalog` hook (throws if used outside provider)
- [ ] T014 [P] [US2] Create `FilterBar` component in `src/components/catalog/FilterBar.tsx`: `"use client"`; reads/writes `category` from `useCatalog()`; renders `<fieldset><legend className="sr-only">Filter by category</legend></fieldset>` with a styled radio `<input>` (visually hidden) + `<label>` button for each option: "All" (value `null`), "Tops", "Bottoms", "Outerwear"; selected label has distinct Tailwind background; all labels have `focus-visible:ring-2`
- [ ] T015 [P] [US2] Create `SortControls` component in `src/components/catalog/SortControls.tsx`: `"use client"`; reads/writes `sortOrder` from `useCatalog()`; renders `<fieldset><legend className="sr-only">Sort by price</legend></fieldset>` with styled radio inputs + labels for "Default", "Price: Low to High" (`price-asc`), "Price: High to Low" (`price-desc`); focus-visible ring on labels
- [ ] T016 [US2] Update `ProductGrid` in `src/components/catalog/ProductGrid.tsx`: add `"use client"` directive; import and call `useCatalog()` to get `filters`; derive `displayedProducts` by filtering `PRODUCTS` where `category` matches (skip when `null`) then sorting by `price` (`price-asc`/`price-desc`); pass `displayedProducts` to the existing grid render; pass `filters.category` to `<EmptyState>` when empty; import `PRODUCTS` directly (remove props-based products list) — self-contained
- [ ] T017 [US2] Update `/products` page in `app/products/page.tsx`: wrap all content in `<CatalogProvider>`; add `<section aria-label="Filter and sort controls" className="flex flex-wrap gap-4 mb-8"><FilterBar /><SortControls /></section>` above `<ProductGrid />`; `ProductGrid` no longer needs a `products` prop (it reads from context + PRODUCTS directly per T016)

**Checkpoint**: Filter and sort controls visible; selecting Tops shows only Top items; sort order updates immediately; selecting a category with no items shows EmptyState; resetting to "All" restores full list.

---

## Phase 5: User Story 3 — View Full Product Detail (Priority: P3)

**Goal**: A dedicated `/products/[id]` page with multi-image gallery, size selector, color swatches, inventory badge, and Add to Cart placeholder.

**Independent Test**: Click "View Details" on any card → URL changes to `/products/{id}`; product name, description, and inventory badge visible; gallery prev/next buttons work (hidden when 1 image); select size → button highlights; select color → swatch highlights; "Add to Cart" area renders; Tab navigates all elements without trap; visit `/products/non-existent` → "Product not found" message.

- [ ] T018 [P] [US3] Create `InventoryBadge` component in `src/components/product/InventoryBadge.tsx`: accepts `status: InventoryStatus`; renders `<span>` with Tailwind color classes: green (`bg-green-100 text-green-800`) for "In Stock", amber (`bg-amber-100 text-amber-800`) for "Low Stock", grey (`bg-gray-100 text-gray-600`) for "Out of Stock"; RSC-compatible
- [ ] T019 [P] [US3] Create `AddToCartPlaceholder` component in `src/components/product/AddToCartPlaceholder.tsx`: accepts `disabled?: boolean`; renders `<button type="button" disabled={disabled} aria-label="Add to cart" className="w-full py-3 px-6 bg-black text-white rounded disabled:opacity-50 focus-visible:ring-2">Add to Cart</button>`; no `onClick` handler (cart out of scope); RSC-compatible
- [ ] T020 [P] [US3] Create `SizeSelector` component in `src/components/product/SizeSelector.tsx`: `"use client"`; accepts `sizes: Size[]`, `selectedSize: Size | null`, `onSizeChange: (size: Size) => void`; renders `<fieldset><legend>Select size</legend></fieldset>` with a `<button>` per size; selected button has `aria-pressed="true"` and distinct border; unselected has `aria-pressed="false"`; all buttons have `focus-visible:ring-2`
- [ ] T021 [P] [US3] Create `ColorSwatches` component in `src/components/product/ColorSwatches.tsx`: `"use client"`; accepts `colors: Color[]`, `selectedColor: Color | null`, `onColorChange: (color: Color) => void`; renders `<fieldset><legend>Select color</legend></fieldset>` with a circular `<button>` per color; button `style={{ backgroundColor: color.hex }}`; `aria-label={color.name}`; selected swatch has `ring-2 ring-offset-2 ring-black`; `aria-pressed` state per button; `focus-visible:ring-2`
- [ ] T022 [US3] Create `ImageGallery` component in `src/components/product/ImageGallery.tsx`: `"use client"`; accepts `images: ProductImage[]`, `productName: string`; manages `activeIndex: number` with `useState(0)`; renders a `<div className="relative w-full aspect-[4/5]">` container with `<Image fill className="object-cover" src={images[activeIndex].src} alt={images[activeIndex].alt}>`; renders prev `<button aria-label="Previous image">` and next `<button aria-label="Next image">` that wrap `activeIndex`; when `images.length === 1` both buttons are `aria-hidden="true"` and visually hidden via Tailwind `hidden`
- [ ] T023 [US3] Create `/products/[id]` page in `app/products/[id]/page.tsx`: `"use client"` (needs `useState` for selections); import `PRODUCTS` from `@/data/products`; derive `product` by `params.id`; call `notFound()` from `next/navigation` if not found; manage `selectedSize: Size | null` and `selectedColor: Color | null` via `useState(null)`; render `<main aria-label="{product.name} — product detail">`, `<nav aria-label="Breadcrumb"><Link href="/products">← Back to catalog</Link></nav>`, `<article>` containing `<h1>`, `<ImageGallery images={product.images} productName={product.name}>`, `<InventoryBadge status={product.inventoryStatus}>`, `<p>{product.description}</p>`, `<SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize}>`, `<ColorSwatches colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor}>`, `<AddToCartPlaceholder disabled={!selectedSize || !selectedColor}>`

**Checkpoint**: All detail page elements render; gallery navigates between images; single-image products hide prev/next; size and color selections highlight; "Add to Cart" is enabled only after both are selected; keyboard Tab covers every interactive element; `/products/non-existent` shows not-found message.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Type safety gate, linting, performance, accessibility, and validation.

- [ ] T024 [P] Run `npx tsc --noEmit` from repo root; resolve every strict-mode TypeScript error until the command exits cleanly with zero errors
- [ ] T025 [P] Run `npm run lint`; resolve all ESLint errors across `app/` and `src/`; no warnings permitted for `@typescript-eslint/no-explicit-any` or `jsx-a11y` rules
- [ ] T026 Run Lighthouse audit on `/products` in Chrome DevTools (desktop + mobile); confirm CLS < 0.1 and LCP < 2.5 s; if CLS fails, inspect `next/image` dimensions/container sizing in `ProductCard` and `ImageGallery` and fix
- [ ] T027 [P] Manual keyboard-only navigation audit: on `/products` Tab through FilterBar, SortControls, and all 10 ProductCards confirming visible `focus-visible:ring-2` rings; on `/products/{id}` Tab through breadcrumb, gallery buttons, size buttons, color swatches, and Add to Cart; confirm Enter/Space activates all buttons; confirm no keyboard trap exists anywhere
- [ ] T028 Execute all 7 validation scenarios from `specs/001-clothing-catalog/quickstart.md` in sequence; check off each scenario and note any failures as bugs to fix before sign-off

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user stories**
- **US1 (Phase 3)**: Depends on Phase 2 — can begin once Foundation is complete
- **US2 (Phase 4)**: Depends on Phase 3 — requires the grid and page to exist before adding controls
- **US3 (Phase 5)**: Depends on Phase 2 — detail components are independent of US1/US2
- **Polish (Final)**: Depends on all story phases being complete

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Foundation
- **US2 (P2)**: Requires US1 complete (updates ProductGrid and /products page built in US1)
- **US3 (P3)**: Requires Foundation only — can be built in parallel with US1/US2

### Within Each User Story

- Models/types before components (Foundation must be complete first)
- Leaf components (`ProductCard`, `EmptyState`, badges) before container components (`ProductGrid`)
- Container components before pages
- Pages last

### Parallel Opportunities

- T003 and T004 can run in parallel (different config files)
- T009 and T010 can run in parallel (different component files, both pure presentational)
- T013, T014, T015 can run in parallel (different files, all US2 preparation)
- T018, T019, T020, T021 can run in parallel (different component files, all US3 leaf components)
- T024 and T025 can run in parallel (tsc and eslint are independent)
- T026 and T027 can run in parallel (Lighthouse and keyboard audit are independent)
- **US3 (T018–T023) can be worked in parallel with US1 (T009–T012) by a separate developer**

---

## Parallel Execution Examples

### US1 — Parallel leaf components

```
Parallel:
  Task: "Create EmptyState component in src/components/catalog/EmptyState.tsx"  [T009]
  Task: "Create ProductCard component in src/components/catalog/ProductCard.tsx" [T010]

Sequential after both complete:
  Task: "Create ProductGrid in src/components/catalog/ProductGrid.tsx"           [T011]
  Task: "Create /products page in app/products/page.tsx"                         [T012]
```

### US2 — Parallel controls, then sequential page update

```
Parallel:
  Task: "Create CatalogContext in src/context/CatalogContext.tsx"                [T013]
  Task: "Create FilterBar in src/components/catalog/FilterBar.tsx"               [T014]
  Task: "Create SortControls in src/components/catalog/SortControls.tsx"        [T015]

Sequential after all complete:
  Task: "Update ProductGrid to consume CatalogContext"                           [T016]
  Task: "Update /products page with CatalogProvider + controls"                  [T017]
```

### US3 — Parallel leaf components, then sequential assembly

```
Parallel:
  Task: "Create InventoryBadge in src/components/product/InventoryBadge.tsx"    [T018]
  Task: "Create AddToCartPlaceholder in src/components/product/..."             [T019]
  Task: "Create SizeSelector in src/components/product/SizeSelector.tsx"        [T020]
  Task: "Create ColorSwatches in src/components/product/ColorSwatches.tsx"      [T021]

Sequential after all complete:
  Task: "Create ImageGallery in src/components/product/ImageGallery.tsx"        [T022]
  Task: "Create /products/[id] page in app/products/[id]/page.tsx"              [T023]
```

---

## Implementation Strategy

### MVP First — User Story 1 Only

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational (T005–T008)
3. Complete Phase 3: US1 — Product Grid (T009–T012)
4. **STOP and VALIDATE**: Open `/products` — all 10 products visible, grid responsive, keyboard accessible
5. Run T024 + T025 (type check + lint) as a gate

### Incremental Delivery

1. Setup + Foundation → project starts, types and data ready
2. US1 (T009–T012) → working product grid — **first shippable increment**
3. US2 (T013–T017) → filter and sort added — **second increment**
4. US3 (T018–T023) → full detail page — **third increment**
5. Polish (T024–T028) → quality gates → **ready for review**

### Parallel Team Strategy

With two developers:

- **Developer A**: Setup (Phase 1) → Foundation (Phase 2) → US1 (Phase 3) → US2 (Phase 4)
- **Developer B**: Setup (Phase 1) → Foundation (Phase 2) → US3 (Phase 5) [independently]
- Both converge on Polish phase

---

## Notes

- `[P]` = different files, no in-flight dependencies — safe to run in parallel
- `[USN]` label maps each task to its user story for traceability
- No test tasks generated — testing was not requested in the feature specification
- All images use `next/image` — non-negotiable per constitution Principle IV
- `"use client"` is applied only to components that use hooks or event handlers: `FilterBar`, `SortControls`, `ProductGrid` (after T016), `ImageGallery`, `SizeSelector`, `ColorSwatches`, and the `/products/[id]` page
- Commit after each checkpoint (end of each phase) at minimum
- Validate each story independently before starting the next
