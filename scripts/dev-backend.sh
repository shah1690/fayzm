#!/usr/bin/env bash
# Run the Django backend locally (no Docker) on port 8000.
# Creates a venv on first run, installs deps, migrates, then serves.
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR/backend"

if [ ! -d .venv ]; then
  echo "==> Creating backend virtualenv..."
  python3 -m venv .venv
  ./.venv/bin/pip install --upgrade pip
  ./.venv/bin/pip install -r requirements.txt
fi

# Ensure a .env exists at repo root so Django picks up localhost DB/MinIO.
if [ ! -f "$ROOT_DIR/.env" ]; then
  echo "==> No root .env found; copying from .env.example"
  cp "$ROOT_DIR/.env.example" "$ROOT_DIR/.env"
fi

echo "==> Applying migrations..."
./.venv/bin/python manage.py migrate --noinput

echo "==> Starting Django on http://localhost:8000 ..."
exec ./.venv/bin/python manage.py runserver 0.0.0.0:8000
