#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Upload Fayzm PDF files to the production Docker media volume.

Required env:
  DEPLOY_HOST       Server host/IP, e.g. 1.2.3.4

Optional env:
  DEPLOY_USER       SSH user. Default: root
  PROJECT_NAME      Coolify compose project name, e.g. h11besufm6xn4ur5iz5vjbsr
  VOLUME_NAME       Exact Docker volume name. Overrides PROJECT_NAME lookup
  REMOTE_TMP        Remote temp directory. Default: /tmp/fayzm-media-upload
  SSH_OPTS          Extra ssh options

Usage:
  DEPLOY_HOST=1.2.3.4 PROJECT_NAME=h11besufm6xn4ur5iz5vjbsr \
    ./scripts/upload-media-pdfs.sh "eng man.pdf" "eng woman.pdf" "rus man.pdf" "rus woman.pdf"

If no file arguments are passed, the script looks for these files in current dir:
  eng man.pdf, eng woman.pdf, rus man.pdf, rus woman.pdf
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  echo "DEPLOY_HOST is required" >&2
  usage >&2
  exit 1
fi

DEPLOY_USER="${DEPLOY_USER:-root}"
REMOTE_TMP="${REMOTE_TMP:-/tmp/fayzm-media-upload}"
SSH_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"
SSH_OPTS_ARRAY=()

if [[ -n "${SSH_OPTS:-}" ]]; then
  # shellcheck disable=SC2206
  SSH_OPTS_ARRAY=(${SSH_OPTS})
fi

if [[ "$#" -eq 0 ]]; then
  set -- "eng man.pdf" "eng woman.pdf" "rus man.pdf" "rus woman.pdf"
fi

for pdf in "$@"; do
  if [[ ! -f "$pdf" ]]; then
    echo "Missing PDF: $pdf" >&2
    exit 1
  fi

  case "$pdf" in
    *.pdf|*.PDF) ;;
    *) echo "Not a PDF path: $pdf" >&2; exit 1 ;;
  esac
done

LOCAL_TMP="$(mktemp -d)"
trap 'rm -rf "$LOCAL_TMP"' EXIT

STAGING_DIR="$LOCAL_TMP/documents"
mkdir -p "$STAGING_DIR"

for pdf in "$@"; do
  cp "$pdf" "$STAGING_DIR/$(basename "$pdf")"
done

TARBALL="$LOCAL_TMP/fayzm-pdfs.tar.gz"
tar -C "$STAGING_DIR" -czf "$TARBALL" .

ssh "${SSH_OPTS_ARRAY[@]}" "$SSH_TARGET" "mkdir -p '$REMOTE_TMP'"
scp "${SSH_OPTS_ARRAY[@]}" "$TARBALL" "$SSH_TARGET:$REMOTE_TMP/fayzm-pdfs.tar.gz"

ssh "${SSH_OPTS_ARRAY[@]}" "$SSH_TARGET" \
  "PROJECT_NAME='${PROJECT_NAME:-}' VOLUME_NAME='${VOLUME_NAME:-}' REMOTE_TMP='$REMOTE_TMP' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

if [[ -z "${VOLUME_NAME:-}" ]]; then
  if [[ -n "${PROJECT_NAME:-}" ]]; then
    VOLUME_NAME="$(docker volume ls --format '{{.Name}}' | grep -E "(^|_)${PROJECT_NAME}_media_data$" | head -n 1 || true)"
  fi
fi

if [[ -z "${VOLUME_NAME:-}" ]]; then
  VOLUME_NAME="$(docker volume ls --format '{{.Name}}' | grep -E '(^|_)media_data$' | head -n 1 || true)"
fi

if [[ -z "${VOLUME_NAME:-}" ]]; then
  echo "media_data volume not found. Set PROJECT_NAME or VOLUME_NAME." >&2
  echo "Available volumes:" >&2
  docker volume ls >&2
  exit 1
fi

docker run --rm \
  -v "$VOLUME_NAME:/data" \
  -v "$REMOTE_TMP:/upload:ro" \
  alpine:3.20 \
  sh -c 'set -e; mkdir -p /data/documents; tar -xzf /upload/fayzm-pdfs.tar.gz -C /data/documents; find /data/documents -type f -name "*.pdf" -exec chmod 0644 {} \;'

rm -f "$REMOTE_TMP/fayzm-pdfs.tar.gz"

echo "Uploaded PDFs to Docker volume: $VOLUME_NAME"
echo "Files:"
docker run --rm -v "$VOLUME_NAME:/data:ro" alpine:3.20 sh -c 'find /data/documents -maxdepth 1 -type f -name "*.pdf" -exec basename {} \;' | sort
REMOTE_SCRIPT

echo "Done. Test: https://media.fayzm.uz/documents/eng%20man.pdf"
