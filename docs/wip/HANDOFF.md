# 에이전트 핸드오프 (HANDOFF)

> Cursor ↔ Claude Code 맥락 공유 · **마지막 갱신: 2026-07-29 14:24:24**
> Claude Code 세션 시작 시 이 파일과 `docs/wip/WORKLOG.md`를 먼저 읽을 것.

## Claude Code — 시작 체크리스트

1. 이 파일(`docs/wip/HANDOFF.md`) 읽기
2. `docs/wip/WORKLOG.md` 읽기
3. 아래 **최근 Cursor 요청** · **변경 파일** 확인 후 이어서 작업

## 최근 Cursor 요청

- **2026-07-29 14:22:01** — DOM Path: div.fixed in.et-0 flex overflow-hidden bg-canva > div.min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-auto over.croll-contain > div.mx-auto flex w-full min-w-0 max-w-7xl gap-8 px-5 xl:pr-10 > main#docs-main > div.pace-y-5 > div.flex flex-col gap-10 > section.overflow-hidden rounded-xl border border-border bg-card[0] > div.overflow-x-auto > table.w-full table-fixed border-collap.e text-left text-.m leading-5 min-w-[40rem] > tbody > tr.border-b border-border/60 la.t:border-0[0] > td.px-5 py-5 align-top font-mono text-.m leading-5
Position: top=175px, left=396px, width=321px, height=81px
React Component: DocsTableTd
HTML Element: <td class="px-5 py-5 align-top font-mono text-sm leading-5" data-cursor-element-id="cursor-el-1">size</td> 와 DOM Path: div.fixed in.et-0 flex overflow-hidden bg-canva > div.min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-auto over.croll-contain > div.mx-auto flex w-full min-w-0 max-w-7xl gap-8 px-5 xl:pr-10 > main#docs-main > div.pace-y-5 > div.flex flex-col gap-10 > section.overflow-hidden rounded-xl border border-border bg-card[1] > div.overflow-x-auto > div.grid gap-0 lg:grid-col.-[17rem_minmax(0,1fr)] > div.border-b border-border lg:border-r lg:border-b-0 .pace-y-5 p-5
Position: top=797px, left=396px, width=272px, height=637px
React Component: PlaygroundLayout
HTML Element: <div class="border-b border-border lg:border-r lg:border-b-0 space-y-5 p-5" data-cursor-element-id="cursor-el-2">size 15_700 18_700 제목 description info required</div> 여기 순서 동일하게 맞춰줘 모든 컴포넌트 공통 적용

## 다음 작업 (Claude Code용)

- WORKLOG의 「다음에 할 일」 참고
- Cursor에서 명시한 후속 작업이 있으면 위 요청 목록 우선

## Git 상태

- 브랜치: `main`

```
 M docs/wip/HANDOFF.md
 M docs/wip/WORKLOG.md
 M packages/design-system/src/components/ui/tabs.tsx
 M src/components/docs/component-playground.tsx
 M src/components/docs/playground-registry.tsx
 M src/components/docs/playground-utils.ts
 M src/lib/component-case-specs.ts
?? .omc/
```

### diff 요약

```
 docs/wip/HANDOFF.md                               | 95 ++++-------------------
 docs/wip/WORKLOG.md                               | 16 ++--
 packages/design-system/src/components/ui/tabs.tsx |  2 +-
 src/components/docs/component-playground.tsx      | 62 ++++++++++-----
 src/components/docs/playground-registry.tsx       | 50 ++----------
 src/components/docs/playground-utils.ts           | 89 +++++++++++----------
 src/lib/component-case-specs.ts                   | 15 ----
 7 files changed, 124 insertions(+), 205 deletions(-)
```

## Claude Code 상태









































































































































































































































































































































































































- (아직 기록 없음)

## 다음 작업 (Cursor용)

- (Claude Code가 Cursor 에이전트에 넘길 일이 있으면 여기 기록)

