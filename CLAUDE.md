@AGENTS.md

# Claude Code — 이 프로젝트

## 세션 시작 (필수)

코드 수정·탐색 **전에** 반드시 읽기:

1. `docs/wip/HANDOFF.md` — Cursor와 공유하는 최신 핸드오프 (요청·Git·다음 작업)
2. `docs/wip/WORKLOG.md` — 프로젝트 맥락·오늘 한 일
3. **`DESIGN.md`** — 코드·UI·스타일 작업 시 규칙·토큰·Anti-Patterns 최우선 준수

읽은 뒤 HANDOFF의 **「다음 작업 (Claude Code용)」**과 **「최근 Cursor 요청」**을 우선 반영할 것.

## 세션 종료 시

1. `docs/wip/HANDOFF.md`의 **「Claude Code 상태」**에 완료·미완·블로커 기록
2. Cursor에 넘길 일이 있으면 **「다음 작업 (Cursor용)」**에 구체적으로 적기
3. 의미 있는 작업이면 `docs/wip/WORKLOG.md`도 갱신

## Cursor 에이전트와의 관계

- 대화·메모리는 **공유되지 않음** — 이 파일과 HANDOFF가 연결 고리
- Cursor에서 한 작업은 HANDOFF·Git diff로 확인
- 한 작업은 가능하면 **한 에이전트에서만** 이어갈 것
