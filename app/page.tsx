import { HomePageView } from "@/features/home/home-page-view";
import { getLocale } from "@/shared/lib/get-locale";

export default async function HomePage() {
  const locale = await getLocale();
  return <HomePageView locale={locale} />;
}
