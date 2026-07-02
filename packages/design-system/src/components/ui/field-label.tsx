"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ICONS } from "../icons"
import { Icon } from "./icon"
import { Label } from "./label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const fieldLabelTitleVariants = cva("font-bold", {
  variants: {
    size: {
      /** 15/700 · text-body2_700 */
      default: "text-body2_700 leading-[22px]",
      /** 18/700 · text-heading5_700 */
      lg: "text-heading5_700 leading-[26px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const fieldLabelDescriptionClassName =
  "text-body4_400 font-normal leading-[18px] text-foreground-muted"

function normalizeFieldLabelDescription(
  description: FieldLabelProps["description"]
): string[] | null {
  if (
    description == null ||
    description === "" ||
    (typeof description === "boolean" && !description)
  ) {
    return null
  }

  if (Array.isArray(description)) {
    const lines = description
      .map((line) => String(line).trim())
      .filter((line) => line.length > 0)
      .slice(0, 3)
    return lines.length > 0 ? lines : null
  }

  return [String(description)]
}

type FieldLabelProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof fieldLabelTitleVariants> & {
    children: React.ReactNode
    htmlFor?: string
    /** 필수 필드 표시 (`*`) */
    required?: boolean
    /** 라벨 아래 보조문구 (최대 3줄) — Input `aria-describedby`에 연결 권장 */
    description?: React.ReactNode | readonly string[]
    /** 정보 아이콘 툴팁 (타이틀2) */
    info?: React.ReactNode
    /** 설명 id — 미지정 시 자동 생성 */
    descriptionId?: string
  }

function FieldLabel({
  className,
  children,
  htmlFor,
  size = "default",
  required = false,
  description,
  info,
  descriptionId: descriptionIdProp,
  ...props
}: FieldLabelProps) {
  const autoId = React.useId()
  const titleClassName = fieldLabelTitleVariants({ size })
  const descriptionLines = normalizeFieldLabelDescription(description)
  const hasDescription = descriptionLines != null && descriptionLines.length > 0
  const hasInfo =
    info != null && info !== "" && !(typeof info === "boolean" && !info)
  const descriptionId = hasDescription
    ? (descriptionIdProp ?? `${autoId}-description`)
    : undefined

  return (
    <div
      data-slot="field-label"
      className={cn("inline-flex flex-col items-start gap-1", className)}
      {...props}
    >
      <div
        data-slot="field-label-row"
        className="inline-flex items-center gap-1"
      >
        <Label htmlFor={htmlFor} className={titleClassName}>
          {children}
        </Label>
        {required ? (
          <span
            data-slot="field-label-required"
            className={cn(titleClassName, "text-destructive")}
            aria-hidden
          >
            *
          </span>
        ) : null}
        {hasInfo ? (
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex shrink-0 rounded-full text-foreground-muted transition-colors hover:text-foreground data-[hovered=true]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
                aria-label="추가 정보"
              >
                <Icon
                  icon={ICONS.info}
                  size="sm"
                  className="pointer-events-none"
                />
              </TooltipTrigger>
              <TooltipContent side="top">{info}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
      {hasDescription ? (
        <div
          id={descriptionId}
          data-slot="field-label-description"
          className="flex flex-col"
        >
          {descriptionLines.map((line, index) => (
            <p key={index} className={fieldLabelDescriptionClassName}>
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { FieldLabel, fieldLabelTitleVariants, type FieldLabelProps }
