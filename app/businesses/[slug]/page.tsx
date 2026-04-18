import { BusinessPageView } from "@/features/businesses/business-page-view";

type Props = Readonly<{ params: Promise<{ slug: string }> }>;

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  return <BusinessPageView slug={slug} />;
}
