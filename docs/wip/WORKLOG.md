# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-07-27  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- **Docs Overview 분리** — `/foundation` · `/components` Overview, Elevation 페이지, Card 제거, Tooltip mode 등
- **원격 main** — 모노레포(문서 사이트)로 force-with-lease 반영 · 팀이 `origin/main`으로 최신 화면 확인
- **깃푸시 규칙** — 「깃푸시」= 원격 main을 로컬 최신으로 맞춤 (`.cursor/rules/git-push.mdc`) · README에 팀 확인 절차

## 다음에 할 일

- Docs 셸을 `space.layout.*`에 맞출지 여부 결정
- 앱 `sync:ds` — 모노레포 main과 패키지 태그 배포 경로 정리

## 막힌 것 · 결정 필요

- 패키지 소비(`#v0.1.13`)는 루트 구조 변경 영향 가능 — 배포용 태그/브랜치 분리 검토

## 주요 파일 · 브랜치

- 브랜치: main (= origin/main 정본)
- 원격: `origin` → upnunde/Renovel-Studio-DS
- 관련 경로: `README.md` · `.cursor/rules/git-push.mdc`

## 메모

- 개발: `npm run dev` → http://localhost:3001
- 팀 최신: `git fetch && git reset --hard origin/main && npm i && npm run dev`
