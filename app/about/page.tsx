import { AboutPageView } from "@/features/about/about-page-view";
import { getLocale } from "@/shared/lib/get-locale";

export default async function AboutPage() {
  const locale = await getLocale();
  return <AboutPageView locale={locale} />;
}
