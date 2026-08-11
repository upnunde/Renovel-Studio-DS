# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-11  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **아이콘 글리프** — `xs`(12)·`sm`(14) 제거, 최소 `md`(16px)로 통일 (접근성·광학)
- **소비처** — Button/Chip/Dialog/Input 등 `size="xs"|"sm"` → `md` 매핑·스펙·docs 정리
- **FieldLabel docs** — Usage를 2열 가로 그리드, 라벨 `가로 (horizontal)`

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: `chore/icon-glyph-min-16` → main 푸시 예정
- `packages/design-system/src/component-size-tokens.ts` · `icon.tsx` · `icons.css` · `tokens.css`
- `DESIGN.md` §3-4 아이콘 글리프

## 메모

- 검증: `cd packages/design-system && npm run tokens:check`
- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
