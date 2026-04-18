"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

const content = {
  heading: {
    en: "Quality Textiles.\nSustainable Future.",
    uz: "Sifatli To'qimachilik.\nBarqaror Kelajak.",
    ru: "Качественный Текстиль.\nУстойчивое Будущее.",
  },
  description: {
    en: "FAYZ-M produces premium yarn, fabric, and garments — supplying global partners with consistent quality and sustainable practices.",
    uz: "FAYZ-M premium ip, mato va kiyim ishlab chiqaradi — global hamkorlarga doimiy sifat va barqaror amaliyot bilan ta'minlaydi.",
    ru: "FAYZ-M производит premium пряжу, ткань и одежду — обеспечивая глобальных партнёров стабильным качеством.",
  },
  cta: {
    en: "Get in Touch →",
    uz: "Bog'lanish →",
    ru: "Связаться →",
  },
  stat: {
    value: "1500+",
    label: {
      en: "Employees across all divisions.",
      uz: "Barcha bo'limlardagi xodimlar.",
      ru: "Сотрудников во всех подразделениях.",
    },
  },
};

type Props = Readonly<{ locale: Locale }>;

export function HeroSection({ locale }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }

  return (
    <section className="px-10 py-6">
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: 42, height: "calc(100vh - 124px)" }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/logo-light.svg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark base overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        {/* Green gradient left overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, #84CC16 0%, rgba(132,204,22,0.6) 20%, rgba(0,0,0,0) 45%)",
          }}
        />

        {/* Mute / Unmute button */}
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
          {/* Bottom row */}
          <div className="flex items-end justify-between gap-8">
            {/* Left: heading + desc + CTA */}
            <div className="flex max-w-xl flex-col gap-5">
              <h1 className="whitespace-pre-line text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {content.heading[locale]}
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-white/80 md:text-base">
                {content.description[locale]}
              </p>
              <Link
                href={localizeHref(locale, "/contact")}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all hover:bg-gray-100"
              >
                {content.cta[locale]}
              </Link>
            </div>

            {/* Right: stat pill */}
            <div
              className="hidden flex-col gap-1 rounded-2xl bg-white/15 p-5 backdrop-blur-sm md:flex"
              style={{ minWidth: 160 }}
            >
              <p className="text-3xl font-bold text-white">
                {content.stat.value}
              </p>
              <p className="text-xs leading-snug text-white/75">
                {content.stat.label[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
