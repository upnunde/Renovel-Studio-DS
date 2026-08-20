import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { TYPOGRAPHY_SCALE } from "../typography-tokens"

/**
 * 합본 타이포 클래스(`text-body3_500` 등)는 font-size·weight·line-height를 한 번에 담는다.
 * 동일 클래스를 font-size/font-weight/leading에 중복 등록하면 twMerge가 자기 자신과
 * 충돌해 클래스를 지워 버리므로, 전용 그룹 + conflictingClassGroups 로 처리한다.
 *
 *   cn("text-sm font-medium leading-none", "text-body1_400") → text-body1_400
 *   cn("text-body3_500", "text-foreground-muted") → 둘 다 유지
 *
 * 합본 클래스 옆에 leading-[Npx]를 또 붙이지 말 것 — leading과 충돌해 합본이 삭제됨.
 */
const DS_TYPOGRAPHY_CLASSES = TYPOGRAPHY_SCALE.map((token) => token.className)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "ds-typography": DS_TYPOGRAPHY_CLASSES,
    },
    conflictingClassGroups: {
      "ds-typography": ["font-size", "font-weight", "leading"],
      "font-size": ["ds-typography"],
      "font-weight": ["ds-typography"],
      leading: ["ds-typography"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
