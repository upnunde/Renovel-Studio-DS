# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-29  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Accordion 삭제** — 사용처 없어 컴포넌트·문서·패키지 export 완전 제거
- **Dropdown Menu Playground** — `leading-icon`을 `showIcon` 독립 토글로 분리, `showLabel` 추가, Label 색상 `foreground/30`, Properties 정리(`composition`·`itemHeight` 제거)
- **Tooltip** — Properties 정리(`mode`·`text` 제거), 컨트롤 순서 변경(side→open→removable)
- **Alert** — status별 surface 배경 적용(success/warning/destructive), `variant` 제거(단일값)
- **Spacing Semantic 축소** — 시맨틱 간격 토큰을 33개에서 7개(layout·overlay 핵심만)로 정리하고, 나머지는 원시 토큰(`gap-*`, `p-*`) 사용으로 전환
- **런타임 오류 수정** — `SEMANTIC_SPACE_SECTION is not defined` 오류를 `src/spacing-tokens.ts` 패키지 re-export 동기화로 해결
- **Sidebar 전용 시맨틱 제거** — `sidebar-*` 토큰/테마 매핑/문서 카테고리를 제거하고 `docs-sidebar`를 공통 토큰(`background`, `foreground`, `accent`, `border`)으로 재구성
- **Tabs text variant 정리** — trigger 좌우 padding을 제거하고 `TabsList` gap으로 간격을 옮겨 정렬을 맞춤
- **Tabs hover 정리** — text variant는 영역 배경 hover를 제거하고 텍스트 색상만 반응하도록 수정
- **Tabs line variant 정리** — trigger 좌우·세로 padding과 최소폭을 제거하고 `TabsList` gap으로 간격을 이관
- **Tabs line hover 정리** — line variant도 박스형 hover를 제거하고 텍스트 색상만 반응하도록 수정

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/src/components/ui/tabs.tsx`
- `packages/design-system/src/tabs.css`
- `packages/design-system/src/component-size-tokens.ts`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
