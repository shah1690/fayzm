import { PageTransition } from "@/components/layout/page-transition";

type LocaleTemplateProps = Readonly<{ children: React.ReactNode }>;

export default function LocaleTemplate({ children }: LocaleTemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
