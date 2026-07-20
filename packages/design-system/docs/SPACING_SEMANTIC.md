# 시맨틱 Spacing 사용 규칙 (소비 앱 공통)

모든 소비 서비스가 **같은 역할에 같은 토큰**을 쓴다.  
정본: `src/spacing-tokens.ts` · `src/tokens.css` alias · (모노레포) `DESIGN.md` §2-5-2

## 정본·소비 방식

| 층 | 정본 | 소비 |
|----|------|------|
| 클래스 (권장) | `space.*.className` (`design-system/spacing-tokens`) | `cn(..., space.layout.pageStackGap.className)` |
| CSS 변수 | `--space-{name}` (`tokens.css`) | `gap: var(--space-page-stack-gap)` 등 |
| 반응형 | TS `className`이 breakpoint를 소유 | CSS alias는 **데스크톱 단일값**만 둔다 |

서비스별 임의 `gap-3`·`py-10` 재정의 금지. 밀도·리듬이 부족하면 **토큰 추가를 DS에 요청**한다.

## Layout

| 토큰 | 쓸 때 | 쓰지 말 때 |
|------|--------|------------|
| `pagePaddingX` | 페이지·스크롤 셸 **좌우** 인셋 | — |
| `pagePaddingY` | 하단 고정 UI가 없는 **단순 정적 페이지** 상하 여백 | 스크롤 앱 셸·FAB·하단 바·탭바가 있는 제품 UI |
| `scrollBottom` | 스크롤 영역 **하단 여유**(FAB·하단 크롬 회피). 앱 셸 기본 | `pagePaddingY`와 이중 적용 |
| `pageStackGap` | 페이지 안 **연속 블록·섹션** 기본 수직 리듬 (12→20) | 랜딩의 “큰 챕터” 구분 |
| `sectionGap` | **의도적 대형 구분**(40) — 랜딩·마케팅·챕터 브레이크 | 일반 제품 목록·폼 스택 |

앱 셸 기본 패턴:

```tsx
import { space } from "design-system/spacing-tokens"
import { cn } from "design-system/utils"

<main className={cn(space.layout.pagePaddingX.className, "flex flex-col", space.layout.pageStackGap.className)}>
  {/* 섹션들 */}
  <div className={space.layout.scrollBottom.className} aria-hidden />
</main>
```

**`pagePaddingY`(py-10)를 앱 셸 기본값으로 쓰지 않는다.**

## Form

| 토큰 | 역할 | 값 |
|------|------|-----|
| `formLabelGap` | Label ↔ Input (필드 **안**) | 4 |
| `formFieldGapTight` | Helper·힌트 등 필드 **안** 밀착 | 8 |
| `formFieldGap` | 필드 단위 **사이** | **16 (확정)** |
| `formGroupGap` | 폼 섹션·그룹 사이 | 24 |
| `formGroupGapRelaxed` | 넉넉한 그룹 사이 | 32 |

필드 사이 로컬 12(`gap-3`) 금지.

## Overlay (Modal · Sheet)

| 토큰 | 역할 |
|------|------|
| `modalPaddingX` / `modalPaddingY` | 본문 인셋 (X 반응형, Y `py-5`) |
| `modalHeaderPaddingY` / `modalFooterPaddingY` | **`py-4` (DS 정본)** — 앱 전용 Y 금지 |
| `modalBodyStackGap` | 본문 세로 스택 |

## Control · Section

- `controlGroupCompact` / `Standard` / `Responsive` — 필터·툴바·칩 행 밀도 3단
- `sectionStackGap` — 카드·패널 기본 블록 스택 · `sectionStackGapLarge` — 상세 큰 블록
