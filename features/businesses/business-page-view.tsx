import { PageShell } from "@/components/layout/page-shell";

type BusinessPageViewProps = Readonly<{ slug: string }>;

const businessLabels: Record<string, string> = {
  knitting: "Knitting",
  "yarn-production": "Yarn Production",
  "garment-production": "Garment Production",
  petrol: "Petrol",
  flour: "Flour",
  farm: "Farm",
  "cottonseed-oil": "Cottonseed Oil Production",
};

export function BusinessPageView({ slug }: BusinessPageViewProps) {
  const title = businessLabels[slug] ?? slug;
  return <PageShell title={title} />;
}
