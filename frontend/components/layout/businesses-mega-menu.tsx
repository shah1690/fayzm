"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import type { BusinessData } from "@/content/businesses";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";
import { pickBusinessForLocale } from "@/shared/lib/business-pick";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

type Props = Readonly<{
  label: string;
  locale: Locale;
  businesses: BusinessData[];
}>;

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
  background: "linear-gradient(180deg, #070A0F 0%, #003566 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const text = {
  divisions: {
    en: "Business Divisions",
    uz: "Faoliyat yo'nalishlari",
    ru: "Направления бизнеса",
    zh: "业务板块",
  },
  ctaHeading: {
    en: "Partner with FAYZ-M",
    uz: "FAYZ-M bilan hamkorlik qiling",
    ru: "Сотрудничайте с FAYZ-M",
    zh: "与 FAYZ-M 合作",
  },
  ctaButton: {
    en: "Contact Us →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
    zh: "联系我们 →",
  },
} as const;

export function BusinessesMegaMenu({ label, locale, businesses }: Props) {
  const [open, setOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const activeBusiness = useMemo(
    () =>
      businesses.find((b) => pathname.startsWith(`/businesses/${b.slug}`)) ??
      null,
    [businesses, pathname],
  );
  const isActive = activeBusiness !== null;
  const featured = useMemo(
    () => pickBusinessForLocale(businesses, locale, 3),
    [businesses, locale],
  );
  const previewBusiness = useMemo(
    () =>
      businesses.find((b) => b.slug === hoveredSlug) ??
      activeBusiness ??
      featured,
    [activeBusiness, businesses, featured, hoveredSlug],
  );

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredSlug(null);
    }, 150);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover trigger for mega menu
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Trigger */}
      <div className="relative inline-flex flex-col items-center">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          onFocus={handleMouseEnter}
          className={`flex cursor-pointer items-center gap-1 text-sm transition-all duration-200 ${!isActive ? "text-[#070A0F] hover:text-[#003566]" : ""}`}
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
          style={{ background: "#003566", opacity: isActive ? 1 : 0 }}
        />
      </div>

      {/* Mega panel */}
      {open && (
        <div
          id={panelId}
          className="animate-dropdown fixed left-0 right-0 top-[76px] z-50 border-t border-gray-100 bg-white shadow-xl"
        >
          <div className="mx-auto max-w-[1440px] p-6">
            <div className="flex gap-4" style={{ height: 420 }}>
              {/* Left: image card */}
              <div
                className="relative w-[42%] overflow-hidden"
                style={{ borderRadius: 28 }}
              >
                <Image
                  key={`${previewBusiness.slug}-image`}
                  src={previewBusiness.ctaImage}
                  alt={previewBusiness.label[locale]}
                  fill
                  sizes="42vw"
                  className="animate-mega-preview object-cover"
                  {...shimmerImageProps(1200, 900)}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, #003566 0%, rgba(0,53,102,0.5) 35%, rgba(0,0,0,0.2) 100%)",
                  }}
                />
                <div
                  key={`${previewBusiness.slug}-content`}
                  className="animate-mega-preview relative z-10 flex h-full flex-col justify-between p-8"
                >
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
                      {previewBusiness.label[locale]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                      {previewBusiness.heading[locale]}
                    </h2>
                    <p className="text-sm text-white/70">
                      {previewBusiness.cardText[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: two stacked cards */}
              <div className="flex flex-1 flex-col gap-4">
                {/* Business list card */}
                <div className="relative flex-1 overflow-hidden rounded-[28px] bg-[#F5F5F5] px-5 py-4">
                  <Image
                    src="/images/pattern.svg"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="58vw"
                    unoptimized
                    className="pointer-events-none object-cover"
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
                      const previewed = previewBusiness.slug === b.slug;
                      return (
                        <Link
                          key={b.slug}
                          href={localizeHref(locale, `/businesses/${b.slug}`)}
                          onClick={() => {
                            setOpen(false);
                            setHoveredSlug(null);
                          }}
                          onMouseEnter={() => setHoveredSlug(b.slug)}
                          onFocus={() => setHoveredSlug(b.slug)}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white"
                          style={{
                            background: previewed
                              ? "rgba(255,255,255,0.9)"
                              : undefined,
                            transform: previewed
                              ? "translateX(6px)"
                              : undefined,
                          }}
                        >
                          <span
                            className="text-sm font-medium transition-all duration-200"
                            style={
                              active || previewed
                                ? gradientText
                                : { color: "#070A0F" }
                            }
                          >
                            {b.label[locale]}
                          </span>
                          {(active || previewed) && (
                            <span
                              className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-200"
                              style={{
                                background: "#003566",
                                opacity: previewed ? 1 : 0.55,
                                transform: previewed
                                  ? "scale(1.15)"
                                  : undefined,
                              }}
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
                  <Image
                    src="/images/k1.jpg"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="20vw"
                    className="absolute right-0 top-0 ml-auto h-full w-1/2 object-cover opacity-20"
                    style={{
                      left: "auto",
                      maskImage:
                        "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
                    }}
                    {...shimmerImageProps(800, 400)}
                  />
                  <div className="relative z-10 flex h-full items-center justify-between px-8">
                    <h3 className="text-lg font-bold text-white">
                      {text.ctaHeading[locale]}
                    </h3>
                    <Link
                      href={localizeHref(locale, "/contact")}
                      onClick={() => {
                        setOpen(false);
                        setHoveredSlug(null);
                      }}
                      className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all hover:bg-[#003566] hover:text-white"
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
