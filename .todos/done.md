# ✅ DONE

- [x] 🟠 🚀 Convert repo to nextjs+django monorepo: frontend/ + backend/, unified docker-compose (minio media), merged .env.example, root .gitignore/README, CI split, husky moved. Verified: compose config OK, frontend install + type-check pass.
- [x] 🟡 🚀 Remove .github + .husky (not needed): deleted both dirs, stripped husky prepare-script + devDep from frontend/package.json, dropped README .github ref.
- [x] 🟠 🚀 Infra: docker-compose db+minio only; root package.json + scripts (kill-ports/setup/dev-backend); `pnpm dev` runs both apps on host (:8000/:3000), infra in Docker; env-driven host ports. Verified: infra healthy, migrate OK, health 200. Committed c075f3e.
- [x] 🔴 🚀 CMS backend+admin+API+seed: Django `cms` app, 9 models (localized JSON), Unfold admin, DRF /api/v1/cms/* matching frontend types, export-content.mjs + seed_cms. Verified: migrate+seed OK, all 8 endpoints 200 correct shapes. Committed 954f6ac.
- [x] 🔴 🚀 Frontend CMS wiring: server-only data layer (ISR revalidate 60 + static fallback), all consumers wired, home/contact views client->server, nav businesses via props. Verified: type-check+lint+tests pass, build hits API 18x, runtime renders CMS content. Committed 3019154.
- [x] 🟡 🚀 Brand backend to FAYZ-M: landing.html dark theme + navy #003566 + logo + buttons; Unfold title/navy palette/logo/CMS nav group; brand logos in static. Verified: check clean, landing/static/admin 200. Committed 447bcf6.
- [x] 🟢 🚀 Admin polish: drop CMS API button (cb04cee), hide dashboard app-list (2855e1b), remove Core sidebar groups (df7d6d8), per-row edit+delete Solar-icon actions on all CMS tables (b7bde5e). Verified: check clean, row_actions renders edit/delete urls + 2 svg.
- [x] 🟡 🚀 Home page editable via CMS: 6 singleton section models (Hero/Intro/Collections/CTA/WorldMap/Contact), own "Bosh sahifa" admin menus with per-locale inputs, /api/v1/cms/home/ API; frontend sections merge CMS over built-in copy (loc() fallback). Verified: backend migrate/API/admin, frontend type-check+lint+build, live edit renders + fallback restores. Commits fe364ee, 67d19d6.
- [x] 🔴 🚀 Fix admin ProgrammingError cms_homehero (stale server on wrong DB — restart; migrations already applied). Verified admin 200.
- [x] 🔴 🚀 Contact form 500 fix: only 500 when BOTH Telegram+amoCRM fail; lead accepted by either channel returns ok. Committed a5511d5.
- [x] 🟠 🚀 Singleton admins open change form directly (redirect changelist). Committed a5511d5.
- [x] 🟠 🚀 Dashboard: no-data empty states (chart/delivery/products), navy icon badges on content cards, 3-per-row. Committed a5511d5.
- [x] 🟡 🚀 Remove Firebase entirely (dep, settings, entrypoint, models, env). Committed dc41c51.
- [x] 🟡 🚀 Remove OTP entirely (models, views, serializers, urls, admin, throttle, settings). Committed dc41c51. Verified: check clean, endpoints 200/404.
- [x] 🟡 🚀 Prod config: single docker-compose.yaml (full stack + Traefik for 4 domains), removed extra compose files; .env.production.example comment-free, only needed vars; MinIO user/redirect + MEDIA_PUBLIC_URL. Committed b71f0dd.
- [x] 🟡 🚀 Telegram chat_id auto-detect via getUpdates (cached); only TELEGRAM_BOT_TOKEN in env. Committed b71f0dd.
