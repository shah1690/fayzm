"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatedLogo } from "@/components/layout/animated-logo";
import { BusinessesMegaMenu } from "@/components/layout/businesses-mega-menu";
import { CollectionsMegaMenu } from "@/components/layout/collections-mega-menu";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLink } from "@/components/layout/nav-link";
import { getNavLabels, siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { localizeHref } from "@/shared/lib/localize-href";

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.09322 8.78442L6.29358 6.58407C6.74243 6.13522 6.89774 5.47202 6.7162 4.86377C6.57425 4.38814 6.41432 3.81637 6.30801 3.32743C6.20969 2.87522 5.81288 2.5 5.3501 2.5H4.09322C3.16767 2.5 2.40759 3.2532 2.50912 4.17317C3.28091 11.1663 8.83367 16.7191 15.8268 17.4909C16.7468 17.5924 17.5 16.8323 17.5 15.9067V14.6499C17.5 14.1872 17.1233 13.8075 16.6679 13.7247C16.1657 13.6333 15.6343 13.4837 15.1897 13.3419C14.5509 13.1382 13.8409 13.2814 13.3669 13.7554L11.2156 15.9067"
        fill="currentColor"
      />
      <path
        d="M4.09322 8.78442L6.29358 6.58407C6.74243 6.13522 6.89774 5.47202 6.7162 4.86377C6.57425 4.38814 6.41432 3.81637 6.30801 3.32743C6.20969 2.87522 5.81288 2.5 5.3501 2.5H4.09322C3.16767 2.5 2.40759 3.2532 2.50912 4.17317C3.28091 11.1663 8.83367 16.7191 15.8268 17.4909C16.7468 17.5924 17.5 16.8323 17.5 15.9068V14.6499C17.5 14.1872 17.1233 13.8075 16.6679 13.7247C16.1657 13.6333 15.6343 13.4837 15.1897 13.3419C14.5509 13.1382 13.8409 13.2814 13.3669 13.7554L11.2156 15.9068"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NavbarProps = Readonly<{ locale: Locale }>;

const text = {
  callUs: {
    en: "Call us",
    uz: "Qo'ng'iroq qilish",
    ru: "Позвонить нам",
    zh: "致电我们",
  },
} as const;

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("Nav");
  const labels = getNavLabels(locale);
  const pathname = usePathname();
  const homeHref = localizeHref(locale, "/");

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === homeHref) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="flex h-[76px] items-center justify-between px-5 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10">
        {/* Logo */}
        <AnimatedLogo
          href={homeHref}
          onClick={handleLogoClick}
          variant="light"
          size="nav"
          priority
        />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              {"children" in item ? (
                <BusinessesMegaMenu
                  label={labels[item.key as keyof typeof labels]}
                  locale={locale}
                />
              ) : item.href === "/collections" ? (
                <CollectionsMegaMenu
                  label={labels[item.key as keyof typeof labels]}
                  locale={locale}
                />
              ) : (
                <NavLink
                  href={item.href}
                  label={labels[item.key as keyof typeof labels]}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center justify-end gap-3 md:flex">
          <LanguageSwitcher current={locale} />
          <Link
            href={localizeHref(locale, "/contact")}
            className="cursor-pointer rounded-full border border-gray-100 bg-white px-5 py-2 text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
          >
            {t("contactUs")}
          </Link>
          <a
            href={siteConfig.footer.phones[0].href}
            aria-label={text.callUs[locale]}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
          >
            <PhoneIcon />
          </a>
        </div>

        {/* Mobile: burger right. Desktop: hidden */}
        <div className="md:hidden">
          <MobileMenu locale={locale} />
        </div>
      </nav>
    </header>
  );
}
