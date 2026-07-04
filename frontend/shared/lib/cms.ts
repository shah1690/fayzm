// Server-only data layer for CMS content.
//
// Every getter fetches from the Django CMS API with ISR (revalidate) and falls
// back to the bundled static content if the API is unreachable or returns an
// error. Shapes are identical to the static content/* modules, so consumers
// only need to `await` the getter instead of importing the static value.

import "server-only";

import { aboutContent as staticAbout } from "@/content/about";
import {
  type BusinessData,
  businesses as staticBusinesses,
} from "@/content/businesses";
import {
  type DocumentDefinition,
  documents as staticDocuments,
} from "@/content/documents";
import { faqContent as staticFaq } from "@/content/faq";
import { pageMetadata as staticPageMetadata } from "@/content/page-metadata";
import { type Partner, partners as staticPartners } from "@/content/partners";
import {
  type ProductData,
  products as staticProducts,
} from "@/content/products";
import { type Stat, stats as staticStats } from "@/content/stats";
import type { Locale } from "@/shared/i18n/translations";
import { pickBusinessForLocale } from "@/shared/lib/business-pick";
import {
  EMPTY_HOME_CONTENT,
  type HomeContent,
} from "@/shared/lib/home-content";

const LOCALES: Locale[] = ["en", "uz", "ru", "zh"];
const REVALIDATE_SECONDS = 60;

function apiBase(): string {
  return (
    process.env.CMS_API_URL ??
    process.env.BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000"
  ).replace(/\/$/, "");
}

/** Fetch JSON from the CMS API; return `fallback` on any failure. */
async function cmsFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${apiBase()}/api/v1/cms/${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

// ─── Businesses ──────────────────────────────────────────────────────────
export async function getBusinesses(): Promise<BusinessData[]> {
  const data = await cmsFetch<BusinessData[]>("businesses/", staticBusinesses);
  return data.length ? data : staticBusinesses;
}

export async function getBusinessBySlug(
  slug: string,
): Promise<BusinessData | undefined> {
  const all = await getBusinesses();
  return all.find((b) => b.slug === slug);
}

export async function getHomeCtaBusiness(
  locale: Locale,
): Promise<BusinessData> {
  return pickBusinessForLocale(await getBusinesses(), locale, 0);
}

// ─── Products ────────────────────────────────────────────────────────────
export async function getProducts(): Promise<ProductData[]> {
  const data = await cmsFetch<ProductData[]>("products/", staticProducts);
  return data.length ? data : staticProducts;
}

export async function getProductsByGender(
  gender: "women" | "men",
): Promise<ProductData[]> {
  const all = await getProducts();
  return all.filter((p) => p.gender === gender);
}

export async function getProduct(
  gender: "women" | "men",
  slug: string,
): Promise<ProductData | undefined> {
  const all = await getProducts();
  return all.find((p) => p.gender === gender && p.slug === slug);
}

// ─── Partners ────────────────────────────────────────────────────────────
export async function getPartners(): Promise<Partner[]> {
  const data = await cmsFetch<Partner[]>("partners/", staticPartners);
  return data.length ? data : staticPartners;
}

// ─── Stats ───────────────────────────────────────────────────────────────
export async function getStats(): Promise<Stat[]> {
  const data = await cmsFetch<Stat[]>("stats/", staticStats);
  return data.length ? data : staticStats;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────
type ApiLocalized = Record<Locale, string>;
type ApiFaq = {
  settings: {
    title: ApiLocalized;
    subtitle: ApiLocalized;
    stillHaveQuestions: ApiLocalized;
    stillHaveDesc: ApiLocalized;
    scheduleCall: ApiLocalized;
  };
  items: { question: ApiLocalized; answer: ApiLocalized }[];
};

type FaqLocaleContent = {
  title: string;
  subtitle: string;
  stillHaveQuestions: string;
  stillHaveDesc: string;
  scheduleCall: string;
  items: { question: string; answer: string }[];
};
export type FaqContent = Record<Locale, FaqLocaleContent>;

export async function getFaqContent(): Promise<FaqContent> {
  const data = await cmsFetch<ApiFaq | null>("faq/", null);
  if (!data?.items?.length) return staticFaq;

  const { settings, items } = data;
  const result = {} as FaqContent;
  for (const locale of LOCALES) {
    result[locale] = {
      title: settings.title[locale],
      subtitle: settings.subtitle[locale],
      stillHaveQuestions: settings.stillHaveQuestions[locale],
      stillHaveDesc: settings.stillHaveDesc[locale],
      scheduleCall: settings.scheduleCall[locale],
      items: items.map((it) => ({
        question: it.question[locale],
        answer: it.answer[locale],
      })),
    };
  }
  return result;
}

// ─── About ───────────────────────────────────────────────────────────────
export async function getAboutContent(): Promise<typeof staticAbout> {
  const data = await cmsFetch<{ content: typeof staticAbout } | null>(
    "about/",
    null,
  );
  return data?.content ?? staticAbout;
}

// ─── Page metadata ───────────────────────────────────────────────────────
type ApiPageMeta = {
  page: string;
  heading: ApiLocalized;
  title: ApiLocalized;
  description: ApiLocalized;
};

export async function getPageMetadata(): Promise<typeof staticPageMetadata> {
  const rows = await cmsFetch<ApiPageMeta[]>("page-metadata/", []);
  if (!rows.length) return staticPageMetadata;
  const result = { ...staticPageMetadata } as Record<string, unknown>;
  for (const row of rows) {
    result[row.page] = {
      heading: row.heading,
      title: row.title,
      description: row.description,
    };
  }
  return result as typeof staticPageMetadata;
}

// ─── Home page sections ──────────────────────────────────────────────────
export async function getHomeContent(): Promise<HomeContent> {
  const data = await cmsFetch<Partial<HomeContent>>("home/", {});
  return { ...EMPTY_HOME_CONTENT, ...data };
}

// ─── Documents ───────────────────────────────────────────────────────────
export async function getDocuments(): Promise<DocumentDefinition[]> {
  const data = await cmsFetch<DocumentDefinition[]>(
    "documents/",
    staticDocuments,
  );
  return data.length ? data : staticDocuments;
}

export async function resolveDocumentBySlug(
  slug: string,
): Promise<DocumentDefinition | undefined> {
  const all = await getDocuments();
  return all.find((doc) => doc.slug === slug || doc.downloadFileName === slug);
}
