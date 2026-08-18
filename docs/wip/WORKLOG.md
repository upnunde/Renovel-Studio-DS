# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-18  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Grayscale token** — `grayscale-5`(`#FCFCFF`) 원시 토큰 추가, 그레이스케일 스케일 16단계로 확장
- **Hover semantic** — 기존 `hover`/`hover variant` 매핑은 유지하고, `muted-low` / `muted-low-foreground` 저강도 hover 토큰 추가
- **Avatar image** — 이미지 타입에만 `black-opacity-10` inset dim 고정. 모드 전환 영향 없이 유지
- **Tooltip** — ✕는 `removable`일 때만 노출. `open`은 상시 노출, 미지정은 hover(removable이면 클릭). 바깥 클릭으로 안 닫힘
- **윤곽 rest** — outline·보더 컨트롤 면을 `bg-transparent`로 통일
- Color Semantic ShowcaseBlock 헤더 보조설명 삭제

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
- `packages/design-system/tokens/primitives.json` · `semantic.json`
- `packages/design-system/src/tokens.css` · `theme.css`
- `src/lib/semantic-token-sources.ts` · `color-tokens.ts`
- `packages/design-system/src/components/ui/avatar.tsx` · `specs/avatar.spec.json`
- `packages/design-system/src/components/ui/tooltip.tsx` · `specs/tooltip.spec.json`
- `src/components/docs/playground-registry.tsx` · `component-showcases.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
