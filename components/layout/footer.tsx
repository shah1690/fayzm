"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatedLogo } from "@/components/layout/animated-logo";
import { getNavLabels, siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";
import { formatPhone } from "@/shared/lib/format-phone";
import { localizeHref } from "@/shared/lib/localize-href";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
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
      width="16"
      height="16"
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
      width="16"
      height="16"
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

const address = {
  en: "Uzbekistan, Andijan, Khojaobod, Mustahkam 17",
  uz: "O'zbekiston, Andijon, Xo'jaobod, Mustahkam 17",
  ru: "Узбекистан, Андижан, Ходжаабад, Мустаҳкам 17",
  zh: "Uzbekistan, Andijan, Khojaobod, Mustahkam 17",
} as const;

const headingClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-white/65";
const linkClass =
  "text-sm text-white/75 transition-colors duration-200 hover:text-white";
const labelClass = "text-[11px] uppercase tracking-wider text-white/60";

type FooterProps = Readonly<{ locale: Locale }>;

type ContactItemProps = Readonly<{
  label: string;
  value: string;
  href?: string;
}>;

function ContactItem({ label, value, href }: ContactItemProps) {
  return (
    <li className="flex flex-col gap-1">
      <span className={labelClass}>{label}</span>
      {href ? (
        <a href={href} className={linkClass}>
          {value}
        </a>
      ) : (
        <span className="text-sm text-white/70">{value}</span>
      )}
    </li>
  );
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("Footer");
  const labels = getNavLabels(locale);
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const brand = (
    <div className="flex flex-col gap-6">
      <AnimatedLogo
        href={localizeHref(locale, "/")}
        variant="dark"
        size="footer"
        className="w-fit"
      />
      <p className="max-w-sm text-sm leading-relaxed text-white/70">
        {t("tagline")}
      </p>
      <div className="flex items-center gap-4">
        {siteConfig.footer.social.map((item) => {
          const Icon = socialIcons[item.icon as keyof typeof socialIcons];
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors duration-200 hover:text-white"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );

  const quickLinks = (
    <nav aria-label={t("quickLinks")} className="flex flex-col gap-6">
      <h3 className={headingClass}>{t("quickLinks")}</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.quickLinks.map((item) => (
          <li key={item.href}>
            <Link href={localizeHref(locale, item.href)} className={linkClass}>
              {labels[item.key as keyof typeof labels]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const businessesNav = (
    <nav aria-label={t("businesses")} className="flex flex-col gap-6">
      <h3 className={headingClass}>{t("businesses")}</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.businesses.map((item) => (
          <li key={item.href}>
            <Link href={localizeHref(locale, item.href)} className={linkClass}>
              {labels[item.key as keyof typeof labels]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const contact = (
    <div className="flex flex-col gap-6">
      <h3 className={headingClass}>{t("contactUs")}</h3>
      <ul className="flex flex-col gap-4">
        {siteConfig.footer.phones.map((phone) => (
          <ContactItem
            key={phone.href}
            label={t(phone.key as "phoneNumber" | "officeNumber")}
            value={formatPhone(phone.value)}
            href={phone.href}
          />
        ))}
        <ContactItem
          label={t("email")}
          value="fayz-mtex@mail.ru"
          href="mailto:fayz-mtex@mail.ru"
        />
        <ContactItem label={t("address")} value={address[locale]} />
      </ul>
    </div>
  );

  return (
    <div className="bg-white p-3 md:p-5">
      <footer className="rounded-[32px] bg-gray-950 px-6 py-12 text-white md:px-12 md:py-14 lg:px-16">
        {/* Mobile + tablet */}
        <div className="flex flex-col gap-12 lg:hidden">
          {brand}
          <div className="grid grid-cols-2 gap-10 sm:gap-12">
            {quickLinks}
            {businessesNav}
          </div>
          {contact}
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-4">{brand}</div>
          <div className="lg:col-span-2">{quickLinks}</div>
          <div className="lg:col-span-3">{businessesNav}</div>
          <div className="lg:col-span-3">{contact}</div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} {siteConfig.name}. {t("copyright")}.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-colors duration-200 hover:text-white"
          >
            {t("backToTop")} ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
