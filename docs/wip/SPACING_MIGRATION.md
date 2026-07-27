# 리노벨 → DS `space.*` 마이그레이션 매핑

> 대상: `Renovel-Studio` 앱의 `page-layout.ts`, `chip-styles.ts`, `modal-styles.ts` 등에 흩어진 spacing 상수를 DS `space.*` 시맨틱으로 단일화.
> 정본: [src/spacing-tokens.ts](../../src/spacing-tokens.ts)

## 결정 사항 (사용자 승인)

- **모달 body 좌우**: `max-lg:px-5 lg:px-6` (반응형 통일)
- **폼 field gap**: `gap-4 (16px)` — DS 값 유지, 앱은 소비처에서 override
- **반응형 값**: 시맨틱 토큰 자체에 담는다 (예: `pagePaddingX.className = "max-lg:px-3 lg:px-5"`)
- **`gap-1.5` 등 스케일 밖 값**: 8px 스텝으로 반올림 (앱에서 `gap-2`로 변경)

## 매핑표

### 페이지 레이아웃

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `PAGE_PADDING_X_CLASS` | `max-lg:px-3 lg:px-5` | `space.layout.pagePaddingX` |
| `PAGE_PADDING_Y_CLASS` | `py-10` | `space.layout.pagePaddingY` |
| `PAGE_GUTTER_GAP_CLASS` | `gap-3 lg:gap-5` | `space.layout.pageStackGap` |
| `PAGE_SECTION_GAP_CLASS` | `gap-10` | `space.layout.sectionGap` |
| `PAGE_SCROLL_BOTTOM_CLASS` | `pb-20` | `space.layout.scrollBottom` |

### 카드·섹션 내부

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `CARD_PADDING_CLASS` | `p-5` | `space.section.sectionPadding` |
| `CARD_HEADER_GAP` | `gap-2` | `space.section.sectionHeaderGap` |
| `CARD_HEADER_TO_BODY_GAP` | `gap-4` | `space.section.sectionContentGap` |
| `CARD_SECTION_STACK_GAP` | `gap-8` | `space.section.sectionStackGapLarge` |
| `SECTION_STACK_GAP_SM` | `gap-5` | `space.section.sectionStackGap` |

### 폼

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 | 비고 |
|---|---|---|---|
| `FORM_LABEL_GAP` | `gap-1` | `space.form.formLabelGap` | |
| `FORM_FIELD_TIGHT_GAP` | `gap-2` | `space.form.formFieldGapTight` | 라벨↔헬퍼 |
| `FORM_FIELD_STACK_GAP` (`gap-3`) | `gap-3` (12px) | `space.form.formFieldGap` **override** | DS 정본은 `gap-4`. 앱에서 필요 시 `cn(base, "gap-3")` |
| `FORM_SECTION_STACK_GAP` (표준) | `gap-6` | `space.form.formGroupGap` | |
| `FORM_SECTION_STACK_GAP` (넉넉) | `gap-8` | `space.form.formGroupGapRelaxed` | 문의·리소스 상세 |
| `FORM_SECTION_STACK_GAP` (=`gap-10`) | `gap-10` | `space.layout.sectionGap` | **폼 그룹이 아니라 페이지 섹션** — 이관 |

### 모달·시트

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `MODAL_HEADER_PAD_X` | `px-6` | `space.overlay.modalHeaderPaddingX` |
| `MODAL_HEADER_PAD_Y` | `py-4` | `space.overlay.modalHeaderPaddingY` |
| `MODAL_FOOTER_PAD_X` | `px-6` | `space.overlay.modalFooterPaddingX` |
| `MODAL_FOOTER_PAD_Y` | `py-4` | `space.overlay.modalFooterPaddingY` |
| `MODAL_BODY_PAD_X` (앱은 `px-5`/`px-6` 혼재) | `max-lg:px-5 lg:px-6` | `space.overlay.modalPaddingX` |
| `MODAL_BODY_PAD_Y` | `py-5` | `space.overlay.modalPaddingY` |
| `MODAL_BODY_STACK_GAP` | `gap-6` | `space.overlay.modalBodyStackGap` |

