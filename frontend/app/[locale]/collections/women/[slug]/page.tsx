import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/features/collections/product-page-view";
import type { Locale } from "@/shared/i18n/translations";
import { getProduct, getProductsByGender } from "@/shared/lib/cms";
import { buildPageMetadata } from "@/shared/lib/seo";

type Props = Readonly<{ params: Promise<{ locale: string; slug: string }> }>;

export default async function WomenProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = await getProduct("women", slug);

  if (!product) notFound();

  return <ProductPageView product={product} locale={locale as Locale} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct("women", slug);

  if (!product) return { title: "FAYZ-M" };

  return buildPageMetadata({
    locale: locale as Locale,
    path: `/collections/women/${slug}`,
    title: `${product.name} | FAYZ-M`,
    description: product.description[locale as Locale],
    image: product.image,
  });
}

export async function generateStaticParams() {
  return (await getProductsByGender("women")).map((p) => ({ slug: p.slug }));
}
