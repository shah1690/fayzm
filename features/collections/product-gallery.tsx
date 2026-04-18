"use client";

import Link from "next/link";

type Product = {
  id: string;
  name: string;
  image: string;
  href: string;
};

type Props = Readonly<{ products: Product[] }>;

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
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
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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

          {/* Green gradient on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(132,204,22,0.1) 0%, rgba(132,204,22,0.75) 100%)",
            }}
          />

          {/* Arrow icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <ArrowIcon />
            </div>
          </div>

          {/* Name blur badge — always visible */}
          <div className="absolute bottom-3 left-3">
            <div
              className="rounded-xl px-3 py-2 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              <p className="text-sm font-semibold text-white">{product.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
