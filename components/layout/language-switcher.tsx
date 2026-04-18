"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

type LanguageSwitcherProps = Readonly<{ current: Locale }>;

export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(locale: Locale) {
    setOpen(false);
    if (locale === current) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={isPending}
        className="flex h-10 min-w-[52px] items-center justify-center gap-1 rounded-full border border-gray-100 bg-white px-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white disabled:opacity-50"
      >
        {localeLabels[current]}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[80px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {(Object.keys(localeLabels) as Locale[]).map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleSelect(locale)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                locale === current
                  ? "font-medium text-[#070A0F]"
                  : "text-gray-500"
              }`}
            >
              {localeLabels[locale]}
              {locale === current && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#070A0F]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
