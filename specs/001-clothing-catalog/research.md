# Research: Clothing Brand Product Catalog

**Feature**: `001-clothing-catalog`
**Date**: 2026-06-24
**Status**: Complete — all unknowns resolved

---

## Framework & Routing

**Decision**: Next.js 14+ with the App Router (`app/` directory).

**Rationale**: The project constitution mandates Next.js App Router. The App Router
provides `/products` and `/products/[id]` routing natively via the filesystem:
`app/products/page.tsx` and `app/products/[id]/page.tsx`. No additional routing
library is needed.

**Correction**: The planning input referenced "Express.js." Express.js is a
server-side Node.js framework and cannot serve as a client-side UI framework.
Next.js is the correct technology and is required by the constitution.

**Alternatives considered**: Express.js (rejected — server framework, incompatible
with client-side catalog; not in constitution), React Router (rejected — not needed
with App Router file-based routing).

---

## State Management

**Decision**: React Context (`CatalogContext`) for catalog-level filter/sort state;
`useState` for detail-page-local selections (size, color).

**Rationale**: Filter category and sort order must be accessible by both the
`FilterBar`/`SortControls` controls (writers) and `ProductGrid` (reader) on the
same `/products` page. React Context is the lightest mechanism that avoids prop
drilling without introducing an external state library. Size and color selections
on the detail page are purely local (no cross-page sharing needed), so `useState`
is sufficient and simpler.

**Alternatives considered**: Zustand / Redux (rejected — external dependency,
overkill for two filter values in a static catalog), URL query params for filter
state (a valid approach but adds routing complexity beyond this feature's scope;
can be added as a future enhancement), Server Actions / URL state (deferred — out
of scope for this iteration).

---

## Data Layer

**Decision**: Static TypeScript mock data file at `src/data/products.ts`, exporting
a `PRODUCTS` constant typed as `Product[]`.

**Rationale**: The spec explicitly states data source mechanism is out of scope; a
static fixture is the simplest approach for a catalog with 8–12 items. It avoids
network latency, authentication, and API complexity while fully exercising all UI
components. A real API can replace the import in a future iteration without
changing any component.

**Alternatives considered**: JSON file imported via `fetch` (rejected — unnecessary
async complexity for static data), external API / CMS (out of scope), SQLite /
local DB (overkill for a static catalog mock).

---

## TypeScript Typing Strategy

**Decision**: Strict union types for `Category`, `Size`, and `InventoryStatus`
(not `enum` — plain string union types are idiomatic in modern TypeScript and work
cleanly with Tailwind and JSON). `price` is stored as a plain `number` in dollars
with 2 decimal places (e.g., `49.99`) — this is display-only data, so floating
point is acceptable. A `Money` type alias is defined for documentation clarity.

**Rationale**: String union types (`'Tops' | 'Bottoms' | 'Outerwear'`) are
preferred over TypeScript `enum` because they serialize naturally to JSON, are
readable in props, and don't require an import at every use site.

**Alternatives considered**: `enum Category` (rejected — adds indirection, worse
JSON compatibility), storing price in cents as `number` (valid for payment systems,
unnecessary complexity for a display-only catalog).

---

## Image Handling

**Decision**: `next/image` (`<Image>`) for all product images. Mock images use
placeholder services (e.g., `/placeholder.jpg` at known dimensions) until real
assets are available.

**Rationale**: Constitution Principle IV mandates `next/image` for all raster
assets to eliminate CLS. Using explicit `width` and `height` props on `ProductCard`
images and `fill` + a sized container div on the `ImageGallery` fulfills the
requirement while supporting both fixed-size thumbnails and full-size detail images.

**Alternatives considered**: Native `<img>` tag (rejected — violates Principle IV;
causes CLS), CSS `background-image` (rejected — inaccessible, no alt text).

---

## Component Interactivity Boundary (RSC vs Client)

**Decision**: Pages (`app/products/page.tsx`, `app/products/[id]/page.tsx`) are
React Server Components (RSC) acting as shells. The following are marked
`"use client"`:
- `FilterBar` — reads/writes Context, handles change events
- `SortControls` — reads/writes Context, handles change events
- `ProductGrid` — consumes Context to derive filtered/sorted list
- `ImageGallery` — manages active image index via `useState`
- `SizeSelector` — manages selected size via `useState` (prop-lifted)
- `ColorSwatches` — manages selected color via `useState` (prop-lifted)

`ProductCard`, `InventoryBadge`, `EmptyState`, and `AddToCartPlaceholder` are
pure presentational and can remain RSC-compatible (no hooks, no event handlers).

**Rationale**: Minimising client boundary surface keeps JavaScript bundle lean
(Principle IV). Only components that require browser APIs or React hooks cross into
the client.

---

## Accessibility Patterns

**Decision**: Use the following patterns for WCAG 2.1 AA compliance:
- Product grid: `<ul role="list">` with `<li><article>` per card.
- Filter/sort controls: `<fieldset>` + `<legend>` with radio inputs styled as
  buttons, or `<select>` elements with visible labels — both patterns are
  natively keyboard-accessible.
- Size selector: `<fieldset>` + `<legend>` with visually-styled radio buttons;
  `aria-label` on each option.
- Color swatches: `<fieldset>` + `<legend>` with `<button>` per swatch;
  `aria-label="{color name}"` on each button; `aria-pressed` for selected state.
- Image gallery: `<button>` for prev/next; `aria-label="Previous image"` /
  `"Next image"`; `aria-hidden` on hidden images; single image hides controls.
- Focus visible: Tailwind's `focus-visible:ring-2` utilities applied consistently.

**Rationale**: Native HTML semantics are the lowest-friction path to WCAG 2.1 AA
(Principle III). `<fieldset>/<legend>` groups communicate control purpose to
assistive technology without custom ARIA.

---

## Resolved Unknowns Summary

| Unknown | Resolution |
|---------|------------|
| Framework (Express.js vs Next.js) | Next.js App Router — constitutionally mandated |
| State management scope | Context for filter/sort; useState for detail selections |
| Data source mechanism | Static TypeScript mock data file (`src/data/products.ts`) |
| Price representation | `number` (dollars, display-only) |
| Type strategy | String union types (not enum) |
| RSC vs Client boundary | Pages as RSC shells; interactive components as Client Components |
| Image mock source | Placeholder images at fixed dimensions |
