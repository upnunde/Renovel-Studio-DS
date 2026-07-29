# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-29  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Radio / Checkbox** — size `default_h20`·`md_h24`, type `default`/`withText`, checked 상태, Playground 단일 컨트롤
- **Input** — `PasswordInput`(표시/숨김), `FileInput`(파일 아이콘·제거), 전 Input clear(✕) 기본
- **Button** — active 시 `translate-y` 눌림 모션 제거
- **Chip / tokens** — fill·outline·`inverse-muted` 등 (이전 세션 포함 미커밋분)

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 앱 `sync:ds` — 모노레포 main과 패키지 태그 배포 경로 정리

## 막힌 것 · 결정 필요

- 패키지 소비(`#v0.1.13`)는 루트 구조 변경 영향 가능 — 배포용 태그/브랜치 분리 검토

## 주요 파일 · 브랜치

- 브랜치: main
- `packages/design-system/src/components/ui/{radio-group,checkbox,input,password-input,file-input,button,chip}.tsx`
- `src/components/docs/playground-registry.tsx` · `component-case-specs.ts`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 팀 최신: `git fetch && git reset --hard origin/main && npm i && npm run dev`
