import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * 합본 타이포 클래스(`text-body3_500`·`text-heading2_700`·`text-caption1_400`)는
 * font-size 그룹에 속한다. 이 그룹에 등록해야:
 *   - cn("text-sm", "text-body3_500") → text-body3_500 만 남음 (충돌 인식)
 *   - cn("text-body3_500", "text-foreground-muted") → 둘 다 살아남음 (font-size · color 그룹 분리)
 *
 * 매칭 규칙: typography-tokens.ts의 isTypographyClass와 동일 ((body|heading|caption)\d+_\d{3}).
 */
const isDsTypographyClassPart = (classPart: string) =>
  /^(?:body|heading|caption)\d+_\d{3}$/.test(classPart)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [isDsTypographyClassPart] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
