# 에이전트 핸드오프 (HANDOFF)

> Cursor ↔ Claude Code 맥락 공유 · **마지막 갱신: 2026-08-18 11:43:52**
> Claude Code 세션 시작 시 이 파일과 `docs/wip/WORKLOG.md`를 먼저 읽을 것.

## Claude Code — 시작 체크리스트

1. 이 파일(`docs/wip/HANDOFF.md`) 읽기
2. `docs/wip/WORKLOG.md` 읽기
3. 아래 **최근 Cursor 요청** · **변경 파일** 확인 후 이어서 작업

## 최근 Cursor 요청

- **2026-08-18 11:43:34** — 그렇게 적용된 컴포넌트 없는지 재검토해줘

## 다음 작업 (Claude Code용)

- 시맨틱 분류(Background/Surface/Content)는 커밋·릴리스됨. 스튜디오는 새 태그 핀 후 구 클래스 대체
- Docs 셸 `space.layout.*` 정렬·스펙 FLAG 웹 코드 정렬은 미결정

## Git 상태

- 브랜치: `main`

```
 M DESIGN.md
 M docs/wip/HANDOFF.md
 M packages/design-system/specs/avatar.spec.json
 M packages/design-system/specs/badge.spec.json
 M packages/design-system/specs/button-group.spec.json
 M packages/design-system/specs/button.spec.json
 M packages/design-system/specs/checkbox.spec.json
 M packages/design-system/specs/chip.spec.json
 M packages/design-system/specs/file-input.spec.json
 M packages/design-system/specs/input.spec.json
 M packages/design-system/specs/progress.spec.json
 M packages/design-system/specs/radio-group.spec.json
 M packages/design-system/specs/select.spec.json
 M packages/design-system/specs/skeleton.spec.json
 M packages/design-system/specs/slider.spec.json
 M packages/design-system/specs/switch.spec.json
 M packages/design-system/specs/textarea.spec.json
 M packages/design-system/specs/toggle.spec.json
 M packages/design-system/src/components/ui/alert.tsx
 M packages/design-system/src/components/ui/avatar.tsx
 M packages/design-system/src/components/ui/badge.tsx
 M packages/design-system/src/components/ui/button-group.tsx
 M packages/design-system/src/components/ui/button.tsx
 M packages/design-system/src/components/ui/checkbox.tsx
 M packages/design-system/src/components/ui/chip.tsx
 M packages/design-system/src/components/ui/dialog-patterns.tsx
 M packages/design-system/src/components/ui/dialog.tsx
 M packages/design-system/src/components/ui/dropdown-menu.tsx
 M packages/design-system/src/components/ui/email-input.tsx
 M packages/design-system/src/components/ui/input.tsx
 M packages/design-system/src/components/ui/popover.tsx
 M packages/design-system/src/components/ui/progress.tsx
 M packages/design-system/src/components/ui/radio-group.tsx
 M packages/design-system/src/components/ui/select.tsx
 M packages/design-system/src/components/ui/skeleton.tsx
 M packages/design-system/src/components/ui/slider.tsx
 M packages/design-system/src/components/ui/switch.tsx
 M packages/design-system/src/components/ui/textarea.tsx
 M packages/design-system/src/components/ui/toggle.tsx
 M packages/design-system/src/grayscale-colors.ts
 M packages/design-system/src/lib/ui-disabled.ts
 M packages/design-system/src/tabs.css
 M packages/design-system/src/theme.css
 M packages/design-system/src/tokens.css
 M packages/design-system/tokens/semantic.json
 M src/components/color-semantic-palette.tsx
 M src/components/docs-sidebar.tsx
 M src/components/docs/component-case-docs.tsx
 M src/components/docs/component-overview-preview.tsx
 M src/components/docs/component-showcase-client.tsx
 M src/components/docs/component-showcases.tsx
 M src/components/docs/dialog-footer-actions.tsx
 M src/components/docs/doc-content.tsx
 M src/components/docs/docs-table.tsx
 M src/components/docs/foundation-elevation.tsx
 M src/components/docs/foundation-motion.tsx
 M src/components/docs/foundation-overview-preview.tsx
 M src/components/docs/foundation-radius.tsx
 M src/components/docs/foundation-spacing.tsx
 M src/components/docs/lucide-icon-gallery.tsx
 M src/components/docs/overview-card-link.tsx
 M src/components/docs/playground-shell.tsx
 M src/components/docs/showcase-block.tsx
 M src/components/ui/dialog.tsx
 M src/components/ui/dropdown-menu.tsx
 M src/components/ui/popover.tsx
 M src/components/ui/progress.tsx
 M src/components/ui/select.tsx
 M src/components/ui/skeleton.tsx
 M src/components/ui/textarea.tsx
 M src/components/ui/toggle.tsx
 M src/grayscale-colors.ts
 M src/lib/color-tokens.ts
 M src/lib/semantic-token-sources.ts
 M src/lib/ui-disabled.ts
 M src/tabs.css
 M src/theme.css
 M src/tokens.css
```

### diff 요약

