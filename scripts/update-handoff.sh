#!/usr/bin/env bash
# HANDOFF.md 자동 갱신 — Cursor Hook·수동 실행 공용
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
WIP_DIR="$ROOT/docs/wip"
HANDOFF="$WIP_DIR/HANDOFF.md"
INBOX="$WIP_DIR/.handoff-inbox.md"
NOW="$(date '+%Y-%m-%d %H:%M:%S')"
BRANCH="$(git -C "$ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo '(not a git repo)')"
STATUS="$(git -C "$ROOT" status --short 2>/dev/null || true)"
DIFF_STAT="$(git -C "$ROOT" diff --stat 2>/dev/null || true)"

# 기존 Claude Code 상태 섹션 보존
CLAUDE_STATE=""
if [[ -f "$HANDOFF" ]]; then
  CLAUDE_STATE="$(awk '/^## Claude Code 상태/{flag=1;next}/^## /{if(flag) exit}flag' "$HANDOFF" || true)"
fi
if [[ -z "${CLAUDE_STATE//[[:space:]]/}" ]]; then
  CLAUDE_STATE="- (아직 기록 없음)"
fi

# inbox 프롬프트 (최근 20줄)
INBOX_CONTENT=""
if [[ -f "$INBOX" ]]; then
  INBOX_CONTENT="$(tail -n 20 "$INBOX")"
fi
if [[ -z "${INBOX_CONTENT//[[:space:]]/}" ]]; then
  INBOX_CONTENT="- (최근 Cursor 요청 없음)"
fi

mkdir -p "$WIP_DIR"

cat > "$HANDOFF" <<EOF
# 에이전트 핸드오프 (HANDOFF)

> Cursor ↔ Claude Code 맥락 공유 · **마지막 갱신: ${NOW}**
> Claude Code 세션 시작 시 이 파일과 \`docs/wip/WORKLOG.md\`를 먼저 읽을 것.

## Claude Code — 시작 체크리스트

1. 이 파일(\`docs/wip/HANDOFF.md\`) 읽기
2. \`docs/wip/WORKLOG.md\` 읽기
3. 아래 **최근 Cursor 요청** · **변경 파일** 확인 후 이어서 작업

## 최근 Cursor 요청

${INBOX_CONTENT}

## 다음 작업 (Claude Code용)

- WORKLOG의 「다음에 할 일」 참고
- Cursor에서 명시한 후속 작업이 있으면 위 요청 목록 우선

## Git 상태

- 브랜치: \`${BRANCH}\`

\`\`\`
${STATUS:-"(변경 없음)"}
\`\`\`

### diff 요약

\`\`\`
${DIFF_STAT:-"(diff 없음)"}
\`\`\`

## Claude Code 상태

${CLAUDE_STATE}

## 다음 작업 (Cursor용)

- (Claude Code가 Cursor 에이전트에 넘길 일이 있으면 여기 기록)

EOF

# inbox는 HANDOFF에 반영 후 비움 (중복 방지)
: > "$INBOX"

echo "handoff updated → $HANDOFF"
