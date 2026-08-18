# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-18  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **시맨틱 분류** — Background(`canvas`) / Surface(`background`) / Content(`foreground` 위계)로 문서·토큰 분리. 값은 유지, 이름·역할만 정렬
- **rest 면** — 컴포넌트 rest의 `bg-muted` → `bg-background-muted`. hover/focus의 `bg-muted`는 유지
- **`--input` 제거** — Border 위계로 통합. 컴포넌트는 `border-border-emphasis`. `--input`은 alias만
- **Content** — `text-background-muted-foreground` 등 면-짝 글자를 `text-foreground`로 정리. Hover·Inverse·Primary 페어는 유지
- Color Semantic 문서·`DESIGN.md` §2-1·§2-2·패키지 UI·docs 쇼케이스 동기화

## 다음에 할 일

- 리노벨 스튜디오에서 구 시맨틱 클래스(`bg-card`, rest `bg-muted`, `border-input` 등)를 새 이름으로 대체
- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것
- `bg-background`는 Surface. 앱 바닥은 `bg-canvas`만 (컴포넌트에 canvas 금지)

## 주요 파일 · 브랜치

- 브랜치: `main`
- `packages/design-system/src/tokens.css` · `tokens/semantic.json` · `theme.css`
- `packages/design-system/src/components/ui/*`
- `src/lib/color-tokens.ts` · `DESIGN.md` §2-1·§2-2

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
