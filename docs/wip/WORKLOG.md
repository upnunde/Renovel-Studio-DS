# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-18  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Button 시각 높이** — 솔리드가 `bg-clip-padding`+투명 보더 때문에 outline보다 2px 작아 보이던 문제 수정. 채움은 border-box, outline만 padding-box
- **Dialog z-index** — `z-50` → overlay `z-overlay`(300), content `z-modal`(400). 앱 sticky/overlay 위로, 토스트만 위
- **Grayscale token** — `grayscale-5`(`#FCFCFF`) 원시 토큰 추가, 그레이스케일 스케일 16단계로 확장
- **Hover semantic** — `muted-low` / `muted-low-foreground` 저강도 hover 토큰 추가, 기본 `hover`(`muted`)는 `grayscale-15`로 조정
- **Dialog title** — `DialogTitle` 타이포를 `text-heading4_700`으로 상향
- **Playground Code** — 복사 시 `design-system/ui/*` import가 붙는 스튜디오 붙여넣기용 스니펫(`playground-snippet.ts`) 적용
- **Dialog Playground** — description 컨트롤 Textarea 전환, 설명 줄바꿈(`whitespace-pre-line`) 지원
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
- `src/lib/semantic-token-sources.ts` · `color-tokens.ts` · `playground-snippet.ts`
- `packages/design-system/src/components/ui/button.tsx` · `specs/button.spec.json`
- `packages/design-system/src/components/ui/dialog.tsx`
- `packages/design-system/src/components/ui/avatar.tsx` · `specs/avatar.spec.json`
- `packages/design-system/src/components/ui/tooltip.tsx` · `specs/tooltip.spec.json`
- `src/components/docs/playground-registry.tsx` · `component-showcases.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
