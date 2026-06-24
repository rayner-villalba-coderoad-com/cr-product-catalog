import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const thumbnail = product.images[0];
  const formattedPrice = `$${product.price.toFixed(2)}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: "4/5" }}>
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          width={400}
          height={500}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900 leading-snug">
            {product.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-700">
            {formattedPrice}
          </p>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center justify-center rounded border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label={`View details for ${product.name}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
