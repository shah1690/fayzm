import { PageShell } from "@/components/layout/page-shell";

type HomePageViewProps = Readonly<{
  title: string;
}>;

export function HomePageView({ title }: HomePageViewProps) {
  return <PageShell title={title} />;
}
