# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-clothing-catalog/plan.md
<!-- SPECKIT END -->

## Commands

```bash
npm run dev        # dev server on port 3001
npm run build      # production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npx tsc --noEmit   # strict TypeScript check — must pass before any merge
```

## Architecture

**Stack**: Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · static JSON mock data · no backend.

**Routing** — two routes, both under `app/`:
- `app/products/page.tsx` — catalog grid (RSC shell wrapping client controls)
- `app/products/[id]/page.tsx` — product detail page (`"use client"`, manages size/color via `useState`)
- `app/page.tsx` — redirects to `/products`

**Path alias**: `@/` resolves to `src/` (configured in `tsconfig.json` paths).

**Data flow**:
1. `src/data/products.ts` exports `PRODUCTS: Product[]` — the sole data source, imported directly.
2. `src/types/product.ts` defines every domain type: `Product`, `Category`, `Size`, `InventoryStatus`, `SortOrder`, `Color`, `ProductImage`, and the UI state shapes `CatalogFilters` / `CatalogContextValue` / `ProductDetailSelections`.
3. `src/context/CatalogContext.tsx` holds catalog-level filter (`Category | null`) and sort (`SortOrder | null`) state via React Context. The `useCatalog()` hook throws if called outside `<CatalogProvider>`.

**Client boundary**: Only interactive components carry `"use client"` — `FilterBar`, `SortControls`, `ProductGrid` (reads Context), `ImageGallery` (gallery index), `SizeSelector`, `ColorSwatches`, and the `/products/[id]` page. Presentational leaves (`ProductCard`, `EmptyState`, `InventoryBadge`, `AddToCartPlaceholder`) are RSC-compatible.

**Images**: All product images use `next/image`. External placeholder images come from `picsum.photos` — that hostname is whitelisted in `next.config.mjs` under `images.remotePatterns`. Any new external image domain must be added there.

**Styling**: Tailwind utilities only — no CSS Modules, no inline styles. Content paths in `tailwind.config.ts` cover `./app/**/*.{ts,tsx}` and `./src/**/*.{ts,tsx}`.

## Key conventions

- `Product.images[0]` is always the card thumbnail; the full array feeds `ImageGallery`.
- `Category`, `Size`, and `InventoryStatus` are string union types (not TypeScript enums) — they serialise cleanly and don't need imports at every use site.
- `"use client"` is additive — start RSC, add the directive only when hooks or event handlers are required.
- Filter/sort state lives in Context; size/color selection on the detail page is local `useState` (not in Context).
- The "Add to Cart" button is a layout placeholder with no `onClick` — cart logic is out of scope.

## Project governance

Constitution and non-negotiables are in `.specify/memory/constitution.md`. The five enforced principles are: strict TypeScript, modular/reusable components, WCAG 2.1 AA accessibility, Core Web Vitals (CLS < 0.1, LCP < 2.5 s), and Tailwind-only styling.
