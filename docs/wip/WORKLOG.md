# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-26  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Bubble** · **Sidebar** · docs 사이드바 DS · v0.1.53
- docs 사이드바 크롬 좌우 패딩 20px
- **uiDisabledNoSurface** — rest 채움 없는 컨트롤(Button outline/ghost/link, Chip outline, Toggle, SidebarMenuButton) disabled 시 surface 금지 (`DESIGN.md` 규칙)

## 다음에 할 일

- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/lib/ui-disabled.ts` · `button.tsx` · `chip.tsx` · `toggle.tsx` · `sidebar.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
