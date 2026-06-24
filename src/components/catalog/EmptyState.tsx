import type { Category } from "@/types/product";

interface EmptyStateProps {
  activeCategory: Category | null;
}

export default function EmptyState({ activeCategory }: EmptyStateProps) {
  const message = activeCategory
    ? `No ${activeCategory} items found.`
    : "No items found.";

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-lg text-gray-500">{message}</p>
      <p className="mt-2 text-sm text-gray-400">
        Try adjusting your filters or browse all categories.
      </p>
    </div>
  );
}