```
 DESIGN.md                                          |  93 ++++----
 docs/wip/HANDOFF.md                                | 186 +++++++++++++--
 packages/design-system/specs/avatar.spec.json      |   4 +-
 packages/design-system/specs/badge.spec.json       |   2 +-
 .../design-system/specs/button-group.spec.json     |   4 +-
 packages/design-system/specs/button.spec.json      |   6 +-
 packages/design-system/specs/checkbox.spec.json    |   2 +-
 packages/design-system/specs/chip.spec.json        |   4 +-
 packages/design-system/specs/file-input.spec.json  |   2 +-
 packages/design-system/specs/input.spec.json       |   2 +-
 packages/design-system/specs/progress.spec.json    |   2 +-
 packages/design-system/specs/radio-group.spec.json |   2 +-
 packages/design-system/specs/select.spec.json      |   2 +-
 packages/design-system/specs/skeleton.spec.json    |   2 +-
 packages/design-system/specs/slider.spec.json      |   2 +-
 packages/design-system/specs/switch.spec.json      |   2 +-
 packages/design-system/specs/textarea.spec.json    |   2 +-
 packages/design-system/specs/toggle.spec.json      |   2 +-
 packages/design-system/src/components/ui/alert.tsx |   2 +-
 .../design-system/src/components/ui/avatar.tsx     |   4 +-
 packages/design-system/src/components/ui/badge.tsx |   2 +-
 .../src/components/ui/button-group.tsx             |   4 +-
 .../design-system/src/components/ui/button.tsx     |  18 +-
 .../design-system/src/components/ui/checkbox.tsx   |   2 +-
 packages/design-system/src/components/ui/chip.tsx  |   2 +-
 .../src/components/ui/dialog-patterns.tsx          |   2 +-
 .../design-system/src/components/ui/dialog.tsx     |   2 +-
 .../src/components/ui/dropdown-menu.tsx            |   4 +-
 .../src/components/ui/email-input.tsx              |   2 +-
 packages/design-system/src/components/ui/input.tsx |   2 +-
 .../design-system/src/components/ui/popover.tsx    |   2 +-
 .../design-system/src/components/ui/progress.tsx   |   2 +-
 .../src/components/ui/radio-group.tsx              |   2 +-
 .../design-system/src/components/ui/select.tsx     |   8 +-
 .../design-system/src/components/ui/skeleton.tsx   |   2 +-
 .../design-system/src/components/ui/slider.tsx     |   2 +-
 .../design-system/src/components/ui/switch.tsx     |   2 +-
 .../design-system/src/components/ui/textarea.tsx   |   2 +-
 .../design-system/src/components/ui/toggle.tsx     |   2 +-
 packages/design-system/src/grayscale-colors.ts     |   2 +-
 packages/design-system/src/lib/ui-disabled.ts      |   8 +-
 packages/design-system/src/tabs.css                |   8 +-
 packages/design-system/src/theme.css               |   6 +-
 packages/design-system/src/tokens.css              |  46 ++--
 packages/design-system/tokens/semantic.json        |  42 ++--
 src/components/color-semantic-palette.tsx          |  10 +-
 src/components/docs-sidebar.tsx                    |   2 +-
 src/components/docs/component-case-docs.tsx        |   4 +-
 src/components/docs/component-overview-preview.tsx |   8 +-
 src/components/docs/component-showcase-client.tsx  |   4 +-
 src/components/docs/component-showcases.tsx        |   4 +-
 src/components/docs/dialog-footer-actions.tsx      |  10 +-
 src/components/docs/doc-content.tsx                |  10 +-
 src/components/docs/docs-table.tsx                 |   2 +-
 src/components/docs/foundation-elevation.tsx       |   8 +-
 src/components/docs/foundation-motion.tsx          |   4 +-
 .../docs/foundation-overview-preview.tsx           |  22 +-
 src/components/docs/foundation-radius.tsx          |   2 +-
 src/components/docs/foundation-spacing.tsx         |   2 +-
 src/components/docs/lucide-icon-gallery.tsx        |   2 +-
 src/components/docs/overview-card-link.tsx         |   4 +-
 src/components/docs/playground-shell.tsx           |   2 +-
 src/components/docs/showcase-block.tsx             |   4 +-
 src/components/ui/dialog.tsx                       |   2 +-
 src/components/ui/dropdown-menu.tsx                |   4 +-
 src/components/ui/popover.tsx                      |   2 +-
 src/components/ui/progress.tsx                     |   2 +-
 src/components/ui/select.tsx                       |   8 +-
 src/components/ui/skeleton.tsx                     |   2 +-
 src/components/ui/textarea.tsx                     |   2 +-
 src/components/ui/toggle.tsx                       |   2 +-
 src/grayscale-colors.ts                            |   2 +-
 src/lib/color-tokens.ts                            | 256 +++++----------------
 src/lib/semantic-token-sources.ts                  |  44 ++--
 src/lib/ui-disabled.ts                             |   8 +-
 src/tabs.css                                       |   8 +-
 src/theme.css                                      |   6 +-
 src/tokens.css                                     |   9 +-
 78 files changed, 518 insertions(+), 446 deletions(-)
```

## Claude Code 상태










- Cursor: hover rest → Surface Container. border `emphasis`/`medium` 추가, `--input` alias화, 컴포넌트 `border-border-emphasis`.







































































































































































































































































































































































































































































































































- (아직 기록 없음)

## 다음 작업 (Cursor용)

- 리노벨 스튜디오: 구 시맨틱 클래스(`bg-card`, rest `bg-muted`, `border-input` 등)를 새 이름으로 대체 (대화에 적어 둔 명령문 사용)

