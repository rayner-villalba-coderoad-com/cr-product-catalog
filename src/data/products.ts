import type { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // ── Tops (4) ──────────────────────────────────────────────────────────────
  {
    id: "prod-001",
    name: "Classic White Oxford Shirt",
    category: "Tops",
    price: 59.99,
    images: [
      {
        src: "https://picsum.photos/seed/oxford-a/400/500",
        alt: "Classic White Oxford Shirt — front view",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/oxford-b/400/500",
        alt: "Classic White Oxford Shirt — back view",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Light Blue", hex: "#add8e6" },
    ],
    description:
      "A timeless oxford shirt cut from 100% premium cotton. Features a button-down collar, chest pocket, and a relaxed fit that moves with you. Perfect for the office or a weekend brunch.",
    inventoryStatus: "In Stock",
  },
  {
    id: "prod-002",
    name: "Linen Tee",
    category: "Tops",
    price: 34.99,
    images: [
      {
        src: "https://picsum.photos/seed/linen-a/400/500",
        alt: "Linen Tee — front view",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/linen-b/400/500",
        alt: "Linen Tee — lifestyle shot",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Natural", hex: "#f5f0e8" },
      { name: "Sage", hex: "#8fad91" },
      { name: "Terracotta", hex: "#c0674a" },
    ],
    description:
      "Breathable and effortlessly stylish, this linen tee is woven from pre-washed European linen for an instant lived-in feel. A wardrobe essential for warm days and laid-back evenings.",
    inventoryStatus: "In Stock",
  },
  {
    id: "prod-003",
    name: "Striped Polo",
    category: "Tops",
    price: 44.99,
    images: [
      {
        src: "https://picsum.photos/seed/polo-a/400/500",
        alt: "Striped Polo — front view showing navy and white stripes",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/polo-b/400/500",
        alt: "Striped Polo — side and collar detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy / White", hex: "#1f3a6e" },
      { name: "Red / White", hex: "#c0392b" },
    ],
    description:
      "A sport-inspired polo reimagined in a classic Breton stripe. Made from a soft piqué cotton blend with a ribbed collar and two-button placket. Smart enough for the weekend, relaxed enough for the court.",
    inventoryStatus: "Low Stock",
  },
  {
    id: "prod-004",
    name: "Merino Turtleneck",
    category: "Tops",
    price: 89.99,
    images: [
      {
        src: "https://picsum.photos/seed/turtle-a/400/500",
        alt: "Merino Turtleneck — front view in Charcoal",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/turtle-b/400/500",
        alt: "Merino Turtleneck — texture and neck detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Ivory", hex: "#fffff0" },
      { name: "Burgundy", hex: "#800020" },
    ],
    description:
      "Crafted from 100% extra-fine merino wool, this fitted turtleneck offers natural warmth without bulk. Naturally moisture-wicking and odour-resistant — ideal for layering through the cooler months.",
    inventoryStatus: "In Stock",
  },

  // ── Bottoms (3) ───────────────────────────────────────────────────────────
  {
    id: "prod-005",
    name: "Slim Chinos",
    category: "Bottoms",
    price: 69.99,
    images: [
      {
        src: "https://picsum.photos/seed/chino-a/400/500",
        alt: "Slim Chinos — front view in Stone",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/chino-b/400/500",
        alt: "Slim Chinos — back view showing slim cut",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Stone", hex: "#c2b280" },
      { name: "Olive", hex: "#6b7c3a" },
      { name: "Navy", hex: "#1f3a6e" },
    ],
    description:
      "A modern slim-fit chino in a durable cotton-twill fabric. Features a mid-rise waist, tapered leg, and a clean finish that pairs equally well with loafers or clean white trainers.",
    inventoryStatus: "In Stock",
  },
  {
    id: "prod-006",
    name: "Denim Jeans",
    category: "Bottoms",
    price: 79.99,
    images: [
      {
        src: "https://picsum.photos/seed/denim-a/400/500",
        alt: "Denim Jeans — front view in Indigo",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/denim-b/400/500",
        alt: "Denim Jeans — back view and pocket detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#3f5f8a" },
      { name: "Washed Black", hex: "#2b2b2b" },
    ],
    description:
      "Our signature straight-leg jean in a sturdy 12 oz selvedge denim. Pre-washed for softness and a natural fade. A single pair that gets better with every wear.",
    inventoryStatus: "Low Stock",
  },
  {
    id: "prod-007",
    name: "Cargo Shorts",
    category: "Bottoms",
    price: 49.99,
    images: [
      {
        src: "https://picsum.photos/seed/cargo-a/400/500",
        alt: "Cargo Shorts — front view in Khaki",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/cargo-b/400/500",
        alt: "Cargo Shorts — side pocket detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Slate Grey", hex: "#708090" },
    ],
    description:
      "Relaxed-fit cargo shorts with two deep side pockets, a zip fly, and an adjustable waistband. Made from a lightweight ripstop fabric that dries fast and resists abrasion on the go.",
    inventoryStatus: "In Stock",
  },

  // ── Outerwear (3) ─────────────────────────────────────────────────────────
  {
    id: "prod-008",
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 199.99,
    images: [
      {
        src: "https://picsum.photos/seed/coat-a/400/500",
        alt: "Wool Overcoat — full-length front view in Camel",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/coat-b/400/500",
        alt: "Wool Overcoat — lapel and button detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    description:
      "A single-breasted overcoat woven from a 70% wool blend that drapes beautifully and insulates against harsh winds. Fully lined, with notched lapels and a structured shoulder — the definitive winter statement piece.",
    inventoryStatus: "In Stock",
  },
  {
    id: "prod-009",
    name: "Bomber Jacket",
    category: "Outerwear",
    price: 119.99,
    images: [
      {
        src: "https://picsum.photos/seed/bomber-a/400/500",
        alt: "Bomber Jacket — front view in Midnight Green",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/bomber-b/400/500",
        alt: "Bomber Jacket — ribbed cuff and zip detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Midnight Green", hex: "#1a3a2a" },
      { name: "Tan", hex: "#d2b48c" },
    ],
    description:
      "A modern take on the classic MA-1 bomber, cut in a water-resistant nylon shell with a quilted interior lining. Ribbed cuffs, collar, and hem keep the cold out while the relaxed silhouette keeps things fresh.",
    inventoryStatus: "In Stock",
  },
  {
    id: "prod-010",
    name: "Trench Coat",
    category: "Outerwear",
    price: 159.99,
    images: [
      {
        src: "https://picsum.photos/seed/trench-a/400/500",
        alt: "Trench Coat — belted front view in Caramel",
        index: 0,
      },
      {
        src: "https://picsum.photos/seed/trench-b/400/500",
        alt: "Trench Coat — back vent and belt buckle detail",
        index: 1,
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Caramel", hex: "#c68642" },
      { name: "Ecru", hex: "#f0ead6" },
    ],
    description:
      "A heritage-inspired trench coat in a water-repellent cotton gabardine. Features a double-breasted front, belted waist, storm shield, and gun flap. Timeless enough to outlast every trend.",
    inventoryStatus: "In Stock",
  },
];
