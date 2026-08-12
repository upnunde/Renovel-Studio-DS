# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-12  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **다크 `--canvas-muted`** — `grayscale-130` → `grayscale-150` (라이트는 `grayscale-15` 유지)
- **Color Semantic hydration** — `useDocsTheme`로 mount 전 Light 고정, ThemeNote·Maps to SSR 불일치 해소
- 정본 동기화 — `tokens.css` · `semantic.json` · `semantic-token-sources` · `DESIGN.md` · grayscale role

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것
- 다크에서 `canvas`와 `canvas-muted`가 동일 `grayscale-150` — 위계 분리가 필요하면 재조정

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/tokens.css` · `tokens/semantic.json`
- `src/lib/use-docs-theme.ts` · `src/components/color-semantic-palette.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
