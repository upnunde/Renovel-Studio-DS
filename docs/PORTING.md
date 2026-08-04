# 크로스플랫폼 전환 기준 (Web · iOS · Android)

이 DS를 iOS(SwiftUI)·Android(Jetpack Compose)로 옮길 때의 **정본 매핑 규칙**.
목표: **토큰은 하나에서 생성해 공유, 컴포넌트는 스펙을 보고 플랫폼별 구현.**

> 원칙 근거는 [DESIGN.md §2-5-1a](../DESIGN.md)(margin 금지 = 이식성 전제). 이 문서는 그 실행 지침이다.

---

## 0. 3-티어 정본 구조

```
tokens/primitives.json     ← Tier1 원시값 (색·px·duration). OS 중립.
tokens/semantic.json       ← Tier2 시맨틱 (light/dark = $value/$extensions.mode.dark). primitives 참조.
tokens/semantic-spacing.json, typography.json
        │
        ├─ 커스텀 빌더 (tokens/build.mjs)
        │    ├─ verify           → src/tokens.css 와 0-drift 검증 [웹: 현행 유지]
        │    ├─ swift            → iOS: DSColor(동적 light/dark) + DSSpacing/Radius/Typography
        │    └─ xml              → Android: res/values + values-night (colors) + dimens
        │
        └─ 표준 파이프라인 (Style Dictionary, tokens/sd-build.mjs)
             └─ tokens.light.css + tokens.dark.css  → sd-verify.mjs 로 tokens.css 와 0-drift 재확인

specs/*.spec.json          ← 컴포넌트 정본 29개 (축·치수·상태·토큰참조). OS 중립.
  _shared.spec.json          공유 조각(floatingSurface·disabledPresets·hitArea·nativeNotesGlobal)
        └─ 플랫폼 개발자가 읽어 SwiftUI/Compose 로 구현
```

**핵심 불변식:** `npm run tokens:check` 가 항상 통과여야 한다:
- 커스텀 빌더 0-drift (build.mjs verify)
- 스펙 참조 무결성 (모든 {ref} 실재 토큰)
- Style Dictionary 산출물 0-drift (sd-verify)

= JSON 정본과 웹 산출물(`src/tokens.css`)이 값 단위로 일치(커스텀·SD 양쪽) → 웹 소비자(리노벨) 영향 0.

**두 빌더를 병행하는 이유:** 커스텀 빌더는 0-drift 검증과 iOS 동적색·AOS values-night 같은 우리 전용 산출을 담당(우리 자산). Style Dictionary는 업계 표준이라 생태계 플러그인·다른 포맷 확장에 유리. 둘이 같은 JSON에서 동일 결과를 냄을 sd-verify가 보증하므로, 팀 선호에 따라 선택하거나 병용한다.

---

## 1. 토큰 매핑

### 1-1. 색 (color)
| | Web | iOS (SwiftUI) | Android (Compose) |
|---|---|---|---|
| 원시 | `--brand-500` | `DSColor.brand500` | `Brand500` |
| 시맨틱 | `--primary` | `DSColor.primary` | `Colors.primary` |
| 라이트/다크 | `:root` / `.dark` | `Color(light:dark:)` 또는 Asset Catalog Any/Dark | `lightColorScheme()` / `darkColorScheme()` |
| 알파 `/80` | `color-mix`/알파 | `.opacity(0.8)` | `.copy(alpha = 0.8f)` |

> 다크모드: semantic.json 의 `$extensions.mode.dark` 가 소스. 각 플랫폼 빌더가 2개 스킴을 만든다.

### 1-2. 치수 (dimension)
| | Web | iOS | Android |
|---|---|---|---|
| 단위 | `rem`(÷16) | `CGFloat`(pt, 원시 px 그대로) | `dp`(원시 px 그대로) |
| `--space-5`(20px) | `1.25rem` | `20` | `20.dp` |
| radius 12px | `0.75rem` | `12` | `12.dp` |
| stroke `0.5px` | `0.5px` | `0.5` (hairline은 `1/scale` 권장) | `0.5.dp` |

> px 원시값은 primitives.json 이 소스. rem 환산은 웹 빌더만, iOS/AOS 는 px=pt=dp 로 직결.

### 1-3. 타이포그래피
| | Web | iOS | Android |
|---|---|---|---|
| 단위 | `rem` | `pt` (UIFont/Font) | `sp` (TextStyle) |
| 합본 | `.text-body3_500` @utility | `Font.dsBody3Medium` | `Typography.body3Medium` |
| 구성 | size+lineHeight+weight 묶음 | `.font()`+`.lineSpacing()` | `TextStyle(fontSize, lineHeight, fontWeight)` |
| 폰트 | Pretendard Variable | 동일(번들) | 동일(번들) |

> lineHeight: 웹은 절대 px, iOS `lineSpacing`은 **행간 추가분**이라 `lineHeight - fontSize` 환산 필요. Compose `lineHeight`는 절대값이라 직결.

