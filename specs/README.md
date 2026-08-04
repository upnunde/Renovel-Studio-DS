# 컴포넌트 스펙 (OS-중립 정본)

컴포넌트를 **코드가 아니라 데이터**로 기술한 정본. 어느 OS에도 속하지 않는다.
각 플랫폼(Web/React, iOS/SwiftUI, Android/Compose)은 이 스펙을 읽어 자기 코드로 **구현**한다.

## 왜

- `button.tsx`는 React+Tailwind 구현체다. SwiftUI `View`·Compose `@Composable`로 **자동 변환되지 않는다**.
- 하지만 컴포넌트의 8~9할은 **선언적 데이터**다 — variant·size·상태·각 조합이 쓰는 **토큰 참조**. 이걸 JSON으로 못박으면 플랫폼 구현이 거의 기계적이 된다.
- 나머지 1~2할(네이티브 동작·복합 상호작용)은 각 플랫폼 개발자 몫. 스펙의 `nativeNotes`가 그 경계를 명시한다.

## 스키마

```jsonc
{
  "name": "Button",
  "slot": "button",                 // data-slot / 접근성 role 기준
  "axes": {                         // 공개 API 축 (shadcn props)
    "variant": ["default", "secondary", "outline", "ghost", "link"],
    "tone": ["neutral", "brand", "success", "warning", "destructive"],
    "size": ["xs", "sm", "default", "xl", "2xl", "icon-*"],
    "shape": ["square", "circle"]
  },
  "defaults": { "variant": "default", "tone": "neutral", ... },
  "deprecatedAliases": [ ... ],     // 하위호환 매핑 (변환 규칙)
  "sizeSpec": {                     // 축값 → 치수 (모두 토큰 참조 또는 px)
    "default": { "height": 36, "padX": "{space.2-5}", "gap": "{space.1-5}", "iconGlyph": "md" }
  },
  "styleSpec": {                    // (variant × tone) → 상태별 토큰 매핑
    "default/brand": {
      "rest":  { "bg": "{primary}", "fg": "{primary-foreground}" },
      "hover": { "bg": "{primary}/80" },
      "focus": { "ring": "{ring}/50", "border": "{ring}" },
      "disabled": "$shared.disabledInteractive"
    }
  },
  "states": ["rest", "hover", "focus", "pressed", "disabled", "invalid"],
  "nativeNotes": {                  // 플랫폼별 손질 경계 (자동화 밖)
    "hover": "모바일 hover 없음 → iOS/AOS는 pressed/highlighted로 매핑",
    ...
  }
}
```

### 토큰 참조 표기
- `{primary}` → 시맨틱 토큰 `--primary` (semantic.json). 각 플랫폼 빌더가 자기 토큰 상수로 해석.
- `{primary}/80` → primary를 80% 불투명도. CSS `color-mix`/알파, iOS `.opacity(0.8)`, Compose `.copy(alpha=0.8f)`.
- `{space.2-5}` → 원시 spacing (primitives.json).
- 숫자(예: `height: 36`)는 px 원시값 — CSS rem, iOS pt, AOS dp.

### 상태(state) 표준
`rest · hover · focus · pressed · disabled · invalid`. 웹 전용 개념(hover)은 `nativeNotes`에서 플랫폼 매핑을 명시한다.

## 자동화 vs 수작업 경계

| 스펙이 담는 것 (자동 이식) | 스펙 밖 (플랫폼 수작업) |
|---|---|
| variant·tone·size 조합 | 스크롤 물리·제스처·햅틱 |
| 각 조합의 토큰 참조 | 접근성 트리(VoiceOver/TalkBack 라벨) |
| 치수(height·pad·gap·radius) | 포커스 트랩·키보드 네비 (복합 컴포넌트) |
| 상태별 스타일 | 포털/프레젠테이션 (Dialog/Popover) |

## 상태

- ✅ `button.spec.json` — 대표 스펙 (완성형 레퍼런스)
- ⬜ 나머지 27개 — 동일 스키마로 확장. 실제 iOS/AOS 앱 착수 시점에 우선순위대로.

정본 값 출처: `../src/components/ui/*.tsx`(CVA), `../src/component-size-tokens.ts`, `../tokens/*.json`.
