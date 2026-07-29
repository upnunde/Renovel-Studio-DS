# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-29  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Tabs** — default 선택 탭 색을 Button default(`inverse-muted`)와 동일하게
- **Playground** — Properties 표와 컨트롤 순서 정렬 · hypertext max 숫자입력/count 슬라이더 · Label에서 hypertext 제거
- **스튜디오 감지** — 패키지 변경 포함 → `ds:release`로 태그 릴리스 예정

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/src/components/ui/tabs.tsx`
- `src/components/docs/component-playground.tsx` · `playground-utils.ts` · `playground-registry.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
