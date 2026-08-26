# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-26  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Bubble** — variant `default`/`secondary`/`tinted`/`destructive`, `text-body3_400`, playground textarea
- **Sidebar** — `SidebarGroup`/`Label`/`Menu`/`Item`/`Button` (size padX 정렬, Label=On Surface Hint)
- docs 사이드바를 DS Sidebar로 교체 · 섹션 간격은 부모 `gap-5`
- Playground 옵션·컨트롤 표시명 영문 가이드 (`DESIGN.md` §3-5)

## 다음에 할 일

- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체
- Docs 예시 카드 2열·중앙 정렬 잔여 확인

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/components/ui/sidebar.tsx` · `bubble.tsx`
- `src/components/docs-sidebar.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
