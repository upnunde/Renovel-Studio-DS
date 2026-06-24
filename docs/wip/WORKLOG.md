# 작업 일지 (WORKLOG)

> 마지막 갱신: 2026-06-24  
> 다음 세션: Cursor에서 `@docs/wip/WORKLOG.md` 를 붙이고 「이어서」라고 하면 됩니다.

## 오늘 한 일

- `packages/design-system/` npm 워크스페이스 패키지 — 토큰·타이포·간격·radius·아이콘·컴포넌트 사이즈 정의
- shadcn/ui (`base-nova`) 컴포넌트 다수 추가 및 Pretendard·다크모드·시맨틱 토큰 연동
- `(docs)` 문서 사이트 — Foundation(색·타이포·간격·radius·아이콘) + Components 카테고리·슬러그 상세·플레이그라운드
- `DocsPageHeader` 설명 문단 간격 조정 (`mt-2`, `pt-0.5` 제거)
- Cursor 에이전트 규칙·WORKLOG·snapshot 스크립트 부트스트랩

## 다음에 할 일

- 브랜드 토큰(색·타이포) 추가 커스터마이즈 — `packages/design-system/src/tokens.css`
- npm 패키지명 확정 (`@scope/design-system`) 및 UI 컴포넌트 패키지 이전
- Figma 연동 (필요 시)

## 막힌 것 · 결정 필요

-

## 주요 파일 · 브랜치

- 브랜치: main
- 관련 경로:
  - `src/app/(docs)/` — 문서 사이트 라우트·레이아웃
  - `src/components/docs/` — 플레이그라운드·쇼케이스·Foundation UI
  - `src/components/ui/` — shadcn/ui 컴포넌트
  - `packages/design-system/` — 배포용 토큰·유틸 패키지
  - `.cursor/rules/` — 에이전트 규칙

## 메모

- 개발: `npm run dev` → http://localhost:3001
