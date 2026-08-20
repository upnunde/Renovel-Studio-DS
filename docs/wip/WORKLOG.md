# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-20  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **타이포 600** — heading/body/caption 전 스케일에 semibold 합본 추가 (27→38 토큰)
- **FieldLabel weight** — 500/600/700만 유지 (400 삭제), Playground·쇼케이스 반영
- **FieldLabel ↔ Input 간격** — 전 size 공통 8px(`gap-2`). sm→Input sm, default→default, lg→Input xl
- **cn/twMerge** — 합본 타이포가 `font-medium`·`leading-*`와 충돌해 두께가 무시되던 문제 수정

## 다음에 할 일

- 리노벨 스튜디오에서 구 시맨틱 클래스(`bg-card`, rest `bg-muted`, `border-input` 등)를 새 이름으로 대체
- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것
- `bg-background`는 Surface. 앱 바닥은 `bg-canvas`만 (컴포넌트에 canvas 금지)
- 윤곽 rest는 Surface가 아님 (`bg-transparent`)

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/typography-tokens.ts` · `typography.css` · `tokens/typography.json`
- `packages/design-system/src/components/ui/field-label.tsx` · `input.tsx` · `lib/utils.ts`
- `packages/design-system/specs/field-label.spec.json` · `input.spec.json`
- `DESIGN.md` · `packages/design-system/docs/SPACING_SEMANTIC.md`
- `src/components/docs/playground-registry.tsx` · `component-showcases.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
