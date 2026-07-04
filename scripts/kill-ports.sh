#!/usr/bin/env bash
# Free the given TCP ports by killing whatever is listening on them.
# Usage: kill-ports.sh 8000 3000
set -u

for port in "$@"; do
  pids=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "==> Killing port $port (pids: $pids)"
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
  else
    echo "==> Port $port already free"
  fi
done
