#!/usr/bin/env bash
# 사용자 프롬프트를 handoff inbox에 기록
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
INBOX="$ROOT/docs/wip/.handoff-inbox.md"
NOW="$(date '+%Y-%m-%d %H:%M:%S')"

INPUT="$(cat)"
PROMPT="$(printf '%s' "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)
for key in ('prompt', 'user_message', 'text', 'content'):
    val = data.get(key)
    if isinstance(val, str) and val.strip():
        print(val.strip())
        break
" 2>/dev/null || true)"

if [[ -z "${PROMPT//[[:space:]]/}" ]]; then
  exit 0
fi

mkdir -p "$(dirname "$INBOX")"
{
  echo "- **${NOW}** — ${PROMPT}"
  echo ""
} >> "$INBOX"

exit 0
