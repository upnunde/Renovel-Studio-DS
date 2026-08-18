# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-18  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **시맨틱 분류** — Background(`canvas`) / Surface(`background`) / Content(`foreground` 위계)로 문서·토큰 분리. 값은 유지, 이름·역할만 정렬
- **윤곽 rest** — outline·보더 컨트롤 면을 `bg-transparent`로 통일. 다크 `{border-emphasis}/30` 채움 제거 (Chip/Input/Select/Textarea/Checkbox/Radio/Tabs default)
- Color Semantic ShowcaseBlock 헤더 보조설명 삭제. 역할은 표 Role 컬럼만 유지

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
- `packages/design-system/src/components/ui/{button,badge,chip,input,select,textarea,checkbox,radio-group,tabs}.tsx`
- `DESIGN.md` rest 면 원칙 · `src/lib/color-tokens.ts` · `showcase-block.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
