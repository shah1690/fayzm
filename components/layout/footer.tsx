"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getNavLabels, siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { translations } from "@/shared/i18n/translations";
import { formatPhone } from "@/shared/lib/format-phone";
import { localizeHref } from "@/shared/lib/localize-href";

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988787 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8573 8.1787 22.54 6.42Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

type FooterColumnProps = Readonly<{ locale: Locale }>;

function QuickLinksCol({ locale }: FooterColumnProps) {
  const t = useTranslations("Footer");
  const labels = getNavLabels(locale);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">{t("quickLinks")}</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.quickLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={localizeHref(locale, item.href)}
              className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {labels[item.key as keyof typeof labels]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BusinessesCol({ locale }: FooterColumnProps) {
  const t = useTranslations("Footer");
  const labels = getNavLabels(locale);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">{t("businesses")}</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.businesses.map((item) => (
          <li key={item.href}>
            <Link
              href={localizeHref(locale, item.href)}
              className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {labels[item.key as keyof typeof labels]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactCol() {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">{t("contactUs")}</h3>
      <div className="flex flex-col gap-3">
        {siteConfig.footer.phones.map((phone) => (
          <div key={phone.href} className="flex flex-col gap-0.5">
            <span className="text-xs text-white/40">
              {t(phone.key as "phoneNumber" | "officeNumber")}
            </span>
            <a
              href={phone.href}
              className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {formatPhone(phone.value)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

type FooterProps = Readonly<{ locale: Locale }>;

const text = {
  address: {
    en: "Uzbekistan, Andijan, Khojaobod, Mustahkam 17",
    uz: "O'zbekiston, Andijon, Xo'jaobod, Mustahkam 17",
    ru: "Узбекистан, Андижан, Ходжаабад, Мустаҳкам 17",
  },
} as const;

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const logoSection = (
    <div className="flex flex-col gap-6">
      <Link href={localizeHref(locale, "/")}>
        <Image
          src={siteConfig.logo.dark}
          alt={siteConfig.name}
          width={100}
          height={32}
          className="h-8 w-auto"
        />
      </Link>
      <p className="max-w-xs text-sm leading-relaxed text-white/50">
        {translations.footer.tagline[locale]}
      </p>
      <div className="flex items-center gap-3">
        {siteConfig.footer.social.map((item) => {
          const Icon = socialIcons[item.icon as keyof typeof socialIcons];
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-white hover:text-white"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-3 md:p-5">
      <footer
        className="bg-gray-950 px-5 py-10 text-white md:px-10 md:py-12"
        style={{ borderRadius: "40px" }}
      >
        {/* Mobile layout */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="grid grid-cols-2 gap-6">
            <QuickLinksCol locale={locale} />
            <BusinessesCol locale={locale} />
          </div>
          <ContactCol />
          {logoSection}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          {logoSection}
          <div className="grid grid-cols-3 gap-16">
            <QuickLinksCol locale={locale} />
            <BusinessesCol locale={locale} />
            <ContactCol />
          </div>
        </div>

        {/* Address + Email bar */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                    fill="#84CC16"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  {t("address")}
                </p>
                <p className="mt-0.5 text-sm text-white/60">
                  {text.address[locale]}
                </p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    fill="#84CC16"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  {t("email")}
                </p>
                <a
                  href="mailto:fayz-mtex@mail.ru"
                  className="mt-0.5 block text-sm text-white/60 transition-colors hover:text-white"
                >
                  fayz-mtex@mail.ru
                </a>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/40">
            Copyright &copy; {year} {siteConfig.name}. {t("copyright")}.
          </p>
        </div>
      </footer>
    </div>
  );
}
