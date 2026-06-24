"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CatalogContextValue, Category, SortOrder } from "@/types/product";

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);

  return (
    <CatalogContext.Provider
      value={{
        filters: { category, sortOrder },
        setCategory,
        setSortOrder,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used inside <CatalogProvider>");
  }
  return ctx;
}
