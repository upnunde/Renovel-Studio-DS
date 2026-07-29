# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-29  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Radio / Checkbox / Input** — size·Password/File/clear 등 (main 커밋 `30fb0c8`)
- **스튜디오 자동 감지** — `npm run ds:release` + 깃푸시 규칙 6단계 (태그 릴리스 → sync)
  - 원인: 스튜디오는 `#v*.*.*` 핀, monorepo main 푸시만으로는 미감지

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정

## 막힌 것 · 결정 필요

- 패키지 소비는 **릴리스 태그** 경로 — docs `main`과 혼동하지 말 것

## 주요 파일 · 브랜치

- 브랜치: main
- `scripts/ds-release.mjs` · `.cursor/rules/git-push.mdc` · `.github/workflows/notify-upnunde-test.yml`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 패키지 릴리스+스튜디오: `npm run ds:release`
- 팀 docs: `git fetch && git reset --hard origin/main && npm i && npm run dev`
