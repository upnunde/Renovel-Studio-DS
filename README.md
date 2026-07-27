# Renovel Studio Design System (Docs)

디자인 시스템 **토큰·컴포넌트 문서/쇼케이스** 모노레포입니다.  
패키지 코드는 `packages/design-system/`에 있습니다.

## 최신 화면 확인 (팀)

```bash
git fetch origin
git checkout main
git reset --hard origin/main   # 원격 main = 팀이 보는 최신본
npm install
npm run dev
```

브라우저: **http://localhost:3001**

> `git pull`이 거절되면 히스토리가 갱신된 경우입니다. 위 `reset --hard`로 맞추면 됩니다.

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 문서 사이트 (포트 **3001**) |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |

## 구조

| 경로 | 역할 |
|------|------|
| `packages/design-system/` | 배포용 DS 패키지 |
| `src/` | Next.js 문서·플레이그라운드 |
| `DESIGN.md` | 디자인 규칙 정본 |
