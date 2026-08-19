# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-19  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Toggle Group** — Figma Resizing형 세그먼트. 그룹이 size·shape, Toggle이 variant·tone
- **Toggle 선택** — `neutral` pressed를 `muted-strong`(아이콘색 유지). Playground에서 aria-label 컨트롤 숨김
- **Alert** — title on/off, icon+무제목 한 줄 레이아웃, size sm/md/lg, 상하 패딩 -4px
- **Dialog** — 헤더 중앙 정렬, `--dialog-max-width` 440px, 본문은 세미커스텀 슬롯
- **Input** — number 스피너 숨김. Label Playground `info 문구`를 Textarea로

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
- `src/lib/semantic-token-sources.ts` · `color-tokens.ts` · `playground-snippet.ts`
- `packages/design-system/src/components/ui/toggle.tsx` · `toggle-group.tsx` · `specs/toggle.spec.json` · `specs/toggle-group.spec.json`
- `packages/design-system/src/components/ui/button.tsx` · `specs/button.spec.json`
- `packages/design-system/src/components/ui/dialog.tsx`
- `packages/design-system/src/components/ui/avatar.tsx` · `specs/avatar.spec.json`
- `packages/design-system/src/components/ui/tooltip.tsx` · `specs/tooltip.spec.json`
- `src/components/docs/playground-registry.tsx` · `component-showcases.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
