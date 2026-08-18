# 에이전트 핸드오프 (HANDOFF)

> Cursor ↔ Claude Code 맥락 공유 · **마지막 갱신: 2026-08-18 14:08:52**
> Claude Code 세션 시작 시 이 파일과 `docs/wip/WORKLOG.md`를 먼저 읽을 것.

## Claude Code — 시작 체크리스트

1. 이 파일(`docs/wip/HANDOFF.md`) 읽기
2. `docs/wip/WORKLOG.md` 읽기
3. 아래 **최근 Cursor 요청** · **변경 파일** 확인 후 이어서 작업

## 최근 Cursor 요청

- **2026-08-18 14:06:07** — DOM Path: div.flex min-h-0 w-full flex-1 flex-col bg-tran.parent > div.flex h-dvh flex-col overflow-hidden > div.flex min-h-0 flex-1 overflow-hidden bg-[color:var(--.urface-20)] > main.min-h-0 min-w-0 flex-1 overflow-y-auto > div.mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 .m:px-8 > div.flex flex-col gap-10 > section.flex flex-col gap-3[0] > div.overflow-hidden rounded-xl border border-[color:var(--border-10)] bg-[color:var(--.urface-10)] > div.grid md:grid-col.-[minmax(220px,260px)_minmax(0,1fr)] md:item.-.tretch > div.flex min-h-0 min-w-0 flex-col > div.flex min-h-80 flex-1 item.-center ju.tify-center overflow-x-auto p-8 > div > button.group/button inline-flex .hrink-0 item.-center ju.tify-center rounded-lg border bg-clip-padding white.pace-nowrap tran.ition-all outline-none .elect-none touch-manipulation focu.-vi.ible:border-ring focu.-vi.ible:ring-3 focu.-vi.ible:ring-ring/50 di.abled:pointer-event.-none di.abled:opacity-50 aria-invalid:border-de.tructive aria-invalid:ring-3 aria-invalid:ring-de.tructive/20 dark:aria-invalid:border-de.tructive/50 dark:aria-invalid:ring-de.tructive/40 [&_.vg]:pointer-event.-none [&_.vg]:.hrink-0 border-border bg-tran.parent hover:bg-muted hover:text-foreground dark:border-input dark:hover:bg-input/50 aria-expanded:hover:bg-tran.parent aria-expanded:hover:text-inherit aria-pre.ed:border-[color:var(--border-.trong)] aria-pre.ed:hover:bg-tran.parent aria-pre.ed:hover:text-inherit data-[.tate=open]:hover:bg-tran.parent data-[.tate=open]:hover:text-inherit dark:aria-expanded:hover:bg-tran.parent dark:aria-pre.ed:hover:bg-tran.parent dark:data-[.tate=open]:hover:bg-tran.parent h-10 gap-1.5 px-3 text-body3_400 ha.-data-[icon=inline-end]:pr-3 ha.-data-[icon=inline-.tart]:pl-3 [&_.vg:not([cla.*='.ize-'])]:.ize-5
Position: top=410px, left=975px, width=50px, height=40px
React Component: Button
HTML Element: <button data-slot="button" data-variant="outline" data-type="default" data-size="h40" data-shape="default" type="button" class="group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding whitespace-nowrap transition-all outline-none select-none touch-manipulation focus-visible:border-ring f…" data-cursor-element-id="cursor-el-1">확인</button> 아웃라인 버튼에는 surface 없어야 해
그리고 어윳러안 타입의 컴포넌트들은 전부 표면이 transparent 상태가 되도록 해줘

## 다음 작업 (Claude Code용)

- 윤곽 rest transparent는 커밋·릴리스 대상. 스튜디오는 새 태그 핀 후 확인
- 스튜디오 구 시맨틱 클래스 대체·Docs 셸 `space.layout.*`는 미결정

## Git 상태

- 브랜치: `main`

```
 M DESIGN.md
 M docs/wip/HANDOFF.md
 M packages/design-system/specs/checkbox.spec.json
 M packages/design-system/specs/chip.spec.json
 M packages/design-system/specs/input.spec.json
 M packages/design-system/specs/radio-group.spec.json
 M packages/design-system/specs/select.spec.json
 M packages/design-system/specs/tabs.spec.json
 M packages/design-system/specs/textarea.spec.json
 M packages/design-system/src/components/ui/badge.tsx
 M packages/design-system/src/components/ui/button.tsx
 M packages/design-system/src/components/ui/checkbox.tsx
 M packages/design-system/src/components/ui/chip.tsx
 M packages/design-system/src/components/ui/input.tsx
 M packages/design-system/src/components/ui/radio-group.tsx
 M packages/design-system/src/components/ui/select.tsx
 M packages/design-system/src/components/ui/tabs.tsx
 M packages/design-system/src/components/ui/textarea.tsx
 M src/components/color-semantic-palette.tsx
 M src/components/docs/showcase-block.tsx
 M src/components/ui/select.tsx
 M src/components/ui/textarea.tsx
 M src/lib/color-tokens.ts
```

### diff 요약

```
 DESIGN.md                                          |   2 +
 docs/wip/HANDOFF.md                                | 173 ++-------------------
 packages/design-system/specs/checkbox.spec.json    |   2 +-
 packages/design-system/specs/chip.spec.json        |   2 +-
 packages/design-system/specs/input.spec.json       |   2 +-
 packages/design-system/specs/radio-group.spec.json |   2 +-
 packages/design-system/specs/select.spec.json      |   2 +-
 packages/design-system/specs/tabs.spec.json        |   2 +-
 packages/design-system/specs/textarea.spec.json    |   2 +-
 packages/design-system/src/components/ui/badge.tsx |   4 +-
 .../design-system/src/components/ui/button.tsx     |   2 +-
 .../design-system/src/components/ui/checkbox.tsx   |   2 +-
 packages/design-system/src/components/ui/chip.tsx  |   2 +-
 packages/design-system/src/components/ui/input.tsx |   2 +-
 .../src/components/ui/radio-group.tsx              |   2 +-
 .../design-system/src/components/ui/select.tsx     |   2 +-
 packages/design-system/src/components/ui/tabs.tsx  |   2 +-
 .../design-system/src/components/ui/textarea.tsx   |   2 +-
 src/components/color-semantic-palette.tsx          |   8 +-
 src/components/docs/showcase-block.tsx             |  24 +--
 src/components/ui/select.tsx                       |   2 +-
 src/components/ui/textarea.tsx                     |   2 +-
 src/lib/color-tokens.ts                            |   7 -
 23 files changed, 44 insertions(+), 208 deletions(-)
```

## Claude Code 상태
















- Cursor: hover rest → Surface Container. border `emphasis`/`medium` 추가, `--input` alias화, 컴포넌트 `border-border-emphasis`.







































































































































































































































































































































































































































































































































- (아직 기록 없음)

## 다음 작업 (Cursor용)

- 리노벨 스튜디오: 구 시맨틱 클래스 대체 + outline rest가 투명한지 확인

