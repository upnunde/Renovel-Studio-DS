# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-09-10  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Switch** `tone` 축 추가 — `neutral`(inverse-muted) · `brand`(primary, 기본) · playground/showcase/DESIGN
- **Textarea** min-height **120px** (`min-h-30`, rows 시 `max(rows·lh, 7.5rem)`)
- **아이콘 갤러리** 클릭 시 적용 코드 자동 복사 + Sonner 토스트 (`useState` import 복구 포함)

## 다음에 할 일

- Switch playground `caption` — 미리보기 미연동(문서축). Properties 전용으로 빼거나 Label 미리보기 연결
- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체
- (선택) MessageScroller 추가
- (선택) 라이트 `--disabled-border`를 rest `--border`와 다른 grayscale로 분리

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것
- 스튜디오 `check:ds` — 프로토타입 hex 등 위반으로 Sync 실패 가능(패키지 릴리스와 별개)

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/components/ui/switch.tsx` · `textarea.tsx`
- `src/components/docs/lucide-icon-gallery.tsx` · playground/showcase

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- Switch: http://localhost:3001/components/switch
