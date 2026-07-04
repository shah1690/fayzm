"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LocaleFlag } from "@/components/layout/locale-flags";
import type { BusinessData } from "@/content/businesses";
import { Link as LocaleLink } from "@/i18n/navigation";
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
  openMenu: {
    en: "Open menu",
    uz: "Menyuni ochish",
    ru: "Открыть меню",
    zh: "打开菜单",
  },
  closeMenu: {
    en: "Close menu",
    uz: "Menyuni yopish",
    ru: "Закрыть меню",
    zh: "关闭菜单",
  },
  contactUs: {
    en: "Contact Us",
    uz: "Aloqa",
    ru: "Контакты",
    zh: "联系我们",
  },
  women: { en: "Women", uz: "Ayollar", ru: "Женщины", zh: "女装" },
  men: { en: "Men", uz: "Erkaklar", ru: "Мужчины", zh: "男装" },
} as const;

const localeNames: Record<Locale, string> = {
  uz: "O'zbek",
  en: "English",
  ru: "Русский",
  zh: "中文",
};

type MobileMenuProps = Readonly<{ locale: Locale; businesses: BusinessData[] }>;

export function MobileMenu({ locale, businesses }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const collectionsPanelId = useId();
  const businessesPanelId = useId();
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
          <div className="px-5 pb-10 pt-4">
            <ul className="flex flex-col divide-y divide-gray-100">
              {/* Home */}
              <li>
                <Link
                  href={localizeHref(locale, "/")}
                  onClick={close}
                  className="flex min-h-14 items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  <span className="text-[#070A0F]">{labels.home}</span>
                </Link>
              </li>

              {/* Collections accordion */}
              <li>
                <button
                  type="button"
                  aria-expanded={openSection === "collections"}
                  aria-controls={collectionsPanelId}
                  onClick={() => toggleSection("collections")}
                  className="flex min-h-14 w-full items-center justify-between py-4 text-base font-medium text-[#070A0F]"
                >
                  <span className="text-[#070A0F]">{labels.collections}</span>
                  <ChevronDown open={openSection === "collections"} />
                </button>
                {openSection === "collections" && (
                  <div
                    id={collectionsPanelId}
                    className="mb-3 flex flex-col gap-1 pl-3"
                  >
                    {[
                      { label: text.women[locale], href: "/collections/women" },
                      { label: text.men[locale], href: "/collections/men" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={localizeHref(locale, item.href)}
                        onClick={close}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#003566]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#003566]" />
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
                  aria-expanded={openSection === "businesses"}
                  aria-controls={businessesPanelId}
                  onClick={() => toggleSection("businesses")}
                  className="flex min-h-14 w-full items-center justify-between py-4 text-base font-medium text-[#070A0F]"
                >
                  <span className="text-[#070A0F]">{labels.businesses}</span>
                  <ChevronDown open={openSection === "businesses"} />
                </button>
                {openSection === "businesses" && (
                  <div
                    id={businessesPanelId}
                    className="mb-3 grid grid-cols-2 gap-1 pl-3"
                  >
                    {businesses.map((b) => (
                      <Link
                        key={b.slug}
                        href={localizeHref(locale, `/businesses/${b.slug}`)}
                        onClick={close}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#003566]"
                      >
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#003566]" />
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
                  className="flex min-h-14 items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  <span className="text-[#070A0F]">{labels.aboutUs}</span>
                </Link>
              </li>

              {/* FAQ */}
              <li>
                <Link
                  href={localizeHref(locale, "/faq")}
                  onClick={close}
                  className="flex min-h-14 items-center py-4 text-base font-medium text-[#070A0F] transition-opacity hover:opacity-60"
                >
                  <span className="text-[#070A0F]">{labels.faq}</span>
                </Link>
              </li>
            </ul>

            {/* Language switcher */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {(["uz", "en", "ru", "zh"] as Locale[]).map((lang) => (
                <LocaleLink
                  key={lang}
                  href="/"
                  locale={lang}
                  onClick={close}
                  className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200"
                  style={
                    locale === lang
                      ? { background: "#003566", color: "white" }
                      : { background: "#F5F5F5", color: "#6b7280" }
                  }
                >
                  <LocaleFlag locale={lang} />
                  {localeNames[lang]}
                </LocaleLink>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-5">
              <Link
                href={localizeHref(locale, "/contact")}
                onClick={close}
                className="block w-full rounded-full bg-[#070A0F] py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-[#003566]"
              >
                {text.contactUs[locale]}
              </Link>
            </div>

            {/* Phone */}
            {siteConfig.footer.phones[0] && (
              <a
                href={siteConfig.footer.phones[0].href}
                className="mt-3 block text-center text-sm text-gray-400 transition-colors hover:text-[#003566]"
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
