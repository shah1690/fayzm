"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { businesses, getMegaMenuFeaturedBusiness } from "@/content/businesses";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

type Props = Readonly<{ label: string; locale: Locale }>;

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const gradientText = {
  background: "linear-gradient(180deg, #070A0F 0%, #84CC16 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const text = {
  divisions: {
    en: "Business Divisions",
    uz: "Faoliyat yo'nalishlari",
    ru: "Направления бизнеса",
  },
  ctaHeading: {
    en: "Partner with FAYZ-M",
    uz: "FAYZ-M bilan hamkorlik qiling",
    ru: "Сотрудничайте с FAYZ-M",
  },
  ctaButton: {
    en: "Contact Us →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
} as const;

export function BusinessesMegaMenu({ label, locale }: Props) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive = businesses.some((b) =>
    pathname.startsWith(`/businesses/${b.slug}`),
  );
  const featured = useMemo(() => getMegaMenuFeaturedBusiness(locale), [locale]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover trigger for mega menu
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Trigger */}
      <div className="relative inline-flex flex-col items-center">
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-1 text-sm transition-all duration-200 ${!isActive ? "text-[#070A0F] hover:text-[#84CC16]" : ""}`}
          style={isActive ? gradientText : undefined}
        >
          {label}
          <span
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown />
          </span>
        </button>
        <span
          className="absolute -bottom-2 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
          style={{ background: "#84CC16", opacity: isActive ? 1 : 0 }}
        />
      </div>

      {/* Mega panel */}
      {open && (
        <div className="animate-dropdown fixed left-0 right-0 top-[76px] z-50 border-t border-gray-100 bg-white shadow-xl">
          <div className="mx-auto max-w-[1440px] p-6">
            <div className="flex gap-4" style={{ height: 420 }}>
              {/* Left: image card */}
              <div
                className="relative w-[42%] overflow-hidden"
                style={{ borderRadius: 28 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.ctaImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0.5) 35%, rgba(0,0,0,0.2) 100%)",
                  }}
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-8">
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
                    <span className="text-sm font-medium text-white">
                      {featured.label[locale]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                      {featured.heading[locale]}
                    </h2>
                    <p className="text-sm text-white/70">
                      {featured.cardText[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: two stacked cards */}
              <div className="flex flex-1 flex-col gap-4">
                {/* Business list card */}
                <div className="relative flex-1 overflow-hidden rounded-[28px] bg-[#F5F5F5] px-5 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/pattern.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ filter: "brightness(0)", opacity: 0.06 }}
                  />
                  <div className="relative z-10 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {text.divisions[locale]}
                    </span>
                  </div>
                  <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-0">
                    {businesses.map((b) => {
                      const active = pathname.startsWith(
                        `/businesses/${b.slug}`,
                      );
                      return (
                        <Link
                          key={b.slug}
                          href={localizeHref(locale, `/businesses/${b.slug}`)}
                          onClick={() => setOpen(false)}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-white"
                        >
                          <span
                            className="text-sm font-medium"
                            style={active ? gradientText : { color: "#070A0F" }}
                          >
                            {b.label[locale]}
                          </span>
                          {active && (
                            <span
                              className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ background: "#84CC16" }}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Dark CTA card */}
                <div
                  className="relative overflow-hidden rounded-[28px] bg-[#070A0F]"
                  style={{ height: 130 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/k1.jpg"
                    alt=""
                    className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20"
                    style={{
                      maskImage:
                        "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
                    }}
                  />
                  <div className="relative z-10 flex h-full items-center justify-between px-8">
                    <h3 className="text-lg font-bold text-white">
                      {text.ctaHeading[locale]}
                    </h3>
                    <Link
                      href={localizeHref(locale, "/contact")}
                      onClick={() => setOpen(false)}
                      className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all hover:bg-[#84CC16]"
                    >
                      {text.ctaButton[locale]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
