"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { CatalogContextValue, Category, SortOrder } from "@/types/product";

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") as Category) || null;
  const sortOrder = (searchParams.get("sort") as SortOrder) || null;

  const setCategory = (cat: Category | null) => {
    const params = new URLSearchParams(searchParams.toString());
    cat ? params.set("category", cat) : params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setSortOrder = (order: SortOrder | null) => {
    const params = new URLSearchParams(searchParams.toString());
    order ? params.set("sort", order) : params.delete("sort");
    router.replace(`${pathname}?${params.toString()}`);
  };

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