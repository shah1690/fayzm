import type { SVGProps } from "react";
import type { Locale } from "@/shared/i18n/translations";

type FlagSvgProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

type LocaleFlagComponent = (props: FlagSvgProps) => React.JSX.Element;

function GBFlag({ title, ...props }: FlagSvgProps) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
      {title ? <title>{title}</title> : null}
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

function UZFlag({ title, ...props }: FlagSvgProps) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
      {title ? <title>{title}</title> : null}
      <rect width="60" height="40" fill="#1EB53A" />
      <rect width="60" height="26.66" fill="#fff" />
      <rect width="60" height="13.33" fill="#0099E5" />
      <rect y="13" width="60" height="1.7" fill="#CE1126" />
      <rect y="25.3" width="60" height="1.7" fill="#CE1126" />
      <circle cx="10" cy="7" r="4" fill="#fff" />
      <circle cx="11.3" cy="7" r="3.2" fill="#0099E5" />
      <g fill="#fff">
        <circle cx="17" cy="4.5" r="1" />
        <circle cx="20" cy="4.5" r="1" />
        <circle cx="23" cy="4.5" r="1" />
        <circle cx="26" cy="4.5" r="1" />
        <circle cx="18.5" cy="7.5" r="1" />
        <circle cx="21.5" cy="7.5" r="1" />
        <circle cx="24.5" cy="7.5" r="1" />
        <circle cx="17" cy="10.5" r="1" />
        <circle cx="20" cy="10.5" r="1" />
        <circle cx="23" cy="10.5" r="1" />
        <circle cx="26" cy="10.5" r="1" />
      </g>
    </svg>
  );
}

function RUFlag({ title, ...props }: FlagSvgProps) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
      {title ? <title>{title}</title> : null}
      <rect width="60" height="40" fill="#D52B1E" />
      <rect width="60" height="26.66" y="0" fill="#fff" />
      <rect width="60" height="13.33" y="13.33" fill="#0039A6" />
    </svg>
  );
}

const flagByLocale: Record<Locale, LocaleFlagComponent> = {
  en: GBFlag,
  uz: UZFlag,
  ru: RUFlag,
};

const titleByLocale: Record<Locale, string> = {
  en: "Great Britain flag",
  uz: "Uzbekistan flag",
  ru: "Russia flag",
};

type LocaleFlagProps = Readonly<{
  locale: Locale;
  className?: string;
}>;

/**
 * Wraps the SVG flag in a rounded container with a subtle border so it
 * sits cleanly on both light and dark surfaces (pill hover state etc.).
 * Default size renders at roughly 18×12px to match small UI chrome.
 */
export function LocaleFlag({ locale, className }: LocaleFlagProps) {
  const Flag = flagByLocale[locale];
  return (
    <span
      className={`inline-flex h-3 w-[1.125rem] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-inset ring-black/10 ${
        className ?? ""
      }`}
    >
      <Flag title={titleByLocale[locale]} className="block h-full w-full" />
    </span>
  );
}
