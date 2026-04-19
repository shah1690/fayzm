import GB from "country-flag-icons/react/3x2/GB";
import RU from "country-flag-icons/react/3x2/RU";
import UZ from "country-flag-icons/react/3x2/UZ";
import type { Locale } from "@/shared/i18n/translations";

/**
 * `country-flag-icons` ships its own `FlagComponent` type whose element
 * is declared as `HTMLElement & SVGElement`, which clashes with the
 * standard `SVGProps<SVGSVGElement>`. We only need `className` and
 * `title`, so we type the map loosely as any flag component that
 * accepts those two props.
 */
type LocaleFlagComponent = (props: {
  className?: string;
  title?: string;
}) => React.JSX.Element;

/**
 * Map of app locales → ISO 3166-1 alpha-2 country flags.
 * - `en` → GB (Great Britain) as commonly used for English.
 * - `uz` → UZ (Uzbekistan).
 * - `ru` → RU (Russia).
 * All SVGs come from `country-flag-icons` so they render pixel-identical
 * across every device (no emoji rendering differences).
 */
const flagByLocale: Record<Locale, LocaleFlagComponent> = {
  en: GB as unknown as LocaleFlagComponent,
  uz: UZ as unknown as LocaleFlagComponent,
  ru: RU as unknown as LocaleFlagComponent,
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
