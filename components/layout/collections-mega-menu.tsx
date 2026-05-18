"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";
import { shimmerImageProps } from "@/shared/lib/image-placeholder";
import { localizeHref } from "@/shared/lib/localize-href";

type Props = Readonly<{ label: string; locale: Locale }>;

const content = {
  topCard: {
    image: "/images/g1.jpg",
    heading: {
      en: "Quality at every stitch.",
      uz: "Har bir tikuvda sifat.",
      ru: "Качество в каждом стежке.",
    },
    sub: {
      en: "Premium Textile Collections",
      uz: "Premium To'qimachilik Kolleksiyalari",
      ru: "Премиум Текстильные Коллекции",
    },
  },
  bottomCard: {
    heading: {
      en: "Made in Uzbekistan",
      uz: "O'zbekistonda ishlab chiqarilgan",
      ru: "Сделано в Узбекистане",
    },
    sub: {
      en: "700+ workers · 5+ export countries",
      uz: "700+ ishchi · 5+ eksport mamlakati",
      ru: "700+ рабочих · 5+ стран экспорта",
    },
  },
  women: {
    label: {
      en: "Women",
      uz: "Ayollar",
      ru: "Женщины",
    },
    image: "/images/collection-women.jpg",
    objectPosition: "right center",
    href: "/collections/women",
  },
  men: {
    label: {
      en: "Men",
      uz: "Erkaklar",
      ru: "Мужчины",
    },
    image: "/images/collection-men.jpg",
    objectPosition: "left center",
    href: "/collections/men",
  },
};

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

function PdfBookVisual({ tone }: Readonly<{ tone: "cream" | "blue" }>) {
  const isCream = tone === "cream";

  return (
    <div
      className="pointer-events-none absolute -right-8 bottom-4 h-[132px] w-[96px] translate-x-3 rotate-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-2 group-hover:rotate-2"
      aria-hidden="true"
    >
      <div className="absolute -left-4 top-3 h-[108px] w-[78px] rounded-[18px] bg-white/45 shadow-[0_18px_44px_rgba(0,0,0,0.16)]" />
      <div
        className="relative h-full overflow-hidden rounded-[20px] border shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
        style={{
          background: isCream ? "#FFFFFF" : "#F5EFE8",
          borderColor: isCream
            ? "rgba(0,53,102,0.12)"
            : "rgba(255,255,255,0.24)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 w-3"
          style={{ background: isCream ? "#003566" : "#E5D6C9" }}
        />
        <div className="absolute left-5 top-5 flex flex-col gap-1.5">
          <span
            className="w-fit rounded-full px-2 py-1 text-[9px] font-black tracking-[0.18em]"
            style={{
              background: isCream ? "#EF4444" : "#003566",
              color: "#FFFFFF",
            }}
          >
            PDF
          </span>
          <span
            className="h-1.5 w-12 rounded-full"
            style={{ background: isCream ? "#003566" : "#070A0F" }}
          />
          <span className="h-1 w-9 rounded-full bg-black/18" />
          <span className="h-1 w-11 rounded-full bg-black/12" />
        </div>
        <div className="absolute bottom-0 right-0 h-14 w-14 rounded-tl-[28px] bg-gradient-to-br from-transparent via-black/5 to-black/18" />
        <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#070A0F] text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
          ↗
        </div>
      </div>
    </div>
  );
}

const pdfText = {
  open: {
    en: "Open",
    uz: "Ochish",
    ru: "Открыть",
  },
} as const;

const gradientText = {
  background: "linear-gradient(180deg, #070A0F 0%, #003566 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export function CollectionsMegaMenu({ label, locale }: Props) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const isActive =
    pathname === "/collections" || pathname.startsWith("/collections/");
  const pdfLanguage = locale === "ru" ? "rus" : "eng";
  const womenCatalogHref =
    pdfLanguage === "eng"
      ? localizeHref(locale, "/catalogs/eng-woman")
      : `/documents/${pdfLanguage}-woman.pdf`;

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
              {/* Left: 2 cards side by side horizontally */}
              <div className="flex w-1/2 gap-4">
                {[content.men, content.women].map((cat) => {
                  const active = pathname === cat.href;
                  return (
                    <Link
                      key={cat.href}
                      href={localizeHref(locale, cat.href)}
                      onClick={() => setOpen(false)}
                      className="group relative flex-1 cursor-pointer overflow-hidden"
                      style={{ borderRadius: 24 }}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.label[locale]}
                        fill
                        sizes="25vw"
                        className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: cat.objectPosition }}
                        {...shimmerImageProps(900, 1200)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {active && (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white" />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p
                          className="text-2xl font-black leading-tight text-white"
                          style={active ? gradientText : {}}
                        >
                          {cat.label[locale]}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right: 2 equal-height cards with pattern bg */}
              <div className="flex w-1/2 flex-col gap-4">
                {[
                  {
                    key: "women",
                    label: { en: "Women", uz: "Ayollar", ru: "Женщины" },
                    sub: { en: "PDF", uz: "PDF", ru: "PDF" },
                    href: womenCatalogHref,
                    bg: "#e5d6c9",
                    textColor: "#003566",
                    subColor: "rgba(1,37,85,0.48)",
                    patternFilter: "brightness(0)",
                    patternOpacity: 0.12,
                    bookTone: "cream" as const,
                  },
                  {
                    key: "men",
                    label: { en: "Men", uz: "Erkaklar", ru: "Мужчины" },
                    sub: { en: "PDF", uz: "PDF", ru: "PDF" },
                    href: `/documents/${pdfLanguage}-man.pdf`,
                    bg: "#003566",
                    textColor: "#ffffff",
                    subColor: "rgba(255,255,255,0.5)",
                    patternFilter: "none",
                    patternOpacity: 0.16,
                    bookTone: "blue" as const,
                  },
                ].map((card) => (
                  <Link
                    key={card.key}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    aria-label={`${card.label[locale]} PDF ${pdfText.open[locale]}`}
                    className="group relative min-h-0 flex-1 overflow-hidden"
                    style={{ borderRadius: 24, background: card.bg }}
                  >
                    {/* Pattern background */}
                    <Image
                      src="/images/pattern.svg"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="25vw"
                      unoptimized
                      className="absolute inset-0 object-cover"
                      style={{
                        filter: card.patternFilter,
                        opacity: card.patternOpacity,
                      }}
                    />
                    <PdfBookVisual tone={card.bookTone} />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6 pr-24">
                      <span
                        className="w-fit rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{
                          color: card.subColor,
                          borderColor: card.subColor,
                        }}
                      >
                        {card.sub[locale]}
                      </span>
                      <div className="flex flex-col items-start gap-3">
                        <p
                          className="text-3xl font-black"
                          style={{ color: card.textColor }}
                        >
                          {card.label[locale]}
                        </p>
                        <span
                          className="inline-flex translate-y-1 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                          style={{
                            background:
                              card.bookTone === "cream" ? "#003566" : "#E5D6C9",
                            color:
                              card.bookTone === "cream" ? "#FFFFFF" : "#003566",
                          }}
                        >
                          {pdfText.open[locale]}
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
