import { FaqPageView } from "@/features/faq/faq-page-view";
import { getLocale } from "@/shared/lib/get-locale";

export default async function FaqPage() {
  const locale = await getLocale();
  return <FaqPageView locale={locale} />;
}
