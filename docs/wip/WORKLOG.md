# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-03  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Tabs line/text gap 통일** — list gap을 text 기준으로 공유하고, line 투명 border를 제거해 체감 간격 맞춤
- **Tabs line/text 타이포** — 비활성·활성 모두 font-weight 700으로 통일 (색만 구분)
- **컨트롤 size `lg_h42` 제거** — Button/Input/Select/Toggle/Tabs/ButtonGroup과 토큰·쇼케이스·DESIGN.md에서 42px 단계 삭제 (스케일 5단계)

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/src/component-size-tokens.ts`
- `packages/design-system/src/components/ui/{button,button-group,input,select,toggle,tabs}.tsx`
- `DESIGN.md`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
