# 에이전트 핸드오프 (HANDOFF)

> Cursor ↔ Claude Code 맥락 공유 · **마지막 갱신: 2026-08-19 12:39:29**
> Claude Code 세션 시작 시 이 파일과 `docs/wip/WORKLOG.md`를 먼저 읽을 것.

## Claude Code — 시작 체크리스트

1. 이 파일(`docs/wip/HANDOFF.md`) 읽기
2. `docs/wip/WORKLOG.md` 읽기
3. 아래 **최근 Cursor 요청** · **변경 파일** 확인 후 이어서 작업

## 최근 Cursor 요청

- **2026-08-19 12:36:36** — 그럼 max w 440 적용

## 다음 작업 (Claude Code용)

- WORKLOG의 「다음에 할 일」 참고
- Cursor에서 명시한 후속 작업이 있으면 위 요청 목록 우선

## Git 상태

- 브랜치: `main`

```
 M DESIGN.md
 M docs/wip/HANDOFF.md
 M docs/wip/WORKLOG.md
 M packages/design-system/package.json
 M packages/design-system/specs/alert.spec.json
 M packages/design-system/specs/dialog.spec.json
 M packages/design-system/specs/field-label.spec.json
 M packages/design-system/specs/input.spec.json
 M packages/design-system/specs/toggle.spec.json
 M packages/design-system/specs/tooltip.spec.json
 M packages/design-system/src/alert.css
 M packages/design-system/src/button-group.css
 M packages/design-system/src/components/ui/alert.tsx
 M packages/design-system/src/components/ui/dialog-patterns.tsx
 M packages/design-system/src/components/ui/dialog.tsx
 M packages/design-system/src/components/ui/field-label.tsx
 M packages/design-system/src/components/ui/input.tsx
 M packages/design-system/src/components/ui/toggle.tsx
 M packages/design-system/src/tokens.css
 M packages/design-system/tokens/semantic-spacing.json
 M src/alert.css
 M src/components/docs/component-overview-preview.tsx
 M src/components/docs/component-playground.tsx
 M src/components/docs/component-showcases.tsx
 M src/components/docs/dialog-footer-actions.tsx
 M src/components/docs/playground-registry.tsx
 M src/components/docs/playground-utils.ts
 M src/components/ui/alert.tsx
 M src/components/ui/dialog.tsx
 M src/components/ui/toggle.tsx
 M src/lib/component-case-specs.ts
 M src/lib/component-docs.ts
 M src/lib/playground-snippet.ts
?? packages/design-system/specs/toggle-group.spec.json
?? packages/design-system/src/components/ui/toggle-group.tsx
?? src/components/ui/toggle-group.tsx
```

### diff 요약

```
 DESIGN.md                                          |  16 ++-
 docs/wip/HANDOFF.md                                | 105 ++++++++++++++--
 docs/wip/WORKLOG.md                                |   6 +-
 packages/design-system/package.json                |   1 +
 packages/design-system/specs/alert.spec.json       |  15 ++-
 packages/design-system/specs/dialog.spec.json      |   8 +-
 packages/design-system/specs/field-label.spec.json |   2 +-
 packages/design-system/specs/input.spec.json       |   3 +-
 packages/design-system/specs/toggle.spec.json      |  17 +--
 packages/design-system/specs/tooltip.spec.json     |   2 +-
 packages/design-system/src/alert.css               |  26 +++-
 packages/design-system/src/button-group.css        |  27 ++++-
 packages/design-system/src/components/ui/alert.tsx |  46 +++++--
 .../src/components/ui/dialog-patterns.tsx          |   7 +-
 .../design-system/src/components/ui/dialog.tsx     |   8 +-
 .../src/components/ui/field-label.tsx              |   8 +-
 packages/design-system/src/components/ui/input.tsx |   2 +
 .../design-system/src/components/ui/toggle.tsx     |  38 +++++-
 packages/design-system/src/tokens.css              |   1 +
 .../design-system/tokens/semantic-spacing.json     |   3 +-
 src/alert.css                                      |  26 +++-
 src/components/docs/component-overview-preview.tsx |  26 +++-
 src/components/docs/component-playground.tsx       |   3 +
 src/components/docs/component-showcases.tsx        | 132 ++++++++++++++++++++-
 src/components/docs/dialog-footer-actions.tsx      |   2 +-
 src/components/docs/playground-registry.tsx        |  98 +++++++++++++--
 src/components/docs/playground-utils.ts            |   1 -
 src/components/ui/alert.tsx                        |   2 +
 src/components/ui/dialog.tsx                       |   8 +-
 src/components/ui/toggle.tsx                       |  54 +--------
 src/lib/component-case-specs.ts                    |  44 ++++++-
 src/lib/component-docs.ts                          |   8 +-
 src/lib/playground-snippet.ts                      |   1 +
 33 files changed, 603 insertions(+), 143 deletions(-)
```

## Claude Code 상태












































































- Cursor: hover rest → Surface Container. border `emphasis`/`medium` 추가, `--input` alias화, 컴포넌트 `border-border-emphasis`.







































































































































































































































































































































































































































































































































- (아직 기록 없음)

## 다음 작업 (Cursor용)

- (Claude Code가 Cursor 에이전트에 넘길 일이 있으면 여기 기록)

