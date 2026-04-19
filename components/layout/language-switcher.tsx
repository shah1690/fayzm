"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { LocaleFlag } from "@/components/layout/locale-flags";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/shared/i18n/translations";

/** Endonym: each language label in its own language (no emoji flags). */
const localeLabels: Record<Locale, string> = {
  en: "English",
  uz: "O'zbek",
  ru: "Русский",
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
        aria-expanded={open}
        aria-haspopup="listbox"
        className="group flex h-10 min-w-0 cursor-pointer items-center gap-2 rounded-full border border-gray-100 bg-white py-2 pl-2.5 pr-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LocaleFlag locale={current} />
        <span className="max-w-[9.5rem] truncate sm:max-w-none">
          {localeLabels[current]}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[calc(100%+3rem)] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg sm:min-w-[220px]"
          role="listbox"
          aria-label="Language"
        >
          {(Object.keys(localeLabels) as Locale[]).map((locale) => (
            <button
              key={locale}
              type="button"
              role="option"
              aria-selected={locale === current}
              onClick={() => handleSelect(locale)}
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                locale === current
                  ? "font-medium text-[#070A0F]"
                  : "text-gray-500"
              }`}
            >
              <LocaleFlag locale={locale} />
              <span className="min-w-0 flex-1">{localeLabels[locale]}</span>
              {locale === current && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#070A0F]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
