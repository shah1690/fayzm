"use client";

import { useEffect, useRef, useState } from "react";
import { businesses } from "@/content/businesses";
import { Link } from "@/i18n/navigation";
import { getNavLabels, siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

function BurgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8.33325 4.16669H16.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 10H16.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 15.8333H11.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const text = {
  openMenu: { en: "Open menu", uz: "Menyuni ochish", ru: "Открыть меню" },
  closeMenu: { en: "Close menu", uz: "Menyuni yopish", ru: "Закрыть меню" },
  contactUs: { en: "Contact Us", uz: "Aloqa", ru: "Контакты" },
  women: { en: "Women", uz: "Ayollar", ru: "Женщины" },
  men: { en: "Men", uz: "Erkaklar", ru: "Мужчины" },
} as const;

type MobileMenuProps = Readonly<{ locale: Locale }>;

export function MobileMenu({ locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const labels = getNavLabels(locale);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setOpenSection(null);
  };
  const toggleSection = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? text.closeMenu[locale] : text.openMenu[locale]}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white transition-all duration-200 hover:border-gray-200 hover:bg-gray-50"
      >
        {isOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="animate-dropdown fixed inset-0 top-[76px] z-50 overflow-y-auto bg-white"
        >
          {/* Pattern bg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pattern.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0)", opacity: 0.05 }}
          />

          <div
            className="relative z-10 px-5 pb-10 pt-4"
            style={{ color: "#070A0F" }}
          >
            <ul className="flex flex-col divide-y divide-gray-100">
              {/* Home */}
              <li>
                <Link
                  href={localizeHref(locale, "/")}
                  onClick={close}
                  className="flex items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  {labels.home}
                </Link>
              </li>

              {/* Collections accordion */}
              <li>
                <button
                  type="button"
                  onClick={() => toggleSection("collections")}
                  className="flex w-full items-center justify-between py-4 text-base font-medium text-[#070A0F]"
                >
                  {labels.collections}
                  <ChevronDown open={openSection === "collections"} />
                </button>
                {openSection === "collections" && (
                  <div className="mb-3 flex flex-col gap-1 pl-3">
                    {[
                      { label: text.women[locale], href: "/collections/women" },
                      { label: text.men[locale], href: "/collections/men" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={localizeHref(locale, item.href)}
                        onClick={close}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#84CC16]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#84CC16]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Businesses accordion */}
              <li>
                <button
                  type="button"
                  onClick={() => toggleSection("businesses")}
                  className="flex w-full items-center justify-between py-4 text-base font-medium text-[#070A0F]"
                >
                  {labels.businesses}
                  <ChevronDown open={openSection === "businesses"} />
                </button>
                {openSection === "businesses" && (
                  <div className="mb-3 grid grid-cols-2 gap-1 pl-3">
                    {businesses.map((b) => (
                      <Link
                        key={b.slug}
                        href={localizeHref(locale, `/businesses/${b.slug}`)}
                        onClick={close}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#84CC16]"
                      >
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#84CC16]" />
                        {b.label[locale]}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* About */}
              <li>
                <Link
                  href={localizeHref(locale, "/about")}
                  onClick={close}
                  className="flex items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  {labels.aboutUs}
                </Link>
              </li>

              {/* FAQ */}
              <li>
                <Link
                  href={localizeHref(locale, "/faq")}
                  onClick={close}
                  className="flex items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  {labels.faq}
                </Link>
              </li>
            </ul>

            {/* Language switcher */}
            <div className="mt-5 flex items-center gap-2">
              {(["uz", "en", "ru"] as Locale[]).map((lang) => (
                <Link
                  key={lang}
                  href="/"
                  locale={lang}
                  onClick={close}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200"
                  style={
                    locale === lang
                      ? { background: "#84CC16", color: "#070A0F" }
                      : { background: "#F5F5F5", color: "#6b7280" }
                  }
                >
                  {lang}
                </Link>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-5">
              <Link
                href={localizeHref(locale, "/contact")}
                onClick={close}
                className="block w-full rounded-full bg-[#070A0F] py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-[#84CC16] hover:text-[#070A0F]"
              >
                {text.contactUs[locale]}
              </Link>
            </div>

            {/* Phone */}
            {siteConfig.footer.phones[0] && (
              <a
                href={siteConfig.footer.phones[0].href}
                className="mt-3 block text-center text-sm text-gray-400 transition-colors hover:text-[#84CC16]"
              >
                {siteConfig.footer.phones[0].value}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
