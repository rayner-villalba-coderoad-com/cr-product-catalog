import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeRoad Catalog",
  description: "A lightning-fast, accessible clothing e-commerce catalog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Catalog
              </Link>
              <nav aria-label="Main navigation">
                <Link
                  href="/products"
                  className="text-sm font-medium text-gray-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  Shop
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
