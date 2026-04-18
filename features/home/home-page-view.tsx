import { FaqSection } from "@/features/faq/faq-section";
import type { Locale } from "@/shared/i18n/translations";

type HomePageViewProps = Readonly<{ locale: Locale }>;

export function HomePageView({ locale }: HomePageViewProps) {
  return (
    <main>
      <FaqSection locale={locale} />
    </main>
  );
}
