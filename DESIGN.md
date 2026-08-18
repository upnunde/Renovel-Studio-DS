# Design System — 정본 문서

이 디자인 시스템(`packages/design-system`)의 철학·원칙·토큰 컨벤션·소비 패턴을 한 곳에 정리한 문서. 코드 정본은 `packages/design-system/src/` 안의 파일, 시각 정본은 docs 사이트(http://localhost:3001).

---

## 1. 디자인 철학

### 1-1. shadcn/ui 절대 기준

shadcn/ui (`base-nova`)의 구조를 **절대 깨지 않는다**. 그 안에서 응용·변형만 한다.

**왜:** shadcn 구조는 AI(LLM) 협업에 최적화되어 있다. 컴포넌트 위치·props 패턴·variant 네이밍이 AI가 잘 이해하고 생성할 수 있는 형태라서 이 구조를 유지하면 새로운 컴포넌트·variant 추가가 일관되게 진행된다.

**하지 않는 것:**
- shadcn 디렉토리 구조 변경
- `variant`/`size`/`asChild` 같은 props 네이밍 변경
- shadcn 컴포넌트를 다른 추상화로 대체
- shadcn에 없는 새 패러다임 도입
- **코드 레이어**(CSS 변수·토큰명·클래스·props)에 Material 용어 신설 — 예: `--on-surface`, `bg-on-surface` 같은 CSS 변수·클래스는 만들지 않는다. 실제 토큰명은 shadcn 유전자 유지 (`--background`, `--card`, `bg-muted` 등)

**하는 것:**
- shadcn 컴포넌트 내부 구현 수정·확장 (스타일, variant 추가, props 추가)
- 새 variant·새 size 토큰을 shadcn 패턴에 맞춰 추가
- shadcn 위에 복합 패턴(FormField, PageHeader 등) 구성
- Material Design 이론을 **토큰·스타일 레이어에서만** 차용 (컴포넌트 API에는 노출 안 함)
- **문서·팔레트 표기 기준을 Material 3 역할명으로** 제시 — 작업자·디자이너의 인지 기준은 M3(예: `--background`=Surface, `--canvas`=Background). 코드는 shadcn, 표기는 M3. 상세는 §1-2.

### 1-2. Material Design 부분 차용

Material Design 3의 이론적 토대를 **선택적으로** 흡수한다.

**명명 이원 원칙 — 코드는 shadcn, 표기는 M3.**

| 레이어 | 기준 | 예 |
|--------|------|-----|
| **코드** (CSS 변수·Tailwind 클래스·props) | shadcn 유전자 유지 | `--background`, `bg-card`, `text-muted-foreground` |
| **문서·팔레트 표기** (작업자·디자이너 인지 기준) | **Material 3 역할명** | Surface, Surface Container High, On Surface Variant |

**왜:** shadcn 토큰명(`background`/`card`/`muted`)은 "면의 역할"이 이름만으로 드러나지 않아 작업자가 혼동한다(예: `canvas` vs `background` 중 무엇이 더 바닥인가). M3 역할 어휘(Background < Surface < Surface Container …)는 위계·용도가 명시적이다. 그래서 **코드의 shadcn 유전자는 그대로 두고**, 사람이 읽는 표기 기준만 M3로 통일한다. 색상 시맨틱 문서(`/foundation/color-semantic`)의 **Token name** 컬럼이 이 매핑의 정본이다.

| M3 개념 | 적용 | 코드 토큰(shadcn) |
|---------|------|------|
| Background | ✓ | `--canvas` |
| Background Container | ✓ | `--canvas-muted` (라이트 grayscale-15 · 다크 grayscale-150) |
| Surface | ✓ | `--background` (`--card`/`--popover` alias — 깊이는 `shadow-elevation-*`) |
| Surface Container | ✓ | `--background-muted` (`--card-muted` alias) |
| On Surface (Content 위계) | ✓ | `--foreground` / `--foreground-muted` / `--foreground-placeholder` — Background·Surface 공통. 면과 1:1 아님 |
| Hover / On Hover | ✓ | `--muted` / `--muted-foreground` |
| Hover variant / On Hover variant | ✓ | `--muted-strong` / `--muted-strong-foreground` |
| Secondary / On Secondary | ✓ | `--secondary` / `--secondary-foreground` (`background-muted` alias — rest 면, hover 아님) |
| Inverse Surface (+ Container) | ✓ | `--inverse` / `--inverse-muted` + `On Inverse Surface` = `--inverse-foreground` 등 |
| Primary / On Primary (+ Container) | ✓ | `--primary` / `--primary-foreground` / `--primary-container` |
| Focus Ring | ✓ | `--ring` (primary 값, 포커스 인디케이터) |
| Secondary Container (하이라이트) | ✓ | `--accent` (브랜드 틴트) |
| Error (+ Container) | ✓ | `--destructive` (+ `-container`) |
| Outline (기본·Emphasis·Medium·Strong·Inverse) | ✓ | `--border` / `--border-emphasis` / `--border-medium` / `--border-strong` / `--border-inverse` |
| Outline Variant (+ Strong) | ✓ | `--divider` / `--divider-strong` |
| Disabled Surface · On Disabled Surface · Disabled Outline | ✓ | `--disabled` / `--disabled-foreground` / `--disabled-border` |
| Scrim (10·20·30·40) | ✓ | `--dim-10/20/30/40` |
| Elevation 6단계 | ✓ | `shadow-elevation-10` ~ `-60` |
| Motion easing 곡선 | ✓ | M3 cubic-bezier 값 그대로 |
| Motion duration | △ | 3단계만 (short/medium/long) |
| State layer 토큰 | ✗ | 미적용 (컴포넌트 내부 처리) |
| Typography 5-tier | ✗ | heading/body/caption 3-tier (한국 앱 컨벤션) |

> **모든 M3 표기 라벨은 문서 전체에서 고유하다** — 같은 M3 역할을 여러 토큰이 공유하더라도(예: 중립 텍스트는 M3상 전부 On Surface), 표기는 면별·위계별로 세분(`On Surface Container High`, `On Surface Muted` 등)해 표에서 같은 이름이 반복되지 않게 한다. 사용자가 행을 이름만으로 구분할 수 있어야 하기 때문.
> M3에 대응 역할이 없는 토큰(예: `chart-1~5`)은 표기도 shadcn stem을 그대로 쓴다.

---

## 2. 토큰 컨벤션

### 2-1. 페어 패턴 (shadcn 표준)

모든 surface 토큰은 `{role}` + `{role}-foreground` 페어로 정의·사용한다.

```css
--background          /* — */
--canvas-muted        / --canvas-muted-foreground
--card                / --card-foreground
--popover             / --popover-foreground
--primary             / --primary-foreground
--primary-container   / --primary-container-foreground
--secondary           / --secondary-foreground
--secondary-container / --secondary-container-foreground
--destructive         / --destructive-foreground
--destructive-container / --destructive-container-foreground
--muted               / --muted-foreground
--accent              / --accent-foreground
--inverse             / --inverse-foreground
--inverse-muted       / --inverse-muted-foreground
--success             / --success-foreground
--warning             / --warning-foreground
--info                / --info-foreground
--disabled            / --disabled-foreground
```

**유채색·반전·호버 면의 `{role}-foreground` 는 짝 `{role}` 안에서만 사용한다.** (`primary`/`inverse`/`accent`/`muted`/`disabled` 등). 단독으로 "흐린 텍스트" 용도로 쓰지 않는다.

**중립 Background·Surface는 예외다.** `--canvas` / `--background` / `--background-muted` 위에 올리는 글자·아이콘은 Content 위계(`--foreground` / `--foreground-muted` / `--foreground-placeholder`)를 상황에 따라 고른다. 면마다 전용 On-color를 강제하지 않는다. `--canvas-muted-foreground` · `--background-muted-foreground` 는 `--foreground` 계열 alias이며, 새 작업은 Content 토큰을 쓴다.

### 2-1a. Action · Interaction 역할

shadcn 호환 이름을 유지하되, 문서·컴포넌트에서는 **역할**로 구분한다.

| 카테고리 | 토큰 | 역할 |
|----------|------|------|
| **Action · Primary** | `primary` / `primary-foreground` | 주 액션 면 (filled CTA) |
| **Interaction · Highlight · Brand** | `accent` / `accent-foreground` | 브랜드 톤 자체의 강조 — 선택 상태 전용(Toggle `aria-pressed`). **tone="neutral" 호버에는 쓰지 않는다** |
| **Hover** | `muted` / `muted-foreground` | hover / on hover — rest가 Surface일 때의 호버 (Tabs, Select, Dropdown, Toggle, **Button** outline/ghost(neutral)) |
| **Hover variant** | `muted-strong` / `muted-strong-foreground` | hover variant — rest가 Surface Container라 현재 hover와 원시값이 같아 상태가 안 보일 때 (**Button** secondary(neutral), Chip fill, Badge secondary) |

**호버 원칙 (필수):** `tone="neutral"`(또는 톤 구분이 없는 컴포넌트)은 **절대 브랜드색(`accent`/`primary`)으로 호버하지 않는다.** 브랜드·상태 톤이 `tone="brand"`/`"success"`/`"warning"`/`"destructive"` 등으로 **명시된 경우에만** 그 색 자체의 틴트(`/80`, `/10` 등)로 호버한다. hover는 항상 `muted`(rest가 Surface) 또는 `muted-strong`(rest가 Surface Container이고 hover와 값이 같을 때) 중 하나다.

**rest 면 원칙 (필수):** `--muted` / `bg-muted`는 **호버·포커스·열림·키보드 하이라이트**에만 쓴다. 기본 면(rest)에는 Surface 패밀리만 쓴다 (`bg-background`, `bg-background-muted`). 값이 같아도 역할을 섞지 않는다. Surface 2단으로 해결되면 3번째 Surface를 만들지 않는다.

**윤곽(outline) rest는 Surface가 아니다.** `variant="outline"`과 보더만 있는 컨트롤(Input·Select·Textarea·Checkbox·Radio, Tabs default rest)은 `bg-transparent`다. 다크에서도 `{border-emphasis}/30`으로 면을 올리지 않는다.

**호버 매핑 (컴포넌트 CVA):**

| 톤 | 호버 토큰 | 예 |
|------|-----------|-----|
| hover · rest가 Surface | `muted` | Tabs, Select, Dropdown, Toggle, **Button** outline/ghost(neutral) |
| hover variant · rest가 Surface Container (값 = hover) | `muted-strong` | **Button** secondary(neutral), Chip fill, Badge secondary |
| neutral · 채움 면(강한 대비) | `primary/80`, `inverse-muted/80` | Button default(neutral), Chip pressed |
| brand 선택 상태(호버 아님) | `accent` | Toggle `aria-pressed` |
| brand tone | `primary/10`, `primary-container/80` | Button */brand |
| status tone(success/warning/destructive) | `{status}/10`~`/30` | `*`/status variant |

`--hover` 별도 토큰은 없다. 위 원칙에 따라 variant·tone별로 선택한다.

### 2-1c. 시맨틱 alias (중복 제거)

동일 원시값·역할이 겹치는 토큰은 `tokens.css`에서 **alias**로 단일 원천을 가리킨다. **컴포넌트는 Color Semantic에 있는 클래스만 쓴다.** `bg-card`/`bg-popover`/`bg-secondary` 등 shadcn 이름은 CSS에만 남겨 호환한다.

| Alias | 가리키는 토큰 | 비고 |
|-------|---------------|------|
| `secondary` (면) | `background-muted` | 컴포넌트는 `bg-background-muted` + `text-foreground` (hover 토큰 아님) |
| `card` | `background` | 컴포넌트는 `bg-background` |
| `card-foreground` | `foreground` | |
| `card-muted` | `background-muted` | 카드·페이지 보조 면 통일 |
| `popover` | `card` → `background` | 컴포넌트는 `bg-background` · 깊이는 elevation |
| `foreground-disabled` | `disabled-foreground` | 비활성 글자는 State 토큰만 |
| `divider` (라이트) | `grayscale-15` | `border`와 동일 — 구분선 전용 |
| `disabled` (면, 라이트) | `background-muted` | 다크는 전용 grayscale |
| `disabled-border` (라이트) | `border` | |
| `secondary-container` (다크) | `background-muted` | 컴포넌트 미사용, API만 유지 |
| `input` | `border-emphasis` | shadcn 호환 — 컴포넌트는 `border-border-emphasis` |

문서 Color Semantic 페이지의 **Maps to** 컬럼은 최종 원시 컬러 토큰명만 표시한다 (`white`, `grayscale-15` 등). alias 체인은 코드에만 둔다.

### 2-1b. Hover 표현 표준 (컴포넌트·문서 공통)

모든 인터랙티브 컴포넌트는 hover 스타일을 **2개 트리거**로 동일하게 표현한다.

- 사용자 상호작용: `hover:*`
- 고정 스냅샷/테스트/문서: `data-[hovered=true]:*`

예시:

```tsx
// outline 버튼 (브랜드 hover)
className="hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground"
```

```tsx
// Chip (무채색 hover)
className="hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground"
```

운영 규칙:

1. `data-[hovered=true]`는 문서/테스트 용도이며 런타임 동작(`hover`)을 대체하지 않는다.
2. 스냅샷에서 임의 색상 클래스(`bg-*`)로 직접 덮지 말고, 각 컴포넌트의 `data-[hovered=true]`를 사용한다.
3. 포인터 hover가 아닌 리스트/메뉴 항목은 기존 `focus:*` 유지 + 필요 시 `data-[hovered=true]:*`를 동일 매핑한다.

### 2-2. Background · Surface · Content

색상 시맨틱 문서는 면을 **Background**와 **Surface**로 나누고, 그 위 글자·아이콘은 **Content**로 분리한다. Hover·Inverse·Primary 등 기존 페어 규칙은 그대로다.

- **Background** — 브라우저·앱 바닥: `--canvas` / `--canvas-muted`. 카드·모달이 아님.
- **Surface** — Background 위 컨테이너: `--background` / `--background-muted` (`--card`/`--popover`/`--card-muted`는 alias, 깊이는 elevation). Inverse 면은 기존 페어 유지.
- **Content** — Background와 Surface **둘 다** 위에 쓰는 글자 위계. 면과 1:1이 아니다.

```css
--foreground              /* 주요 (grayscale-140) */
--foreground-muted        /* 본문·보조 (grayscale-110) */
--foreground-placeholder  /* 캡션·힌트 (grayscale-70) — Input 전용 아님 */
```

같은 Surface(또는 Background) 위에서 상황에 따라 고른다. 예: `bg-background text-foreground-muted`.

비활성 글자·면은 State `--disabled-foreground`만 쓴다 (`--foreground-disabled`는 그 alias). Inverse·Primary·Accent·Hover 위 글자는 각 면의 `{role}-foreground`를 쓴다. Content를 올리지 않는다.

**아이콘과 텍스트는 같은 토큰을 사용한다.** surface 위에 올라가는 점이 같으므로 분리하지 않음. `--icon-*` 별도 없음.

### 2-3. Color 스케일

원시 컬러 5종:

- **Grayscale**: `--grayscale-10` ~ `--grayscale-150` (15단계, 쿨 블루 틴트) · 흰 표면은 `--white`
- **Brand**: `--brand-50` ~ `--brand-950` (9단계, `#F642D4` 베이스)
- **Success**: green
- **Warning**: amber
- **Info**: sky
- **Error**: red (시맨틱 `--destructive`로 매핑)

### 2-4. Shape (Radius)

```
--radius (base) = 0.75rem (12px)
2px · 4px 단위 · 최대 20px · full
```

`--radius-xs` ~ `--radius-2xl`, `--radius-full` (Tailwind `rounded-*`로 노출).

### 2-5. Spacing

Material 결 13단계 스케일. 작은 값은 4px 그리드, 24px 이후로는 8px 점프.

```
미세        : px (1px) · 0.5 (2px)
4px 그리드  : 1 (4) · 2 (8) · 3 (12) · 4 (16) · 5 (20) · 6 (24)
8px 점프    : 8 (32) · 10 (40) · 12 (48) · 16 (64) · 20 (80)
```

**최대 80px.** 그 외 임의값(예: 44px, 56px, 60px)은 사용처에서 `[44px]` 형식 임의값으로 처리. 토큰 비대화를 피하기 위함.

Tailwind 표준 spacing 네임스페이스와 동일하게 매핑 (`p-5` = 20px, `gap-10` = 40px 등).

### 2-5-1. 간격 소유권 (Spacing Ownership)

간격은 **누가 그리는지**로 3층으로 나뉜다. 층이 섞이면 이중 여백·시맨틱 붕괴가 일어난다.

| 층 | 소유자 | 도구 | 예 |
|----|--------|------|----|
| **L1 — 컴포넌트 내부** | DS 컴포넌트 | `padding` | `Button px-2.5` · `Card p-5` |
| **L2 — 합성(자식 사이 간격)** | 부모 wrapper | `flex/grid + gap` | `<InputGroup>` · `<CardHeader>` |
| **L3 — 페이지·섹션 배치** | 소비 페이지 | 시맨틱 토큰 (`space.*.className`) | 페이지 여백·섹션 사이 · 폼 필드 사이 |

**핵심 원칙 — 형제 간격은 부모의 `gap`이 소유한다.** 자식 컴포넌트에 `mt-*`/`mb-*`를 걸어 형제 간 간격을 만들지 않는다.

**허용되는 margin:**
- **컴포넌트 내부**: primitive slot 위치 조정용 (`Icon ml-auto`, `Chevron -mr-1` 등)
- **페이지 레벨**: `space.*.className`을 통한 시맨틱 margin (섹션 사이 등)
- **InputGroup / CardHeader / DialogFooter** 같은 **DS 합성 wrapper 내부의 자체 margin** (해당 wrapper가 소유)

**Anti-Pattern (금지):**

| 패턴 | 이유 | 대안 |
|------|------|------|
| `<Label className="mb-2" />` | 형제 간격을 자식이 소유 | 부모에 `flex flex-col gap-2` |
| `<Input className="mt-1" />` | 위와 동일 | 위와 동일 |
| 부모 `gap-2` + 자식 `mb-2` 동시 | 이중 여백 · 예측 불가 | 하나만 유지 (부모 gap 권장) |
| `<div className="mt-[13px]">` | 토큰 밖 임의 margin | 스케일 값(`mt-3` 등)으로 변경 |
| DS 컴포넌트 정본에 형제용 `mb-*` | DS는 자기 밖 간격을 소유하지 않는다 | 소비자가 부모 gap으로 처리 |

**검증 체크리스트:**

- [ ] 형제 컴포넌트 사이 `mb-*`/`mt-*`가 있는가? → 부모 `gap`으로 이관
- [ ] 부모 `gap` + 자식 `margin` 이중인가? → 하나로 통합
- [ ] `mt-[13px]` 같은 임의값? → 스케일 값(`mt-3` 등)으로 변경
- [ ] DS 컴포넌트 정본에 형제용 `mb-*`? → 제거하고 소비자 부모에 gap 지정
- [ ] 새로 추가한 margin이 크로스플랫폼 이식을 깨지 않는가? → **[§2-5-1a](#2-5-1a-크로스플랫폼-이식성-margin-금지-원칙)** 확인

### 2-5-1a. 크로스플랫폼 이식성 (margin 금지 원칙)

**이 DS는 웹(Tailwind)만이 아니라 Android(XML View · Jetpack Compose)·iOS(UIKit · SwiftUI)의 정본을 지향한다.** margin 금지는 웹 청결 규칙이 아니라 **크로스플랫폼 정본이 되기 위한 전제조건**이다.

**왜 — `margin`은 CSS 고유 개념이다.**

| 플랫폼 | `padding` | `gap`(형제 간격) | `margin` |
|--------|-----------|------------------|----------|
| Tailwind (Web) | `p-*` | `gap-*` / `space-*` | `m-*` ✓ (여기서만 동작) |
| Android View (XML) | `android:padding` | (부모가 배치) | `layout_margin` — View 속성 아닌 **LayoutParams**(부모가 존중해야 적용) |
| Jetpack Compose | `Modifier.padding()` | `Arrangement.spacedBy()` | **없음** |
| UIKit | `directionalLayoutMargins` | 제약 constant | 임의 뷰 margin **없음** |
| SwiftUI | `.padding()` | `VStack/HStack(spacing:)` | **없음** |

- **`padding`과 `gap`(spacing/arrangement)은 5개 런타임 전부에 1:1 존재한다.** → 토큰·간격 규칙이 그대로 번역된다.
- **`margin`은 SwiftUI·Compose에 대응물이 아예 없다.** → 이식하는 사람이 매번 수작업 재해석해야 하고, 판단이 플랫폼마다 갈리면 디자인이 어긋난다.
- **마진 상쇄(margin collapsing)는 웹에만 있다.** 상쇄에 (암묵적이라도) 의존한 간격은 XML·Swift에서 총간격이 달라진다.
- **함정:** margin은 웹에서만 잘 동작하므로 Tailwind 작업 중엔 문제가 안 보인다. Compose/SwiftUI로 넘어가는 순간 드러난다.

**원칙:** 형제 간격은 `gap`, 자기 공간은 `padding`. **컴포넌트 정본에 `margin`을 새로 추가하지 않는다.**

**허용된 예외의 플랫폼별 대체 레시피** — §2-5-1이 허용하는 slot·wrapper margin은 웹 정본에선 유지하되, 타 플랫폼 이식 시 아래로 번역한다. 새 예외를 추가할 땐 이 표에 레시피를 함께 적는다.

| 웹 패턴 | 용도 | Compose / SwiftUI 대체 |
|---------|------|------------------------|
| `ml-auto` (`dropdown-menu` chevron·shortcut) | flex 여유 흡수해 우측 밀기 | `Spacer()` · `Modifier.weight(1f)` — margin 아님, **레이아웃 요소** |
| `-mx-5 -mb-5` (`DialogFooter`) | 본문 패딩 밖으로 풀블리드 | 부모 패딩을 footer에 적용 안 함 + footer 자체 풀폭. **음수 padding 금지** |
| `-mx-1 my-1` (menu·select separator) | 패딩 밖까지 구분선 | Divider를 padding 컨테이너 **밖** 계층에 배치 |
| `-ml-0.5` (`chip` pressed 아이콘) | 옵티컬 정렬 | `Modifier.offset` / `.offset()` (레이아웃 비영향 시각 보정) |
| `mt-1` (`email-input` absolute 드롭다운) | 앵커 오프셋 | 각 플랫폼 popover/anchor API의 offset 파라미터 |

> **음수 margin은 패딩으로 전환 불가**(패딩은 음수 없음), **`ml-auto`도 패딩으로 전환 불가**(고정값 ≠ 여유 흡수). 이 예외들은 "부모 div + padding" 리팩터의 대상이 **아니다** — 잘못 전환하면 규칙 위반을 숨기거나(footprint는 그대로) 반응형 정렬이 깨진다.

### 2-5-2. 시맨틱 Spacing (7개만 유지)

**대부분 원시 토큰(`gap-4`, `p-5` 등)을 직접 사용한다.** 시맨틱 토큰은 반응형이거나 DS 컴포넌트 정본인 경우만 유지.

#### 유지되는 시맨틱 토큰

| 토큰 | 쓸 때 | 쓰지 말 때 |
|------|--------|------------|
| `pagePaddingX` | 페이지·스크롤 셸 **좌우** 인셋 | — |
| `pagePaddingY` | 하단 고정 UI가 없는 **단순 정적 페이지**(문서·마케팅 등)의 상하 여백 | 스크롤 앱 셸·FAB·하단 바·탭바가 있는 제품 UI |
| `scrollBottom` | 스크롤 영역 **하단 여유**(FAB·하단 크롬 회피). 앱 셸 기본 | `pagePaddingY`와 이중 적용 |
| `pageStackGap` | 페이지 안 **연속 블록·섹션**의 기본 수직 리듬 (12→20 반응형) | 랜딩의 “큰 챕터” 구분 |
| `sectionGap` | **의도적 대형 구분**(40) — 랜딩·마케팅·챕터 브레이크 | 일반 제품 목록·폼 스택의 |

앱 셸 기본 패턴:

```tsx
<main className={cn(space.layout.pagePaddingX.className, "flex flex-col", space.layout.pageStackGap.className)}>
  {/* 섹션들 */}
  <div className={space.layout.scrollBottom.className} aria-hidden />
</main>
```

상단 여유는 헤더/네비 높이에 맡기거나, 필요 시 동일 스케일의 top 패딩만 명시한다. **`pagePaddingY`(py-10)를 앱 셸 기본값으로 쓰지 않는다.**

#### Form

| 토큰 | 역할 | 값 |
|------|------|-----|
| `formLabelGap` | Label ↔ Input (필드 **안**) | 4 |
| `formFieldGapTight` | Helper·힌트 등 필드 **안** 밀착 묶음 | 8 |
| `formFieldGap` | 필드 단위(Label+Input+Helper) **사이** | **16 (확정)** |
| `formGroupGap` | 폼 섹션·그룹 사이 | 24 |
| `formGroupGapRelaxed` | 문의·리소스 상세 등 넉넉한 그룹 사이 | 32 |

필드 사이를 12로 줄이려는 로컬 토큰·임의 `gap-3`는 금지. 밀도 조절은 `formFieldGap` / `formFieldGapTight` / `formGroupGap*` 역할 안에서만 한다.

#### Overlay (Modal · Sheet)

| 토큰 | 역할 |
|------|------|
| `modalPaddingX` / `modalPaddingY` | 본문 인셋 (X는 반응형 클래스, Y는 `py-5`) |
| `modalHeaderPaddingX` / `modalHeaderPaddingY` | 헤더 인셋 — **Y는 `py-4` (DS 정본)** |
| `modalFooterPaddingX` / `modalFooterPaddingY` | 푸터 인셋 — **Y는 `py-4` (DS 정본)** |
| `modalBodyStackGap` | 본문 세로 스택 |

소비 앱은 헤더·푸터 Y를 DS `py-4`에 맞춘다. `pt-6` / `lg:pt-10` / `pb-5 pt-2` 등 앱 전용 Y는 두지 않는다. pad-x 반응형은 DS `modalPaddingX`를 따른다.

#### Control · Section (요약)

- `controlGroupCompact` / `Standard` / `Responsive` — 필터·툴바·칩 행 밀도 3단. 행 간격을 앱에서 재정의하지 않는다.
- `sectionStackGap` — 카드·패널 안 기본 블록 스택. `sectionStackGapLarge` — 상세 본문의 큰 블록 묶음.

### 2-6. Typography

**합본 단일 클래스만 사용.** size·line-height·font-weight를 묶은 27개 `@utility`.

```
text-heading{1..5}_{700|500}      (heading)
text-body{1..4}_{700|500|400}      (body)
text-caption{1..2}_{700|500|400}   (caption)
```

**금지:** 개별 속성 조합 (`text-sm + font-bold` 등). 합본 클래스가 폰트 시스템의 단일 소스.

### 2-7. Motion

**Duration (3단계):**
- `--motion-duration-short` 100ms — 인터랙티브 상태·내부 이동·퇴장
- `--motion-duration-medium` 200ms — 등장
- `--motion-duration-long` 400ms — 큰 표면 전환

**Easing (3종, M3 cubic-bezier):**
- `--motion-easing-standard` — 일반 상태 전환
- `--motion-easing-emphasized-decelerate` — 등장 (천천히 안착)
- `--motion-easing-emphasized-accelerate` — 퇴장 (빠르게 사라짐)

**안무 규칙 (Choreography):**

| 시나리오 | duration | easing |
|----------|----------|--------|
| 인터랙티브 상태 전환 | short | standard |
| 내부 이동 | short | standard |
| Overlay 등장 | medium | emphasized-decelerate |
| Overlay 퇴장 | short | emphasized-accelerate |
| 페이지 전환 | long | standard |

### 2-8. Elevation

6단계 그림자 (Material 결).

```
--shadow-elevation-10  /* 카드·인풋 호버 */
--shadow-elevation-20
--shadow-elevation-30  /* 드롭다운·팝오버 */
--shadow-elevation-40
--shadow-elevation-50  /* 모달·바텀시트 */
--shadow-elevation-60
```

라이트 alpha 0.06 / 다크 alpha 0.32.

### 2-9. Dim & Divider

**Dim (overlay 농도):**
- `--dim-10` — 가벼운 호버 백드롭
- `--dim-20` — 모달 배경
- `--dim-30` — 이미지 위 텍스트 보호

**Border 위계 (범용 윤곽 — 폼 전용 토큰 없음):**
- `--border` — 기본 보더 (카드·레이아웃)
- `--border-emphasis` — 인터랙티브·컨트롤 윤곽 (Input·Select·Checkbox 등)
- `--border-medium` — emphasis와 strong 사이 중간 강조
- `--border-strong` — 강한 보더
- `--border-inverse` — 반전 표면 위 보더
- `--input` — shadcn 호환 alias → `--border-emphasis` (컴포넌트는 `border-border-emphasis` 사용)

**Divider (시각적 분리선 — border와 분리):**
- `--divider` — 약한 분리선
- `--divider-strong` — 강한 분리선

### 2-10. Z-Index

6단계 utility, 간격 100. 토스트가 모든 레이어 위.

```css
z-base     /* 0   */
z-dropdown /* 100 */
z-sticky   /* 200 */
z-overlay  /* 300 — 백드롭·플로팅 패널 */
z-modal    /* 400 — 다이얼로그·바텀시트 */
z-toast    /* 500 — 토스트·스낵바 */
```

---

## 3. 컴포넌트 컨벤션

### 3-1. 구조

- 위치: `packages/design-system/src/components/ui/`
- 패턴: `cva` + `VariantProps` + `cn` + Base UI primitive
- 모든 컴포넌트가 `data-slot` 속성 부착 (도메인 wrapper 식별용)
- props·variant 네이밍은 shadcn 컨벤션 (`variant`, `size`, `asChild` 등)

### 3-2. 합성 친화 (Composition-friendly)

도메인 컴포넌트가 DS 컴포넌트를 베이스로 위에 쌓을 수 있다.

| 합성 패턴 | 지원 |
|----------|------|
| className 병합 (`cn`) | ✓ tailwind-merge 기반 |
| props 전파 (`{...props}`) | ✓ |
| CVA variant 확장 (외부에서 새 variant 조합) | ✓ `*Variants` export |
| Portal 자체 관리 (Dialog/Popover/Tooltip/Dropdown) | ✓ |
| ref 전달 | ✓ React 19 ref-as-prop |

**주의 — Portal 컴포넌트 wrapping**: Dialog/Popover/Tooltip을 도메인 wrapper가 전체 감싸면 Portal이 중첩될 수 있음. **Trigger만 wrapping, Content는 원본 그대로**.

### 3-3. 사이즈 컨벤션

폼·인터랙티브 컨트롤은 정본 스케일 5단계:

| API | px | 용도 |
|-----|-----|------|
| `xs` | 24 | 최소 버튼·배지·인라인 |
| `sm` | 32 | 소형 버튼·폼 컨트롤 |
| `default` | 36 | 기본 버튼·Input·Select |
| `xl` | 40 | 대형 폼·터치 영역 |
| `2xl` | 48 | 최대 폼·모바일 터치 |

아이콘 글리프는 6단계 (`md_g16`·`lg_g18`·`xl_g20`·`2xl_g24`·`3xl_g32`·`4xl_g40`), **최소 16px**(단 텍스트+아이콘 xs 버튼은 12px 예외). 12·14px 글리프 토큰은 접근성·광학 가독성 때문에 제거됨.

**버튼 아이콘 규격 — Icon Only는 `md_h36`부터 24px, Text+Icon은 폰트 대비 위계:**

| 버튼 size | 높이 | Icon Only | Text+Icon | Gap |
|-----------|------|-----------|-----------|-----|
| xs | 24 | 16 | 12 | 4 |
| sm | 32 | 20 | 16 | 4 |
| md/default | 36 | 24 | 18 | 6 |
| xl | 40 | 24 | 20 | 6 |
| 2xl | 48 | 24 | 24 | 8 |

### 3-5. 네이밍 표기법

레이어마다 **하나의 case만** 쓴다. 같은 개념을 레이어 간에 다른 표기로 쓰지 않는다.

| 레이어 | Case | 규칙 | 예 |
|--------|------|------|-----|
| 파일·폴더·URL slug | `kebab-case` | 단어 `-` 연결 | `button-group.tsx`, `/components/dropdown-menu` |
| React 컴포넌트·타입 | `PascalCase` | 파일 stem → 연결 | `field-label` → `FieldLabel` |
| 함수·변수·props | `camelCase` | shadcn props 유지 | `variant`, `showHeader`, `getUserName` |
| CVA export | `camelCase` + `Variants` | shadcn | `buttonVariants` |
| 상수·레지스트리 | `SCREAMING_SNAKE` | 모듈 상수 | `PLAYGROUND_REGISTRY`, `ICONS` |
| CSS 변수 | `--kebab-case` | semantic·scale | `--foreground-muted`, `--space-5` |
| `data-slot` | `kebab-case` | `{slug}-{part}` | `dropdown-menu-item`, `field-label-description` |
| Typography class | `text-{group}{n}_{weight}` | 언더스코어 고정 | `text-body3_500` |
| Size token (문서) | `{api}_{axis}{px}` | 문서·Properties | `md_h36`, `md_g16` |
| 패키지 export path | `kebab-case` | 파일 stem 일치 | `design-system/ui/radio-group` |
| Playground state key | `camelCase` | **공백·한글 금지** · Properties와 동일 키 | `variant`, `htmlFor`, `defaultValue` |
| HTML/React 속성 (spec) | **속성명 그대로** | DOM·코드 생성 일치 | `aria-invalid`, `htmlFor` |

**문서화 예외 (의도적):**

- **slug vs title**: `sonner` slug / `Toast` title
- **Playground-only state**: `showHeader`, `tabCount` — 컴포넌트 공개 API가 아님
- **Properties 전용 메타**: `composition`, `itemHeight` — playground 컨트롤 없음 (`SKIPPED_SPEC_PROPS`)
- **Dropdown spec enum**: `RadioItem`, `CheckboxItem` — export 컴포넌트명 참조
- **트리거 ARIA**: `aria-expanded`는 `DropdownMenuTrigger` 등이 **자동 설정** — Button prop으로 노출하지 않음

**금지:**

- Playground/registry state key에 공백·한글 (`"item type"`, `"구성"`)
- 파일명 `PascalCase` / `snake_case`
- CSS 클래스에 `camelCase`
- 레이어 간 임의 혼용 (파일 `UserProfile.tsx`, 변수 `user_profile`)

상세·에이전트 규칙: **`.cursor/rules/naming-conventions.mdc`**

### 3-4. 컴포넌트 목록 (28개)

**Forms:** input, textarea, label, checkbox, radio-group, switch, slider, select, toggle, chip, email-input, password-input, file-input

**Actions:** button, button-group, icon

**Display:** badge, avatar, card, alert, progress, skeleton

**Navigation:** tabs

**Overlays:** dialog, popover, dropdown-menu, tooltip, toast (sonner)

---

## 4. 소비 (Consume) 패턴

### 4-1. 패키지 의존성

```json
{
  "dependencies": {
    "design-system": "file:../path/to/packages/design-system"
  }
}
```

향후 npm publish 단계: `"@scope/design-system": "^x.y.z"`

### 4-2. Import 경로

```ts
// 유틸
import { cn } from "design-system"
import { cn } from "design-system/utils"        // 동일

// 토큰 모듈
import { space, SPACING_SCALE } from "design-system/spacing-tokens"
import { CONTROL_SIZE_SCALE } from "design-system/component-size-tokens"
import { TYPOGRAPHY_SCALE } from "design-system/typography-tokens"
import { MOTION_DURATION_SCALE } from "design-system/motion-tokens"

// 컴포넌트
import { Button } from "design-system/ui/button"
import { Dialog, DialogContent } from "design-system/ui/dialog"

// 아이콘
import { ICONS } from "design-system/icons"

// CSS
@import "design-system/tokens.css"
@import "design-system/theme.css"
@import "design-system/typography.css"
@import "design-system/fonts.css"
@import "design-system/icons.css"
```

### 4-3. 도메인 wrapping 패턴

```tsx
// 도메인 컴포넌트는 DS 컴포넌트를 베이스로
import { Button as DsButton, buttonVariants } from "design-system/ui/button"
import { cn } from "design-system/utils"

export function DomainButton({ className, ...props }) {
  return (
    <DsButton
      className={cn("domain-specific-classes", className)}
      {...props}
    />
  )
}
```

CVA variant 확장은 `buttonVariants` 등 `*Variants` export를 import해서 합성.

**Button 축:** `variant` = 표현(default 솔리드 · secondary · outline · ghost · link), `tone` = 색(neutral · brand · success · warning · destructive). 솔리드 CTA는 `variant="default"` 하나뿐이며, 브랜드 채움은 `tone="brand"`. `variant="primary"`·`status`는 deprecated alias (`primary` → default+brand, `status` default→neutral).

### 4-3-1. 간격 규칙

DS 컴포넌트는 자기 밖 간격을 소유하지 않는다. 형제 사이 간격은 소비 페이지가 부모의 `gap` 또는 `space.*` 시맨틱 토큰으로 그린다.

- 소유권: **[§2-5-1 간격 소유권](#2-5-1-간격-소유권-spacing-ownership)**
- 역할별 사용: **[§2-5-2 시맨틱 Spacing 사용 규칙](#2-5-2-시맨틱-spacing-사용-규칙-소비-앱-공통)**
- 금지: `<Label mb-2 />`, `<Input mt-1 />` — 부모에 `flex flex-col gap-2` 로 이관
- 페이지 셸은 `space.layout.*`, Dialog는 `space.overlay.*`, 그 외는 원시 토큰(`gap-4`, `p-5` 등) 사용

### 4-4. 점진적 마이그레이션 (기존 프로젝트에 적용 시)

| Phase | 내용 |
|-------|------|
| **A** | 새 컴포넌트만 DS 사용. 기존은 그대로. |
| **B** | `globals.css`에 DS tokens.css·theme.css·typography.css import. 충돌 토큰은 자체 정의로 override 후 점진 제거. |
| **C** | 기존 컴포넌트 단위로 DS 베이스로 wrapping 재작성. |
| **D** | 자체 토큰 폐기. DS 단일 소스 완성. |

---

## 5. 소비자 프로젝트

| 프로젝트 | 경로 | 연결 방식 |
|---------|------|----------|
| 리노벨 스튜디오 | `/Users/user/Desktop/프로젝트/upnunde-test/app` | `github:upnunde/Renovel-Studio-DS#v0.1.33` |

소비자 추가 시 이 목록 갱신. 디자인 시스템 변경 시 소비자 영향 항상 고려.

---

## 6. 개발 환경

```bash
npm run dev    # http://localhost:3001 (docs 사이트)
npm run build  # 빌드 확인
npm run lint   # 린트
```

**문서 사이트 라우트:**

- `/foundation/colors` · `/foundation/color-tokens` · `/foundation/color-semantic`
- `/foundation/typography`
- `/foundation/spacing`
- `/foundation/radius`
- `/foundation/icons`
- `/foundation/motion`
- `/components/<slug>` (각 컴포넌트별)

---

## 7. 파일 정본 위치

### 7-0. 크로스플랫폼 토큰·스펙 정본 (OS 중립)

**이 DS는 Web·iOS·Android 공용을 지향한다.** 그 정본은 OS 중립 JSON이며, 플랫폼 산출물은 여기서 생성한다. 상세 매핑은 **`docs/PORTING.md`**.

| 영역 | 정본 경로 | 비고 |
|------|----------|------|
| 원시 토큰 (색·px·duration·easing) | `packages/design-system/tokens/primitives.json` | Tier 1, OS 중립 |
| 시맨틱 토큰 (light/dark) | `packages/design-system/tokens/semantic.json` | Tier 2, primitives 참조 |
| 시맨틱 spacing | `packages/design-system/tokens/semantic-spacing.json` | |
| 타이포그래피 | `packages/design-system/tokens/typography.json` | |
| 토큰 빌더·검증기 (커스텀) | `packages/design-system/tokens/build.mjs` | `verify`=0-drift 보증, `css/swift/xml`=산출물(iOS 동적색·AOS values/values-night) |
| 토큰 빌더 (Style Dictionary) | `packages/design-system/tokens/style-dictionary.config.mjs` · `sd-build.mjs` · `sd-verify.mjs` | 업계 표준 파이프라인 병행 |
| 컴포넌트 스펙 (29개) | `packages/design-system/specs/*.spec.json` (+ `_shared.spec.json`) | OS 중립, 플랫폼 구현의 정본. 스키마: `specs/README.md` |

**검증 명령:**
- `npm run tokens:verify` — 커스텀 빌더 0-drift + 스펙 참조 무결성
- `npm run tokens:sd:verify` — Style Dictionary 산출물이 tokens.css와 일치하는지
- `npm run tokens:check` — 위 전부 (커밋 전 권장)

**불변식:** 세 검증 모두 `0-DRIFT` / `무결성 OK` 여야 한다 = JSON 정본과 웹 `src/tokens.css` 값이 완전 일치(커스텀·SD 파이프라인 양쪽), 스펙의 모든 `{ref}`가 실재 토큰. 웹 산출물이 안 바뀌므로 **기존 소비자(리노벨, v0.1.33 pin) 영향 0**. `src/tokens.css` 는 이제 **"JSON 정본의 웹 산출물"** 성격이며, 값 변경은 JSON에서 하고 verify로 확인한다.

**컴포넌트 스펙 커버리지:** 실제 구현된 29개 컴포넌트 전부. `card`는 DESIGN.md 목록에 있으나 미구현이라 스펙 없음(구현 시 추가). Dialog/Popover/Dropdown/Tooltip/Select는 `_shared.floatingSurface`를 공유 참조. 웹 코드의 shadow(`shadow-md` vs `shadow-elevation-30`)·z-index(`z-50` vs semantic `z-*`) 불일치는 스펙의 `nativeNotes`에 FLAG로 기록됨(웹 코드 미변경 — 별도 결정 대상).

### 7-1. 웹 산출물·구현 정본

| 영역 | 정본 경로 |
|------|----------|
| 시맨틱 컬러·spacing·shadow·motion CSS 변수 | `packages/design-system/src/tokens.css` |
| Tailwind v4 매핑 | `packages/design-system/src/theme.css` |
| Typography @utility | `packages/design-system/src/typography.css` |
| Typography 토큰 TS | `packages/design-system/src/typography-tokens.ts` |
| Spacing 토큰 + Semantic 매핑 | `packages/design-system/src/spacing-tokens.ts` |
| Radius 토큰 | `packages/design-system/src/radius-tokens.ts` |
| Motion 토큰 | `packages/design-system/src/motion-tokens.ts` |
| Icon 토큰 + Control size | `packages/design-system/src/icon-tokens.ts` · `component-size-tokens.ts` |
| 컴포넌트 28개 | `packages/design-system/src/components/ui/` |
| 공통 cn 유틸 | `packages/design-system/src/lib/utils.ts` |
| disabled 헬퍼 | `packages/design-system/src/lib/ui-disabled.ts` |
| 아이콘 ICONS map | `packages/design-system/src/components/icons.ts` |
| 패키지 exports | `packages/design-system/package.json` |

---

## 8. 변경 정책

1. **토큰 이름·값 변경** — 소비자 빌드가 깨질 수 있음. 변경 전 소비자 영향 분석 필수.
2. **컴포넌트 props·variant 제거** — 소비자 사용 중이면 deprecate 단계 거치기.
3. **export 경로 변경** — import가 깨짐. 절대 가벼이 변경 금지.
4. **점진 흡수 원칙** — 다른 시스템(예: 리노벨)을 흡수할 때 "그쪽 정의 그대로"가 아니라 "DS의 최종 정의가 무엇인가" 관점으로 정규화.
5. **토큰 값 변경은 JSON 정본에서** — `tokens/*.json` 을 고치고 `npm run tokens:verify` 로 0-drift 확인 후, 웹 반영이 필요하면 `tokens/build.mjs css` 산출물을 `src/tokens.css` 에 반영. `src/tokens.css` 만 손으로 고쳐 JSON과 어긋나게 두지 않는다(§7-0). 신규 토큰은 스케일에 없으면 원시 px로 두고 "없는 토큰을 있는 척 참조(ghost ref)"하지 않는다.

---

## 9. 관련 문서

- **`DESIGN.md`** — 디자인 시스템 정본 문서 (에이전트 최우선 준수)
- **`docs/PORTING.md`** — 크로스플랫폼(Web·iOS·Android) 전환 기준·토큰/컴포넌트 매핑
- `packages/design-system/specs/README.md` — 컴포넌트 스펙 스키마
- `AGENTS.md` — 에이전트 (Cursor·Claude Code) 핸드오프
- `CLAUDE.md` — Claude Code 세션 시작 규칙
- `docs/wip/HANDOFF.md` — Cursor ↔ Claude Code 즉시 컨텍스트
- `docs/wip/WORKLOG.md` — 작업 일지
