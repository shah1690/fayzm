"use client";

import Link from "next/link";

type Product = {
  id: string;
  name: string;
  size: string;
  image: string;
  href: string;
};

type Props = Readonly<{ products: Product[] }>;

function ArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductGallery({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={product.href}
          className="group relative overflow-hidden"
          style={{ borderRadius: 20, aspectRatio: "3/4" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Default overlay: name + size */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0">
            <p className="text-sm font-semibold text-white">{product.name}</p>
            <p className="mt-0.5 text-xs text-white/60">{product.size}</p>
          </div>

          {/* Hover overlay: green gradient + arrow */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0.85) 100%)",
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <ArrowIcon />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