### 1-4. 모션
| | Web | iOS | Android |
|---|---|---|---|
| duration | `100/200/400ms` | `0.1/0.2/0.4s` | `100/200/400` (ms) |
| easing | `cubic-bezier(a,b,c,d)` | `UnitCurve`/`timingCurve(a,b,c,d)` | `CubicBezierEasing(a,b,c,d)` |

### 1-5. Elevation
| Web | iOS | Android |
|---|---|---|
| `box-shadow`(shadow-elevation-*) | `.shadow(color:radius:x:y:)` | `Modifier.shadow(elevation.dp)` 또는 커스텀 |
> shadow 파라미터는 semantic.json `shadow-elevation-*`. Compose 기본 elevation은 값이 다르니 커스텀 shadow 권장.

---

## 2. 컴포넌트 매핑

### 2-1. 원칙
- `specs/*.spec.json` 의 **axes·sizeSpec·styleSpec** 은 그대로 구현(기계적).
- `nativeNotes` 에 적힌 항목만 플랫폼 판단 필요.
- 자동 변환은 없다. **스펙 → 플랫폼 컴포넌트는 사람이 구현**하되, 디자인 결정은 스펙이 이미 내렸다.

### 2-2. 개념 대응
| 웹(shadcn) 개념 | iOS | Android |
|---|---|---|
| `variant`/`tone`/`size` props | init 파라미터/`enum` | 파라미터/`enum` |
| `hover` | (모바일 없음) → `pressed` 강조 | `pressed`/`hovered` indication |
| `focus-visible` ring | 시스템 focus/접근성 | `Modifier.focusable`+indication |
| `disabled` | `.disabled(true)`+opacity | `enabled=false`+alpha |
| `aria-expanded` | 트리거 open 상태 바인딩 | 동일 |
| `data-slot` | (불필요) | (불필요) |
| Portal(Dialog/Popover) | `.sheet`/`.popover`/`fullScreenCover` | `Dialog`/`Popup`/ModalBottomSheet |
| `asChild`(Slot) | ViewBuilder 합성 | composable slot 람다 |

### 2-3. margin (중요)
DESIGN.md §2-5-1a 대로 **컴포넌트는 margin 을 소유하지 않는다**. 형제 간격은 부모가:
| Web | iOS | Android |
|---|---|---|
| 부모 `gap-*` | `VStack/HStack(spacing:)` | `Arrangement.spacedBy()` |
| 허용된 `ml-auto` | `Spacer()` | `Modifier.weight(1f)`/`Spacer` |
| 음수 블리드 `-mx-5` | 부모 패딩 미적용 + 풀폭 | 동일 (음수 padding 금지) |
| 옵티컬 `-ml-0.5` | `.offset(x:)` | `Modifier.offset` |

---

## 3. 자동화 vs 수작업 경계 (정직하게)

| 자동/기계적 (스펙·토큰이 커버) | 플랫폼 수작업 (스펙 밖) |
|---|---|
| 색·간격·radius·타이포 값 | 스크롤 물리·제스처·햅틱 |
| variant×tone×size 조합·토큰 참조 | 접근성 라벨/트리(VoiceOver·TalkBack) |
| 상태별 스타일(rest/hover/focus/…) | 포커스 트랩·키보드 네비 (Dialog/Dropdown) |
| 단순 컴포넌트(Button/Badge/Chip/Input) ≈ 100% | 복합 컴포넌트(Dialog/Dropdown/Toast) 상호작용 로직 |

**규모감:** 단순 컴포넌트는 스펙만으로 거의 완성, 복합 컴포넌트일수록 네이티브 손질 비율↑.
실제 iOS/AOS 앱 착수 시점에 컴포넌트 우선순위대로 진행 — DS 프로젝트가 미리 다 만들 필요 없다.

---

## 4. 워크플로 (신규 플랫폼 붙일 때)

1. `npm run tokens:check` → 커스텀·SD 0-DRIFT + 스펙 무결성 확인 (정본 건강성)
2. `node tokens/build.mjs swift`(or `xml`) → 토큰 상수 생성, 앱에 편입 (iOS 동적색 / AOS values+values-night)
3. 다크/라이트 2스킴 배선 (semantic.json 의 mode 기준 — 빌더가 이미 분리 생성)
4. 컴포넌트: `specs/*.spec.json` 우선순위대로 구현. `_shared.spec.json`(floatingSurface 등) 먼저 구현하면 오버레이 5종 재사용. `nativeNotes` 항목만 플랫폼 판단
5. 시각 대조(스냅샷) — 웹 docs 사이트(localhost:3001)를 레퍼런스로

---

## 5. 하지 말 것

- ❌ React/Tailwind 컴포넌트를 "변환기"로 Swift/Kotlin 변환 시도 (구현체는 변환 대상 아님)
- ❌ 스펙에 없는 색·간격을 플랫폼에서 즉흥 결정 (토큰/스펙에 먼저 추가 후 생성)
- ❌ margin 으로 형제 간격 만들기 (§2-5-1a — gap/spacing 사용)
- ❌ 없는 토큰을 "있는 척" 참조 (ghost ref — 스케일에 없으면 px 원시값으로)
- ❌ `src/tokens.css` 를 손으로 수정 후 JSON 미반영 (verify 가 drift 로 잡지만, 정본은 JSON)
