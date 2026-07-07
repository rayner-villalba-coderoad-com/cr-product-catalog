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

  const category = (searchParams.get("category") as Category | null) ?? null;
  const sortOrder = (searchParams.get("sortOrder") as SortOrder | null) ?? null;

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  }

  function setCategory(value: Category | null) {
    updateParam("category", value);
  }

  function setSortOrder(value: SortOrder | null) {
    updateParam("sortOrder", value);
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