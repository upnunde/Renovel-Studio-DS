#!/usr/bin/env bash
# Cursor Agent 종료 시 HANDOFF.md 갱신
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
sh "$ROOT/scripts/update-handoff.sh" >/dev/null 2>&1 || true
exit 0
