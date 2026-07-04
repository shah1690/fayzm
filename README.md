# Fayzm

Monorepo: Next.js frontend + Django backend. The **apps run locally** on the
host; only **PostgreSQL + MinIO** run in Docker.

```
fayzm/
├── frontend/            # Next.js 16 app (pnpm, next-intl, Tailwind 4)
├── backend/             # Django 6 API (DRF, Channels, Unfold admin, MinIO)
├── docker-compose.yaml  # single stack: db + redis + minio + backend + frontend
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

## Production

Domains (TLS terminated by the reverse proxy; Django trusts `X-Forwarded-Proto`):

| Domain                      | Serves                                   |
| --------------------------- | ---------------------------------------- |
| `https://fayzm.uz`          | frontend (Next.js)                       |
| `https://back.fayzm.uz`     | backend — Django API + `/admin/`         |
| `https://media.fayzm.uz`    | MinIO media, **bucket at root** (public) |
| `https://minioinit.fayzm.uz`| MinIO console UI (port 9001)             |

```bash
cp .env.production.example .env   # fill secrets on the server
```

Key points, all env-driven (see `.env.production.example`):

- `ALLOWED_HOSTS=back.fayzm.uz`, `CORS_ALLOWED_ORIGINS=https://fayzm.uz`,
  `CSRF_TRUSTED_ORIGINS=https://back.fayzm.uz,https://fayzm.uz`.
- `NEXT_PUBLIC_API_URL=https://back.fayzm.uz`, `MEDIA_PUBLIC_URL=https://media.fayzm.uz`.
- MinIO: `MINIO_CUSTOM_DOMAIN=media.fayzm.uz` makes public URLs
  `https://media.fayzm.uz/<key>` (map that domain to the MinIO bucket root);
  the backend uploads over the internal `MINIO_INTERNAL_ENDPOINT=minio:9000`.
- `DEBUG=False` + `ENABLE_HTTPS_REDIRECT=True`.

Reverse-proxy routing: `back.` → backend:8000, `media.` → minio:9000 (bucket
root), `minioinit.` → minio:9001, `fayzm.uz` → frontend:3000.
