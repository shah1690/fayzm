# Fayzm

`fayzm` is being rebuilt as the new corporate and catalog-style website for `FAYZ-M`.

The current public website shows that the project needs to support:
- multiple landing and marketing sections
- a `collections` area
- a `businesses` area with several sub-domains
- content-heavy pages such as `about`, `contact`, and `faq`
- repeated footer, CTA, and contact blocks
- multilingual support in English (`en`), Uzbek (`uz`), and Russian (`ru`)

English is the default locale for the project.

## PDF Endpoint

PDF files are served from the direct route `/documents/<slug>.pdf`.

The route proxies PDF objects from MinIO with range support intact. In Docker,
MinIO is available internally at `http://minio:9000`, while public media links
are served through `https://media.fayzm.uz`.

Configure MinIO:

```bash
MINIO_INTERNAL_ENDPOINT=http://minio:9000
MINIO_PUBLIC_URL=https://media.fayzm.uz
MINIO_BUCKET=fayzm-media
MINIO_ROOT_USER=fayzm_minio
MINIO_ROOT_PASSWORD=change-this-minio-password
```

## Telegram Contact Form

Contact form submissions are sent server-side to Telegram Bot API.

Configure required server-only environment variables:

```bash
TELEGRAM_BOT_TOKEN=your-server-side-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

Notes:
- never expose bot token in client code
- use a dedicated bot for production leads
- keep `TELEGRAM_CHAT_ID` as a private target chat, group, or channel
- the API route sends only core lead fields: full name, email, phone, service, product, and message
- form includes a honeypot field and minimum fill-time guard to reduce spam

Then upload PDFs to MinIO bucket `fayzm-media` and register each object in [content/documents.ts](/Users/kamafozilov/Projects/fayzm/content/documents.ts):

```ts
{
  slug: "catalog.pdf",
  objectName: "documents/catalog.pdf",
  downloadFileName: "catalog.pdf",
}
```

Example site URLs:
- `/documents/catalog.pdf`
- `/documents/men-collection.pdf`
- `/documents/company-profile.pdf`

Example public media URLs:
- `https://media.fayzm.uz/documents/catalog.pdf`
- `https://media.fayzm.uz/documents/men-collection.pdf`
- `https://media.fayzm.uz/documents/company-profile.pdf`

Notes:
- upload real PDF blobs into MinIO, not exported Google Docs files
- keep object names aligned with `content/documents.ts`
- `docker-compose.yaml` creates the bucket and enables anonymous download access

Because of that, the most suitable approach for this project is a `route-first + feature-first + shared UI` architecture.

## Why This Structure

This is not a simple blog and it is not only a single landing page either. It combines three different content types:
- marketing pages
- catalog and collection pages
- corporate content about the company and its business directions

Because of that, putting every component into a single `components/` folder would quickly become messy. We should separate components by reuse level and domain responsibility.

## Recommended Structure

The project now uses locale-based routing with an unprefixed default locale. Internally, all routes live under `app/[locale]`, while the public URLs behave like this:
- `/` -> English
- `/uz` -> Uzbek
- `/ru` -> Russian

```text
.
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── collections/
│       ├── businesses/
│       ├── about/
│       ├── contact/
│       └── faq/
├── components/
│   ├── ui/
│   ├── layout/
│   └── sections/
├── features/
│   ├── home/
│   ├── collections/
│   ├── businesses/
│   ├── about/
│   ├── contact/
│   └── faq/
├── content/
│   ├── navigation/
│   ├── collections/
│   ├── businesses/
│   ├── faq/
│   └── company/
├── i18n/
│   ├── messages.ts
│   ├── request.ts
│   └── routing.ts
├── proxy.ts
├── next.config.ts
├── shared/
│   ├── constants/
│   ├── lib/
│   ├── hooks/
│   └── types/
└── public/
    ├── images/
    ├── icons/
    └── videos/
```

## Folder Responsibilities

### `app/`

This layer should contain only route entry files, metadata, layouts, and other Next.js-specific files.

Rules:
- do not place large section markup here
- route files should compose blocks from `features/`
- route-level logic is allowed, but business UI should not live here
- locale validation, metadata, and locale-scoped providers belong in `app/[locale]/layout.tsx`

Example:

```tsx
import { getTranslations } from "next-intl/server";
import { HomePageView } from "@/features/home/home-page-view";

export default async function Page() {
  const t = await getTranslations("HomePage");

  return <HomePageView title={t("title")} />;
}
```

