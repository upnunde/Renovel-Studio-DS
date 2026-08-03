# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-03  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Color Semantic 문서** — Preview를 프레임(배경) 스와치로 통일, M3 표기 컬럼·Surface/On Surface 분류, 카테고리 좌측 보더 wrapper 제거
- **DESIGN.md** — 코드=shadcn / 표기=M3 이원 원칙·매핑표 정리
- **Typography Token 표기** — `heading1_32_700` 형식만 표시하도록 단순화
- **ShowcaseBlock 제목** — `text-body1_700` 적용

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `src/lib/color-tokens.ts` · `src/components/color-semantic-palette.tsx`
- `DESIGN.md` · `packages/design-system/src/typography-display.ts`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
