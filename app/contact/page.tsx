import { ContactPageView } from "@/features/contact/contact-page-view";
import { getLocale } from "@/shared/lib/get-locale";

export default async function ContactPage() {
  const locale = await getLocale();
  return <ContactPageView locale={locale} />;
}
