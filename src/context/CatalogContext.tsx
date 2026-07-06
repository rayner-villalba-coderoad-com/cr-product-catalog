"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CatalogContextValue, Category, SortOrder } from "@/types/product";

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") as Category | null) ?? null;
  const sortOrder = (searchParams.get("sort") as SortOrder | null) ?? null;

  const setCategory = useCallback(
    (value: Category | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const setSortOrder = useCallback(
    (value: SortOrder | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

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