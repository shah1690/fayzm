"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/translations";

const scrollLabel = {
  en: "Scroll",
  uz: "Pastga",
  ru: "Листайте",
} as const;

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
    <section className="px-5 py-6 md:px-10">
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: 42, height: "calc(100vh - 124px)" }}
      >
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

        {/* Subtle edge vignette so corner controls stay readable */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,10,15,0.25) 0%, transparent 25%, transparent 75%, rgba(7,10,15,0.35) 100%)",
          }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/25"
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

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            {scrollLabel[locale]}
          </span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
            <span className="block h-1.5 w-1 animate-scroll-dot rounded-full bg-white" />
          </span>
        </div>
      </div>
    </section>
  );
}
