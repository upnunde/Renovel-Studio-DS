# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-09-08  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Message** DS 추가 — Chat 섹션 · Bubble 재노출 · Header/Footer 좌측 끝 정렬
- Message 아바타 **말풍선 하단 정렬** · docs **AvatarImage** 기본
- **Bubble** max-width `80%` → **`60%`**
- Tooltip `mode=hover|pinned` · Figma Input/Button 스크립트

## 다음에 할 일

- 스튜디오 AppSidebar / SceneNavigation을 DS Sidebar로 교체
- (선택) MessageScroller 추가
- (선택) 라이트 `--disabled-border`를 rest `--border`와 다른 grayscale로 분리

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/components/ui/message.tsx` · `specs/message.spec.json`
- Message playground/showcase/overview

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- Message: http://localhost:3001/components/message
