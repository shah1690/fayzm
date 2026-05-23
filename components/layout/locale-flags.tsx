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

function CNFlag({ title, ...props }: FlagSvgProps) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
      {title ? <title>{title}</title> : null}
      <rect width="60" height="40" fill="#EE1C25" />
      <g fill="#FFFF00">
        <polygon points="10,5 11.18,8.64 15,8.64 11.91,10.88 13.09,14.51 10,12.27 6.91,14.51 8.09,10.88 5,8.64 8.82,8.64" />
        <polygon points="20,3 20.5,4.31 21.9,4.36 20.8,5.24 21.18,6.59 20,5.8 18.82,6.59 19.2,5.24 18.1,4.36 19.5,4.31" />
        <polygon points="24,7 24.4,8.13 25.6,8.18 24.65,8.94 24.97,10.11 24,9.42 23.03,10.11 23.35,8.94 22.4,8.18 23.6,8.13" />
        <polygon points="24,12 24.4,13.13 25.6,13.18 24.65,13.94 24.97,15.11 24,14.42 23.03,15.11 23.35,13.94 22.4,13.18 23.6,13.13" />
        <polygon points="20,16 20.5,17.31 21.9,17.36 20.8,18.24 21.18,19.59 20,18.8 18.82,19.59 19.2,18.24 18.1,17.36 19.5,17.31" />
      </g>
    </svg>
  );
}

const flagByLocale: Record<Locale, LocaleFlagComponent> = {
  en: GBFlag,
  uz: UZFlag,
  ru: RUFlag,
  zh: CNFlag,
};

const titleByLocale: Record<Locale, string> = {
  en: "Great Britain flag",
  uz: "Uzbekistan flag",
  ru: "Russia flag",
  zh: "China flag",
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
