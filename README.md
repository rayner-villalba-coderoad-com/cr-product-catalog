# CR Product Catalog

A lightning-fast, accessible clothing e-commerce catalog built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Driven entirely by static mock data — no backend required.

## Features

- **Responsive product grid** — 1 / 2 / 3 column layout across mobile, tablet, and desktop
- **Category filter** — Tops, Bottoms, Outerwear (instant, no page reload)
- **Price sort** — Low to High / High to Low
- **Product detail page** — multi-image gallery, size selector (S–XL), colour swatches, inventory badge, and Add to Cart placeholder
- **WCAG 2.1 AA** — semantic HTML, keyboard-navigable, visible focus rings, accessible labels throughout
- **Zero layout shift** — all images served via `next/image` with explicit dimensions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001/products](http://localhost:3001/products).

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Start production server on port 3001 |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript strict-mode check |

## Project Structure

```
app/
├── layout.tsx              # Root layout — header, global CSS
├── page.tsx                # Redirects / → /products
└── products/
    ├── page.tsx            # Catalog grid page
    └── [id]/
        └── page.tsx        # Product detail page

src/
├── types/product.ts        # All domain types (Product, Category, Size, …)
├── data/products.ts        # Static mock dataset — 10 products
├── context/
│   └── CatalogContext.tsx  # Filter + sort state (React Context)
└── components/
    ├── catalog/            # Grid, card, filter bar, sort controls, empty state
    └── product/            # Gallery, size selector, colour swatches, inventory badge, CTA
```

`@/` resolves to `src/` (configured in `tsconfig.json`).

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 — App Router |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 |
| Data | Static JSON mock (`src/data/products.ts`) |
| Images | `next/image` — placeholder images from [picsum.photos](https://picsum.photos) |

## Architecture Notes

**Data flow**: `PRODUCTS` array → typed `Product[]` → RSC page → client components via props or `CatalogContext`.

**State**: Filter/sort state lives in `CatalogContext` (shared across `FilterBar`, `SortControls`, `ProductGrid`). Size and colour selections on the detail page are local `useState` — not in context.

> **Note**: Filter and sort state is held in React Context and is not persisted to the URL. Active filters reset on page refresh. URL-based filter persistence is a planned future enhancement.

**Client boundary**: Pages are React Server Components by default. `"use client"` is added only to components that use hooks or event handlers: `FilterBar`, `SortControls`, `ProductGrid`, `ImageGallery`, `SizeSelector`, `ColorSwatches`, and the detail page.

**Adding products**: Edit `src/data/products.ts`. Each product must satisfy the `Product` interface — at minimum one image, one size, one colour, a positive price, and a unique `id` that becomes the URL segment (`/products/{id}`).

**Adding image domains**: External image hostnames must be whitelisted in `next.config.mjs` under `images.remotePatterns`.