"use client";

import Image from "next/image";
import { useMemo } from "react";

type Props = Readonly<{
  downloadUrl: string;
  imageBaseUrl: string;
  pageCount: number;
  title: string;
}>;

export function ImageCatalogViewer({
  downloadUrl,
  imageBaseUrl,
  pageCount,
  title,
}: Props) {
  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index + 1),
    [pageCount],
  );
  const normalizedBaseUrl = imageBaseUrl.replace(/\/+$/, "");

  return (
    <main className="min-h-screen bg-[#f3eee8] text-[#102033]">
      <div className="sticky top-0 z-20 border-black/10 border-b bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="font-black text-base tracking-tight md:text-xl">
              {title}
            </h1>
            <p className="text-[#667085] text-xs md:text-sm">
              Fast catalog viewer · pages load on scroll
            </p>
          </div>
          <a
            className="rounded-full bg-[#003566] px-4 py-2 font-bold text-sm text-white"
            href={downloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            PDF
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-3 p-2 md:gap-5 md:p-6">
        {pages.map((pageNumber) => {
          const paddedPage = String(pageNumber).padStart(3, "0");
          const src = `${normalizedBaseUrl}/pages/page-${paddedPage}.jpg`;

          return (
            <section
              className="overflow-hidden rounded-xl bg-white shadow-[0_10px_35px_rgba(16,32,51,0.14)] md:rounded-2xl"
              key={pageNumber}
            >
              <Image
                alt={`${title} page ${pageNumber}`}
                className="h-auto w-full bg-white"
                height={1268}
                loading={pageNumber <= 2 ? "eager" : "lazy"}
                priority={pageNumber === 1}
                quality={72}
                sizes="(max-width: 1024px) 100vw, 1024px"
                src={src}
                unoptimized
                width={897}
              />
            </section>
          );
        })}
      </div>
    </main>
  );
}
