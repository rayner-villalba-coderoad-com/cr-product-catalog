"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CatalogContextValue, Category, SortOrder } from "@/types/product";

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategoryState] = useState<Category | null>(
    (searchParams.get("category") as Category) || null
  );
  const [sortOrder, setSortOrderState] = useState<SortOrder | null>(
    (searchParams.get("sort") as SortOrder) || null
  );

  // Keep state in sync if the user navigates back/forward
  useEffect(() => {
    setCategoryState((searchParams.get("category") as Category) || null);
    setSortOrderState((searchParams.get("sort") as SortOrder) || null);
  }, [searchParams]);

  function setCategory(cat: Category | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat);
    else params.delete("category");
    router.push(`/products?${params.toString()}`);
  }

  function setSortOrder(sort: SortOrder | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (sort) params.set("sort", sort);
    else params.delete("sort");
    router.push(`/products?${params.toString()}`);
  }

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