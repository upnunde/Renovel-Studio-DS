# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-24  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Tabs line·text 2xl gap** — 24px(`gap-6`) → **20px(`gap-5`)**
- **스튜디오 Sync 실패** — `ProfileAccountTab` 인라인 SVG → DS `Icon` 교체 (이전 세션)

## 다음에 할 일

- Docs 예시 카드 2열·중앙 정렬 미커밋분 커밋 여부
- 리노벨 스튜디오에서 구 시맨틱 클래스(`bg-card`, rest `bg-muted`, `border-input` 등)를 새 이름으로 대체
- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것
- `bg-background`는 Surface. 앱 바닥은 `bg-canvas`만 (컴포넌트에 canvas 금지)

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/component-size-tokens.ts`
- `packages/design-system/specs/tabs.spec.json`
- `src/component-size-tokens.ts` · `src/lib/component-case-specs.ts`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
