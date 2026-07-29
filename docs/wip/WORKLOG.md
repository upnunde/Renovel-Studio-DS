# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-29  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Accordion 삭제** — 사용처 없어 컴포넌트·문서·패키지 export 완전 제거
- **Dropdown Menu Playground** — `leading-icon`을 `showIcon` 독립 토글로 분리, `showLabel` 추가, Label 색상 `foreground/30`, Properties 정리(`composition`·`itemHeight` 제거)
- **Tooltip** — Properties 정리(`mode`·`text` 제거), 컨트롤 순서 변경(side→open→removable)
- **Alert** — status별 surface 배경 적용(success/warning/destructive), `variant` 제거(단일값)

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/src/components/ui/alert.tsx` · `dropdown-menu.tsx`
- `src/lib/component-case-specs.ts` · `playground-registry.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
