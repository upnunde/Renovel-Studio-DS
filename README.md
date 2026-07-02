# Renovel Studio Design System

shadcn/ui(Base UI) 기반 **Renovel Studio** 디자인 시스템 npm 패키지입니다.  
시맨틱 토큰(CSS), 타이포·스페이싱 유틸, UI 컴포넌트를 제공합니다.

## 설치

`package.json`에 GitHub 의존성을 추가합니다.

```json
{
  "dependencies": {
    "design-system": "github:upnunde/Renovel-Studio-DS#main"
  }
}
```

특정 버전(태그)을 고정하려면:

```json
"design-system": "github:upnunde/Renovel-Studio-DS#v0.1.4"
```

```bash
npm install
```

## Peer dependencies

소비 앱에 다음 패키지가 필요합니다.

- `react`, `react-dom` (^19)
- `@base-ui/react` (^1)
- `lucide-react` (^1)
- `sonner` (^2)

## Next.js 설정 예시

### 1. 패키지 트랜스파일

`next.config.ts`:

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["design-system"],
}

export default nextConfig
```

### 2. CSS 토큰 import

`app/globals.css` (또는 루트 CSS):

```css
@import "design-system/fonts.css";
@import "design-system/tokens.css";
@import "design-system/theme.css";
@import "design-system/typography.css";
```

### 3. 컴포넌트 import

```tsx
import { Button } from "design-system/ui/button"
import { cn } from "design-system/utils"
```

## 주요 export

| 경로 | 설명 |
|------|------|
| `design-system/tokens.css` | 시맨틱·원시 컬러 토큰 정본 |
| `design-system/theme.css` | Tailwind v4 `@theme` 매핑 |
| `design-system/ui/*` | UI 컴포넌트 |
| `design-system/utils` | `cn()` 유틸 |
| `design-system/component-size-tokens` | 버튼·폼·아바타 사이즈 API |

## 버전

현재 버전: **0.1.6** (`v0.1.6` 태그)

## 라이선스

Private / 내부 프로젝트용 — 배포 정책은 저장소 소유자에게 문의하세요.
