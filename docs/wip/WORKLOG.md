# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-27  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Docs Overview 분리** — `/foundation` · `/components` Overview, `/` → foundation 리다이렉트, 사이드바 Overview 링크
- **Elevation foundation** — `/foundation/elevation` · `elevation-tokens.ts` · Overview 카드
- **Card 제거** — docs·패키지 `card` 컴포넌트 삭제 (`--card` 색 토큰은 유지)
- **Alert padding** — `p-(--space-4)` (16px)
- **Tooltip playground** — delay 제거 → mode(`호버`/`X로 닫기`), open pin 유지(모드 전환 리마운트로 안 꺼지게)
- **레이아웃 overflow** — docs 셸 `fixed inset-0` · scroller `min-w-0`/`overflow-x-clip`
- **Spacing Semantic Layout** — 실제 사용처는 `upnunde-test` `page-layout.ts` (이 docs 앱은 미적용) 확인

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- `origin/main` diverged(ahead 22 / behind 12) 정리 전략 결정
- 앱 `sync:ds` / 패키지 버전 bump 여부

## 막힌 것 · 결정 필요

- 로컬 Design System Test(monorepo)와 `Renovel-Studio-DS`(`origin/main`) 히스토리 diverged

## 주요 파일 · 브랜치

- 브랜치: main
- 원격: `origin` → upnunde/Renovel-Studio-DS
- 관련 경로:
  - `src/components/docs/foundation-overview.tsx` · `components-overview.tsx`
  - `packages/design-system/src/elevation-tokens.ts`
  - `src/components/docs/playground-registry.tsx` (tooltip)
  - `docs/wip/SPACING_MIGRATION.md`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 소비: `github:upnunde/Renovel-Studio-DS#v0.1.12`
