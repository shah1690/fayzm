# Fayzm

Monorepo: Next.js frontend + Django backend. The **apps run locally** on the
host; only **PostgreSQL + MinIO** run in Docker.

```
fayzm/
├── frontend/            # Next.js 16 app (pnpm, next-intl, Tailwind 4)
├── backend/             # Django 6 API (DRF, Channels, Unfold admin, MinIO)
├── docker-compose.yaml  # infra only: postgres + minio
├── scripts/             # kill-ports / setup / dev-backend helpers
└── .env.example         # shared env — copy to .env
```

## Services & ports

| Service   | URL                     | Where            |
| --------- | ----------------------- | ---------------- |
| frontend  | http://localhost:3000   | host (pnpm)      |
| backend   | http://localhost:8000   | host (venv)      |
| minio API | http://localhost:9000   | Docker           |
| minio UI  | http://localhost:9001   | Docker           |
| postgres  | localhost:5432          | Docker           |

Media files live in the MinIO bucket `fayzm-media` (public read), served from
`MEDIA_PUBLIC_URL`. Channels uses an in-memory layer locally (no Redis needed).

## Quick start

```bash
cp .env.example .env      # then edit secrets
pnpm setup                # frontend deps + backend venv + root tooling
pnpm dev                  # kills :8000/:3000, starts docker infra, runs both apps
```

`pnpm dev` frees the ports, brings up PostgreSQL + MinIO in Docker, then runs the
Django backend (`:8000`) and Next.js frontend (`:3000`) together on the host.

## Individual commands

```bash
pnpm infra            # start only postgres + minio (docker)
pnpm infra:down       # stop docker infra
pnpm kill             # free ports 8000 + 3000
pnpm dev:backend      # Django only (venv, migrate, runserver :8000)
pnpm dev:frontend     # Next.js only (:3000)
```

## Checks

```bash
pnpm --dir frontend run check   # lint + type-check + test
```
