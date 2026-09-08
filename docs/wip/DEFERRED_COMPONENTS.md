# Deferred components (채팅 UI)

docs Overview·사이드바에서 **일시 보류**할 수 있는 채팅 계열. 현재 Bubble·Message는 **노출** 상태.

| 컴포넌트 | 상태 | 위치 |
|----------|------|------|
| **Bubble** | DS 구현 · docs **Chat** 섹션 노출 | `packages/design-system/src/components/ui/bubble.tsx` · `specs/bubble.spec.json` · `design-system/ui/bubble` |
| **Message** | DS 구현 · docs **Chat** 섹션 노출 | `packages/design-system/src/components/ui/message.tsx` · `specs/message.spec.json` · `design-system/ui/message` |
| **MessageScroller** | 미추가 | shadcn MessageScroller — 대화 스크롤 컨테이너. 필요 시 추가 |

## 역할

- **Bubble** = 말풍선 표면 (variant·본문)
- **Message** = 행 레이아웃 (align·Avatar·Header·Footer) · 본문은 Bubble 조합
- **MessageScroller** = 대화 스크롤 컨테이너

## 숨기려면

1. `src/lib/component-docs.ts` — 해당 항목에 `hidden: true`