### 컨트롤 그룹 (필터·툴바)

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `CONTROL_GROUP_COMPACT_GAP` | `gap-1` | `space.control.controlGroupCompact` |
| `CONTROL_GROUP_STANDARD_GAP` | `gap-2` | `space.control.controlGroupStandard` |
| `CONTROL_GROUP_GAP_CLASS` (반응형) | `gap-1 lg:gap-2` | `space.control.controlGroupResponsive` |
| `CHIP_GROUP_GAP` (deprecated, 항상 4) | `gap-1` | `space.control.controlGroupCompact` |
| `FILTER_BAR_ROW_STACK_GAP` | `gap-1 lg:gap-2` | `space.control.controlGroupResponsive` |

### 리스트

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `LIST_ITEM_CONTENT_GAP` | `gap-2` | `space.list.listItemGapCompact` |
| `LIST_ITEM_ROW_GAP` (알림) | `gap-3` | `space.list.listItemGap` |
| `LIST_ITEM_ROW_GAP` (문의) | `gap-5` | `space.list.listItemGapRelaxed` |

### 인라인·액션

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `ICON_TEXT_GAP` | `gap-1` | `space.inline.inlineIconGap` |
| `SUBHEADER_TRAILING_GAP` | `gap-3` / `gap-4` | `space.inline.inlineGapRelaxed` |
| `BUTTON_GROUP_GAP` | `gap-2` | `space.actions.actionGap` |
| `ACTION_GROUP_ROW_GAP` | `gap-4` | `space.actions.actionGroupGap` |

### 분석 (재사용 대상)

| 리노벨 앱 상수 | 실측 값 | DS 시맨틱 |
|---|---|---|
| `ANALYTICS_SECTION_STACK_GAP` | `gap-3 lg:gap-5` | `space.layout.pageStackGap` |
| `ANALYTICS_CHART_BLOCK_GAP` | `gap-4` | `space.section.sectionContentGap` |

## 시맨틱화 안 함 (앱 도메인 유지)

DS `space.*`에 편입하지 않는다. 앱 자체 상수 또는 컴포넌트 내부에 남김.

| 항목 | 이유 |
|---|---|
| Editor Block Row (`gap-4`) | 스크립트 에디터 도메인, 재사용 없음 |
| Editor Choice Panel (`gap-3 px-3 py-3`) | 도메인 |
| `PAGE_CARD_SHELL_PAD_Y` (`pt-2 pb-5`) | PageCard 컴포넌트 L1 내부 패딩 |
| Expression 그리드 (`gap-x-2 gap-y-4`) | 도메인 그리드 |
| Scene Nav (`space-y-1`) | 도메인 |
| Empty state (`p-5+gap-4`) | 소비 페이지가 조합 (기존 `sectionPadding` + `sectionContentGap`으로 표현 가능) |
| safe-area · visualViewport `calc()` | 앱 shell 도메인 |
| FAB offset | 도메인 |
| Chart 축·그리드 내부 | 라이브러리 소관 |
| 버튼·칩 아이콘-텍스트 `gap-0.5`/`gap-1` | 컨트롤 L1 스펙 |
| Badge absolute offset · Grab handle | L1 |

## 스케일 밖 값

| 앱에서 발견 | 조치 |
|---|---|
| `gap-1.5` (6px) | 앱에서 `gap-2` (8px)로 변경 |
| 기타 임의값 | `[Npx]` 사용 지양, 가장 가까운 스케일로 조정 |

## 마이그레이션 순서 (앱 측)

1. `page-layout.ts` → `space.layout.*` 대체
2. `modal-styles.ts` → `space.overlay.*` 대체 (반응형 자동 적용)
3. `chip-styles.ts` / 필터 행 → `space.control.*` 대체
4. `FORM_*` 상수 → `space.form.*` 대체 (일부는 `space.layout.sectionGap`으로 이관)
5. `CARD_*` 상수 → `space.section.*` 대체
6. `gap-1.5` 등 스케일 밖 값 정정
7. 앱 자체 spacing 상수 파일 폐기

## 미결정 (추후)

- `formFieldGap` 정본 값을 `gap-3`(리노벨 실측)으로 낮출지 여부. 현재 DS는 `gap-4` 유지. 다른 소비자 영향 확인 후 결정.
