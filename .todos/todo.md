# 📋 TODO

- [ ] 🔴 🔨 CMS backend: Django `cms` app — models for all 8 content types (businesses, products, documents, partners, faq, stats, about, page-metadata), localized JSON fields, migrations
- [ ] 🔴 🔨 CMS admin: Unfold admin registration for all cms models (list/search/inline)
- [ ] 🟠 🔨 CMS API: DRF read-only endpoints under /api/v1/cms/* for every content type, shaped to match frontend TS types
- [ ] 🟡 🔨 Seed: management command importing current static content/*.ts data into DB
- [ ] 🔴 🔨 Frontend: API data layer + wire each section (businesses, products, faq, stats, about, partners, documents, page-metadata) to fetch from backend with static fallback
