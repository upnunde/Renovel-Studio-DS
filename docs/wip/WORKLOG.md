# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-20  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **개발서버** — `npm run dev` (localhost:3001)
- **Data Table Spacing Rules 검토** — Spacing Semantic(L3) 부적합 · Table L1 스펙으로 분류 → **적용하지 않기로 결정**
- **핸드오프** — Cursor 세션 요청·Git 상태 스냅샷 갱신
- **시맨틱 Spacing 정책** — `DESIGN.md` §2-5-2 소비 앱 공통 사용 규칙 · `tokens.css` alias TS 동기화
- **릴리스 v0.1.12** — spacing 시맨틱 출시 · `docs/SPACING_SEMANTIC.md` · 패키지 태그 (앱 `sync:ds` 대상)

## 다음에 할 일

- 앱에서 `v0.1.12` sync:ds / alias 연결 확인
- Docs 예시 잔여 margin → parent gap 정리 (선택)
- `src/components/ui/progress.tsx` 패키지와 동기화 확인 (선택)
- 로컬 monorepo `main` ↔ 패키지 루트 `origin/main` diverged 정리 전략 결정
- 로컬 `" 2"` 중복 파일 정리 여부 결정

## 막힌 것 · 결정 필요

- 로컬 Design System Test(monorepo)와 `Renovel-Studio-DS`(패키지 루트) 히스토리가 diverged — 릴리스는 `origin/main` 위에 패키지 파일만 올림

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
- 소비: `github:upnunde/Renovel-Studio-DS#v0.1.12`
