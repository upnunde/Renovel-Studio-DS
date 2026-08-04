# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-08-04  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **크로스플랫폼 토큰 정본** — `tokens/*.json` + 커스텀/Style Dictionary 빌더·verify (`0-DRIFT`)
- **컴포넌트 스펙 29개** — `packages/design-system/specs/*.spec.json`
- **PORTING.md · DESIGN.md** — Web/iOS/Android 이식 기준, margin 금지 원칙(§2-5-1a)
- **스튜디오** — DS `size="lg"` 제거에 맞춰 `xl`/`icon-xl` 교체 푸시 완료 (`upnunde-test`)

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 스펙 `nativeNotes` FLAG(shadow·z-index) 웹 코드 정렬 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/tokens/` · `packages/design-system/specs/`
- `docs/PORTING.md` · `DESIGN.md`

## 메모

- 검증: `cd packages/design-system && npm run tokens:check`
- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
