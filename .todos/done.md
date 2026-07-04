# ✅ DONE

- [x] 🟠 🚀 Convert repo to nextjs+django monorepo: frontend/ + backend/, unified docker-compose (minio media), merged .env.example, root .gitignore/README, CI split, husky moved. Verified: compose config OK, frontend install + type-check pass.
- [x] 🟡 🚀 Remove .github + .husky (not needed): deleted both dirs, stripped husky prepare-script + devDep from frontend/package.json, dropped README .github ref.
- [x] 🟠 🚀 Infra: docker-compose db+minio only; root package.json + scripts (kill-ports/setup/dev-backend); `pnpm dev` runs both apps on host (:8000/:3000), infra in Docker; env-driven host ports. Verified: infra healthy, migrate OK, health 200. Committed c075f3e.
- [x] 🔴 🚀 CMS backend+admin+API+seed: Django `cms` app, 9 models (localized JSON), Unfold admin, DRF /api/v1/cms/* matching frontend types, export-content.mjs + seed_cms. Verified: migrate+seed OK, all 8 endpoints 200 correct shapes. Committed 954f6ac.
- [x] 🔴 🚀 Frontend CMS wiring: server-only data layer (ISR revalidate 60 + static fallback), all consumers wired, home/contact views client->server, nav businesses via props. Verified: type-check+lint+tests pass, build hits API 18x, runtime renders CMS content. Committed 3019154.
