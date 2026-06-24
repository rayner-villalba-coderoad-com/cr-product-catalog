# Implementation Plan: Clothing Brand Product Catalog

**Branch**: `001-clothing-catalog` | **Date**: 2026-06-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-clothing-catalog/spec.md`

## Summary

Build a client-side clothing catalog using **Next.js 14+ App Router**, **TypeScript
(strict)**, and **Tailwind CSS**, driven by static JSON mock data. The catalog
exposes two routes: `/products` (responsive grid with filter/sort) and
`/products/[id]` (full product detail view). Filter and sort state is managed via
React Context; size and color selections are local `useState` per detail page. All
UI is built from modular, reusable components with WCAG 2.1 AA accessibility and
zero layout shift for images.

> **Correction note**: The planning input referenced "Express.js." Express.js is a
> Node.js server framework and is not applicable to this client-side catalog.
> Next.js (App Router) is the mandated framework per the project constitution and
> provides the `/products` / `/products/[id]` routing natively.

## Technical Context

**Language/Version**: TypeScript 5.x — strict mode (`strict: true`, `noImplicitAny`,
`strictNullChecks`), zero `any` escapes.

**Primary Dependencies**: Next.js 14+ (App Router), React 18+, Tailwind CSS 3.x.
No additional runtime dependencies beyond the constitution-mandated stack.

**Storage**: Static JSON mock data file (`src/data/products.ts`) — no database,
no external API. All product data is imported at build/render time.

**Testing**: Not in scope for this feature (no test framework prescribed in this
plan; testing tasks are deferred to `/speckit-tasks` if explicitly requested).

**Target Platform**: Web browser — mobile-first, responsive across mobile (< 640 px),
tablet (640–1023 px), and desktop (≥ 1024 px) viewports.

**Project Type**: Next.js web application (App Router, React Server Components by
default; Client Components only for interactive filter/sort controls and detail
page selectors).

**Performance Goals**: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on a mid-tier mobile
device (per constitution Principle IV).

**Constraints**: All product images MUST use `next/image` with explicit dimensions.
No `any` types. No ad-hoc inline styles. No unused dependencies.

**Scale/Scope**: Static mock catalog of 8–12 products; all filtering and sorting
runs client-side in memory. No pagination required for this scope.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| # | Principle | Status | Evidence |
|---|-----------|--------|----------|
| I | Strict Type Safety | ✅ PASS | `tsconfig` strict mode; typed `Product` interface; no `any`; enums for `Category`, `Size`, `InventoryStatus` |
| II | Modular, Reusable Components | ✅ PASS | `ProductCard`, `FilterBar`, `SortControls`, `ImageGallery`, `SizeSelector`, `ColorSwatches`, `InventoryBadge`, `AddToCartPlaceholder` — each single-responsibility, typed props |
| III | Accessibility First — WCAG 2.1 AA | ✅ PASS | Semantic `<main>`, `<article>`, `<ul>/<li>` for grid; `aria-label` on filters and selectors; keyboard operability verified in acceptance scenarios US1–US3 |
| IV | Performance & Core Web Vitals | ✅ PASS | All images via `next/image` with `width`/`height` or `fill` + sized container; RSC by default; `"use client"` only on interactive components |
| V | Consistent, Utility-First Styling | ✅ PASS | Tailwind utilities only; no ad-hoc CSS files; shared config for spacing, color, breakpoints |

**Gate result**: All 5 principles pass. No complexity tracking required.

## Project Structure

### Documentation (this feature)

```text
specs/001-clothing-catalog/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── component-props.md
│   └── routes.md
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                        # Root layout — <html>, <body>, global nav
├── page.tsx                          # Root route — redirects to /products
└── products/
    ├── page.tsx                      # /products — catalog grid page (RSC shell + client controls)
    └── [id]/
        └── page.tsx                  # /products/[id] — product detail page

src/
├── types/
│   └── product.ts                    # All domain types & interfaces (Product, Category, Size…)
├── data/
│   └── products.ts                   # Mock product dataset (8–12 items, typed as Product[])
├── context/
│   └── CatalogContext.tsx            # React Context: filter category + sort order state
├── components/
│   ├── catalog/
│   │   ├── ProductGrid.tsx           # Responsive <ul> grid of ProductCard items
│   │   ├── ProductCard.tsx           # <article> card: image, name, price, View Details button
│   │   ├── FilterBar.tsx             # Category filter control (All / Tops / Bottoms / Outerwear)
│   │   ├── SortControls.tsx          # Price sort control (Low→High / High→Low)
│   │   └── EmptyState.tsx            # Zero-results message
│   └── product/
│       ├── ImageGallery.tsx          # Multi-image gallery with prev/next nav
│       ├── SizeSelector.tsx          # S / M / L / XL button group
│       ├── ColorSwatches.tsx         # Named color swatch buttons
│       ├── InventoryBadge.tsx        # In Stock / Low Stock badge
│       └── AddToCartPlaceholder.tsx  # CTA layout placeholder (non-functional)
```

**Structure Decision**: Single Next.js project. No separate backend — all data is
static. `app/` follows App Router conventions; `src/` holds all domain logic,
types, mock data, context, and components. This keeps the constitution-mandated
stack intact with no extra dependencies.

## Complexity Tracking

> No constitution violations — this section is intentionally empty.
