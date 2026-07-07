interface ProductGridProps {
  /** Full unfiltered product list. Filtering and sorting are applied internally
   *  by reading CatalogContext — must be rendered inside <CatalogProvider>. */
  products: Product[];
}