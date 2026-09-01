# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-09-01  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Button disabled 윤곽 분리** — solid=`uiDisabledFilledInteractive`(border transparent), outline=`uiDisabledOutline`(border `disabled-border`·bg transparent), ghost/link=`uiDisabledNoSurface`
- Chip·Toggle·SidebarMenuButton도 동일 헬퍼로 맞춤
- `DESIGN.md` · specs · `src/lib/ui-disabled.ts` 동기화
- 참고: 라이트 `--disabled-border`는 아직 `--border` alias라 rest outline과 색이 같음 (다크만 구분)

## 다음에 할 일

- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체
- (선택) 라이트 `--disabled-border`를 rest `--border`와 다른 grayscale로 분리

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/lib/ui-disabled.ts` · `button.tsx` · `chip.tsx` · `toggle.tsx` · `sidebar.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