### `features/`

This should be the heart of the project. Every major page or domain area gets its own feature.

Examples:
- `features/home`
- `features/collections`
- `features/businesses`
- `features/about`
- `features/contact`
- `features/faq`

A typical feature can look like this:

```text
features/home/
├── components/
├── sections/
├── data/
├── types.ts
└── home-page-view.tsx
```

Rules:
- page-specific sections and cards stay here
- if something is not reused elsewhere, do not move it into `components/`
- copy and static mappings can start inside the feature, then move to `content/` if they become shared

### `components/`

This folder is only for reusable UI.

Recommended internal split:
- `components/ui` - button, badge, input, modal, accordion
- `components/layout` - header, footer, mobile menu, locale switcher
- `components/sections` - reusable CTA, stats, partner strip, breadcrumbs

Rules:
- do not name items here after pages
- do not move page-specific components here too early
- this layer exists to support `features/`

### `content/`

Until a CMS exists, all structured content that is not part of the locale dictionaries should live here.

This is especially important for this project because a large portion of the website is made of text, FAQ items, catalog entries, and business-direction content.

Examples:
- navigation links
- collection lists
- business-direction lists
- FAQ items
- company stats and timeline

Benefits:
- developer and copy work stay separated
- moving to a CMS later becomes easier
- feature components depend on data shape, not on hardcoded copy

### `i18n/`

This folder owns locale routing and translations.

Responsibilities:
- `i18n/routing.ts` defines supported locales and routing behavior
- `i18n/request.ts` resolves the active locale and loads locale messages
- `i18n/messages.ts` stores the current translation catalogs until a dedicated messages directory or CMS is introduced

Rules:
- locale-specific UI text should not be hardcoded in pages or features
- if text is translated, it should come from the i18n layer
- keep the public locale contract stable: English without a prefix, Uzbek and Russian with prefixes

### `shared/`

This is the framework-independent technical layer.

Examples:
- `shared/lib` - utility functions
- `shared/types` - shared types
- `shared/constants` - constant values
- `shared/hooks` - common custom hooks

Rules:
- `shared/` should not depend on page content
- this layer is infrastructure, not a feature area

## How We Split Components

The decision rule should stay simple:

1. Is it needed only for one page?
   - keep it inside `features/<page>`
2. Is it reused across multiple pages in the same form?
   - move it to `components/sections` or `components/layout`
3. Is it a small primitive UI element?
   - move it to `components/ui`
4. Is it text or structured content?
   - move it to `content/`
5. Is it translated UI copy or locale routing config?
   - move it to `i18n/`
6. Is it a utility, type, config, or helper?
   - move it to `shared/`

We should not turn `components/` into a dumping ground.

## Suggested Work Split For 2 Developers

### Developer A

Responsibilities:
- `app/` route skeleton
- `components/ui`
- `components/layout`
- `i18n/`
- `shared/`
- global navigation, footer, and common form primitives

### Developer B

Responsibilities:
- `features/home`
- `features/collections`
- `features/businesses`
- `features/about`
- `features/contact`
- `features/faq`
- page data inside `content/`

### Rules To Reduce Conflicts

- keep `app/` files thin
- each developer should work mostly inside their own feature folder
- shared UI should move into `components/` only after agreement
- keep cross-feature imports to a minimum
- do not import directly from `features/home` into `features/about`

## Recommended Route Map

Based on the current site, these are the first routes we should expect:
- `/`
- `/uz`
- `/ru`
- `/collections`
- `/collections/women`
- `/collections/men`
- `/businesses`
- `/businesses/[slug]`
- `/about`
- `/contact`
- `/faq`

Because the project supports three locales, the internal route structure should look like this:

```text
app/
└── [locale]/
    ├── page.tsx
    ├── collections/
    ├── businesses/
    ├── about/
    ├── contact/
    └── faq/
```

Supporting files:

```text
i18n/
├── messages.ts
├── request.ts
└── routing.ts

proxy.ts
next.config.ts
```

Public URL behavior must stay aligned with the current site:
- `/` serves English
- `/uz` serves Uzbek
- `/ru` serves Russian

## Practical Rule

If it is not clear where a new file belongs, ask this question:

`Is this page-specific, reusable UI, structured content, i18n logic, or shared technical infrastructure?`

Then place it accordingly:
- page-specific -> `features/`
- reusable UI -> `components/`
- structured content -> `content/`
- translated copy or locale routing -> `i18n/`
- shared technical helper -> `shared/`
