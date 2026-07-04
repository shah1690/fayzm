#!/usr/bin/env bash
# One-time setup: root tooling, frontend deps, backend venv + deps, root .env.
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  echo "==> Creating root .env from .env.example"
  cp .env.example .env
fi

echo "==> Installing root tooling (concurrently)..."
pnpm install

echo "==> Installing frontend deps..."
pnpm --dir frontend install

echo "==> Setting up backend venv..."
cd backend
if [ ! -d .venv ]; then
  python3 -m venv .venv
fi
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r requirements.txt

echo "==> Setup complete. Start everything with:  pnpm dev"
