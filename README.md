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

Because of that, the most suitable approach for this project is a `route-first + feature-first + shared UI` architecture.

## Why This Structure

This is not a simple blog and it is not only a single landing page either. It combines three different content types:
- marketing pages
- catalog and collection pages
- corporate content about the company and its business directions

Because of that, putting every component into a single `components/` folder would quickly become messy. We should separate components by reuse level and domain responsibility.

## Recommended Structure

For now, we keep the `app/` directory at the root. This gives us a clean starting point without unnecessary restructuring too early.

```text
.
├── app/
│   ├── page.tsx
│   ├── collections/
│   ├── businesses/
│   ├── about/
│   ├── contact/
│   ├── faq/
│   └── api/
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
├── shared/
│   ├── config/
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

Example:

```tsx
import { HomePageView } from "@/features/home/home-page-view";

export default function Page() {
  return <HomePageView />;
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

Until a CMS exists, all structured content should live here.

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

### `shared/`

This is the framework-independent technical layer.

Examples:
- `shared/lib` - utility functions
- `shared/types` - shared types
- `shared/constants` - constant values
- `shared/config` - site config and metadata defaults
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
5. Is it a utility, type, config, or helper?
   - move it to `shared/`

We should not turn `components/` into a dumping ground.

## Suggested Work Split For 2 Developers

### Developer A

Responsibilities:
- `app/` route skeleton
- `components/ui`
- `components/layout`
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
- `/collections`
- `/collections/women`
- `/collections/men`
- `/businesses`
- `/businesses/[slug]`
- `/about`
- `/contact`
- `/faq`

Because the project will support three locales, we can move to this structure when locale routing is introduced:

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

We should not force that in the very first stage. The better choice for now is to keep the structure simple and stable while preparing the codebase for `en`, `uz`, and `ru`.

## Practical Rule

If it is not clear where a new file belongs, ask this question:

`Is this page-specific, reusable UI, structured content, or shared technical infrastructure?`

Then place it accordingly:
- page-specific -> `features/`
- reusable UI -> `components/`
- structured content -> `content/`
- shared technical helper -> `shared/`
