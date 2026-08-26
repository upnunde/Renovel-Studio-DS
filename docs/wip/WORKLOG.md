# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-26  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Bubble** · **Sidebar** 추가 · docs 사이드바 DS 적용 · v0.1.52 릴리스
- docs 사이드바 크롬 좌우 패딩 20px(`px-5`)
- Button ghost·link: disabled 시 surface 추가 금지 (`uiDisabledNoSurface`)
- 예시 카드 그리드 columns·정렬 조정

## 다음에 할 일

- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `main`
- `src/components/docs-sidebar.tsx` · `component-case-docs.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
