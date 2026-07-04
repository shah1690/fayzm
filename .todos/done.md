# ✅ DONE

- [x] 🟠 🚀 Convert repo to nextjs+django monorepo: frontend/ + backend/, unified docker-compose (minio media), merged .env.example, root .gitignore/README, CI split, husky moved. Verified: compose config OK, frontend install + type-check pass.
- [x] 🟡 🚀 Remove .github + .husky (not needed): deleted both dirs, stripped husky prepare-script + devDep from frontend/package.json, dropped README .github ref.
- [x] 🟠 🚀 Infra: docker-compose db+minio only; root package.json + scripts (kill-ports/setup/dev-backend); `pnpm dev` runs both apps on host (:8000/:3000), infra in Docker; env-driven host ports. Verified: infra healthy, migrate OK, health 200. Committed c075f3e.
