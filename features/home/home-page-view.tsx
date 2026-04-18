import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/shared/config/site-config";

export function HomePageView() {
  return <PageShell title={siteConfig.pages.home.title} />;
}
