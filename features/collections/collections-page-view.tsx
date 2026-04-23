"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

export function CollectionsPageView() {
  const t = useTranslations("Collections");
  const locale = useLocale() as Locale;

  return (
    <main>
      {/* Hero: 2-column card layout */}
      <section className="px-5 py-6 md:px-10">
        <div
          className="flex flex-col gap-4 md:flex-row"
          style={{ minHeight: "calc(100vh - 124px)" }}
        >
          {/* Left: large image card with quote */}
          <div
            className="relative min-h-[480px] flex-1 overflow-hidden md:min-h-0"
            style={{ borderRadius: 32 }}
          >
            <Image
              src="/images/g1.jpg"
              alt=""
              fill
              sizes="58vw"
              className="absolute inset-0 object-cover"
              {...shimmerImageProps(1200, 1400)}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
              <div className="max-w-md">
                <p className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
                  &ldquo;{t("quote")}&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/70">{t("subtitle")}</p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm text-white/60">{t("madeIn")}</span>
              </div>
            </div>
          </div>

          {/* Right: two stacked cards */}
          <div className="flex w-full flex-col gap-4 md:w-[42%]">
            {/* Top: brand info card */}
            <div
              className="flex flex-1 flex-col justify-between bg-[#F5F5F5] p-8 md:p-10"
              style={{ borderRadius: 32 }}
            >
              <div>
                <p className="text-2xl font-bold text-[#070A0F]">
                  {t("brand")}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {t("textileCollections")}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                {t("description")}
              </p>
            </div>

            {/* Bottom: dark CTA card */}
            <div
              className="relative overflow-hidden bg-[#070A0F]"
              style={{ borderRadius: 32, minHeight: 200 }}
            >
              <Image
                src="/images/g-cta.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="28vw"
                className="absolute right-0 top-0 ml-auto h-full w-2/3 object-cover"
                style={{
                  left: "auto",
                  maskImage:
                    "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
                  WebkitMaskImage:
                    "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
                }}
                {...shimmerImageProps(900, 600)}
              />
              <div
                className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10"
                style={{ minHeight: 200 }}
              >
                <h2 className="max-w-[200px] text-xl font-bold uppercase leading-tight text-white md:text-2xl">
                  {t("exploreRange")}
                </h2>
                <Link
                  href={localizeHref(locale, "/contact")}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all hover:bg-[#003566] hover:text-white"
                >
                  {t("requestCatalogue")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories row */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: t("womenKnitwear"),
                href: "/collections/women",
                image: "/images/k2.jpg",
                count: t("womenCount"),
              },
              {
                label: t("menKnitwear"),
                href: "/collections/men",
                image: "/images/k3.jpg",
                count: t("menCount"),
              },
              {
                label: t("exportCollections"),
                href: "/contact",
                image: "/images/g2.jpg",
                count: t("exportCount"),
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={localizeHref(locale, cat.href)}
                className="group relative overflow-hidden"
                style={{ borderRadius: 24, minHeight: 260 }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="33vw"
                  className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                  {...shimmerImageProps(900, 1200)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-base font-semibold text-white">
                    {cat.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
