# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-17  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **네이밍 컨벤션** — `DESIGN.md §3-5` · `.cursor/rules/naming-conventions.mdc` · Playground key/`formatSpecPropertyName` 정규화
- **간격 소유권** — `DESIGN.md §2-5-1` (L1 padding / L2 부모 gap / L3 시맨틱) · docs `fieldStack` gap 통일
- **Alert `type="icon"`** — flex가 grid를 덮던 문제 수정 · `.alert-layout-icon` (1행 아이콘+제목 · 2행 설명)
- **아이콘 버튼 정사각** — `size`에 `w-*`+`aspect-square` · ButtonGroup `w-fit`이 `size-*`를 덮지 않도록 수정
- **Playground·Examples** — Button/Label/Dialog 등 컨트롤·쇼케이스·스펙 정리 · Line(구 UI) 시맨틱 색 이름

## 다음에 할 일

- Docs 예시 잔여 margin → parent gap 정리 (선택)
- `src/components/ui/progress.tsx` 패키지와 동기화 확인 (선택)
- `main` ↔ `origin/main` diverged 해소 후 원격 동기화

## 막힌 것 · 결정 필요

- `main` ↔ `origin/main` diverged (로컬 ahead · 원격 behind) — push 시 rebase/merge 필요할 수 있음

## 주요 파일 · 브랜치

- 브랜치: main
- 원격: `origin` → upnunde/Renovel-Studio-DS
- 관련 경로:
  - `packages/design-system/src/components/ui/alert.tsx` · `alert.css`
  - `packages/design-system/src/components/ui/button.tsx` · `button-group.tsx`
  - `DESIGN.md` · `.cursor/rules/naming-conventions.mdc`
  - `src/components/docs/playground-registry.tsx`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 소비: `github:upnunde/Renovel-Studio-DS#v0.1.11`
