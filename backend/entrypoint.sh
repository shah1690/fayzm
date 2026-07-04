#!/bin/sh
set -e

echo "==> Running migrations..."
python manage.py migrate --noinput

echo "==> Seeding CMS content (first deploy only)..."
python manage.py seed_cms --if-empty || true

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Starting Daphne..."
exec daphne -b 0.0.0.0 -p 8000 config.asgi:application
