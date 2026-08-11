# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-11  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **아이콘 글리프** — 최소 `md`(16px) 통일 · `v0.1.25`
- **DialogFooter** — 버튼 넘침 시 세로(역순) 자동 스택
- **Tooltip** — 화살표(Arrow) 제거, 박스만 노출
- **Components 개요 미리보기** — Label→FieldLabel, Popover를 실제 면·구조에 맞춤

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `feat/dialog-footer-responsive-stack` → main 푸시
- `packages/design-system/src/components/ui/tooltip.tsx` · `dialog.tsx`
- `src/components/docs/component-overview-preview.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
