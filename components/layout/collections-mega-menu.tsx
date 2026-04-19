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
      en: "Women's Knitwear",
      uz: "Ayollar trikotaji",
      ru: "Женский трикотаж",
    },
    image: "/images/k2.jpg",
    href: "/collections/women",
    count: {
      en: "2,800+ items/month",
      uz: "2,800+ dona/oy",
      ru: "2 800+ ед./мес.",
    },
  },
  men: {
    label: {
      en: "Men's Knitwear",
      uz: "Erkaklar trikotaji",
      ru: "Мужской трикотаж",
    },
    image: "/images/k3.jpg",
    href: "/collections/men",
    count: {
      en: "1,200+ items/month",
      uz: "1,200+ dona/oy",
      ru: "1 200+ ед./мес.",
    },
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
                {[content.women, content.men].map((cat) => {
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
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {active && (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#84CC16]" />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p
                          className="text-sm font-semibold text-white"
                          style={active ? gradientText : {}}
                        >
                          {cat.label[locale]}
                        </p>
                        <p className="mt-0.5 text-xs text-white/60">
                          {cat.count[locale]}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right: 2 cards stacked vertically, equal height */}
              <div className="flex w-1/2 flex-col gap-4">
                {/* Top card: image */}
                <div
                  className="relative min-h-0 flex-1 overflow-hidden"
                  style={{ borderRadius: 24 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.topCard.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    <div className="flex items-center gap-2">
                      <svg
                        width="12"
                        height="12"
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
                      <span className="text-xs text-white/70">
                        {content.topCard.sub[locale]}
                      </span>
                    </div>
                    <p className="text-lg font-bold uppercase leading-tight text-white">
                      &ldquo;{content.topCard.heading[locale]}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom card: dark brand card */}
                <div
                  className="flex min-h-0 flex-1 flex-col justify-between bg-[#070A0F] p-6"
                  style={{ borderRadius: 24 }}
                >
                  <p className="text-xl font-bold text-white">FAYZ-M</p>
                  <div>
                    <p className="text-base font-semibold text-white">
                      {content.bottomCard.heading[locale]}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {content.bottomCard.sub[locale]}
                    </p>
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
