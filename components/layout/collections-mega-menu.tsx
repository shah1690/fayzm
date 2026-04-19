"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";
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

const gradientText = {
  background: "linear-gradient(180deg, #070A0F 0%, #84CC16 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export function CollectionsMegaMenu({ label, locale }: Props) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive =
    pathname === "/collections" || pathname.startsWith("/collections/");

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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.image}
                        alt={cat.label[locale]}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: cat.objectPosition }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {active && (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#84CC16]" />
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
                    sub: {
                      en: "New Releases",
                      uz: "Yangi kolleksiya",
                      ru: "Новинки",
                    },
                    href: "/collections/women",
                    bg: "#e5d6c9",
                    textColor: "#012555",
                    subColor: "rgba(1,37,85,0.45)",
                    patternFilter: "brightness(0)",
                    patternOpacity: 0.18,
                    btnBg: "#012555",
                    btnStroke: "#e5d6c9",
                  },
                  {
                    key: "men",
                    label: { en: "Men", uz: "Erkaklar", ru: "Мужчины" },
                    sub: {
                      en: "New Releases",
                      uz: "Yangi kolleksiya",
                      ru: "Новинки",
                    },
                    href: "/collections/men",
                    bg: "#012555",
                    textColor: "#ffffff",
                    subColor: "rgba(255,255,255,0.4)",
                    patternFilter: "none",
                    patternOpacity: 0.2,
                    btnBg: "#84CC16",
                    btnStroke: "#012555",
                  },
                ].map((card) => (
                  <Link
                    key={card.key}
                    href={localizeHref(locale, card.href)}
                    onClick={() => setOpen(false)}
                    className="group relative min-h-0 flex-1 overflow-hidden"
                    style={{ borderRadius: 24, background: card.bg }}
                  >
                    {/* Pattern background */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/pattern.svg"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        filter: card.patternFilter,
                        opacity: card.patternOpacity,
                      }}
                    />
                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: card.subColor }}
                      >
                        {card.sub[locale]}
                      </span>
                      <div className="flex items-end justify-between">
                        <p
                          className="text-3xl font-black"
                          style={{ color: card.textColor }}
                        >
                          {card.label[locale]}
                        </p>
                        {/* Hover PDF btn */}
                        <span className="translate-x-4 flex h-9 w-9 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="#ef5350"
                              d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.93 10.44c.41.9.93 1.64 1.53 2.15l.41.32c-.87.16-2.07.44-3.34.93l-.11.04l.5-1.04c.45-.87.78-1.66 1.01-2.4m6.48 3.81c.18-.18.27-.41.28-.66c.03-.2-.02-.39-.12-.55c-.29-.47-1.04-.69-2.28-.69l-1.29.07l-.87-.58c-.63-.52-1.2-1.43-1.6-2.56l.04-.14c.33-1.33.64-2.94-.02-3.6a.85.85 0 0 0-.61-.24h-.24c-.37 0-.7.39-.79.77c-.37 1.33-.15 2.06.22 3.27v.01c-.25.88-.57 1.9-1.08 2.93l-.96 1.8l-.89.49c-1.2.75-1.77 1.59-1.88 2.12c-.04.19-.02.36.05.54l.03.05l.48.31l.44.11c.81 0 1.73-.95 2.97-3.07l.18-.07c1.03-.33 2.31-.56 4.03-.75c1.03.51 2.24.74 3 .74c.44 0 .74-.11.91-.3m-.41-.71l.09.11c-.01.1-.04.11-.09.13h-.04l-.19.02c-.46 0-1.17-.19-1.9-.51c.09-.1.13-.1.23-.1c1.4 0 1.8.25 1.9.35M7.83 17c-.65 1.19-1.24 1.85-1.69 2c.05-.38.5-1.04 1.21-1.69zm3.02-6.91c-.23-.9-.24-1.63-.07-2.05l.07-.12l.15.05c.17.24.19.56.09 1.1l-.03.16l-.16.82z"
                            />
                          </svg>
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
