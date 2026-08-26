"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import {
  uiDisabledInteractive,
  uiDisabledNoSurface,
} from "../../lib/ui-disabled"

/**
 * 내비 섹션 그룹 — docs NavSection / 스튜디오 사이드바 섹션과 같은 묶음 단위.
 * 제목은 SidebarGroupLabel을 넣거나 생략해 노출 여부를 선택한다.
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

/** padX는 같은 size의 SidebarMenuButton과 좌측 정렬 */
const sidebarGroupLabelVariants = cva(
  "pt-1 text-caption1_500 tracking-wide text-foreground-placeholder",
  {
    variants: {
      size: {
        default: "px-3",
        sm: "px-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function SidebarGroupLabel({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof sidebarGroupLabelVariants>) {
  return (
    <p
      data-slot="sidebar-group-label"
      data-size={size ?? undefined}
      className={cn(sidebarGroupLabelVariants({ size }), className)}
      {...props}
    />
  )
}

/**
 * 데스크톱 좌측 사이드바 내비 행 — 스튜디오 AppSidebar / SceneNavigation 패턴.
 * 활성: 브랜드 텍스트만 (면 채움 없음). 비활성: foreground-muted + muted 호버.
 */
const sidebarMenuButtonVariants = cva(
  `group/sidebar-menu-button peer/menu-button flex w-full cursor-pointer items-center gap-3 rounded-md text-left outline-none transition-colors duration-short ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${uiDisabledInteractive} ${uiDisabledNoSurface} [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      size: {
        /** 앱 내비 · 장면 목록 기본 */
        default:
          "px-3 py-2 text-body2_500 [&_svg:not([class*='size-'])]:size-5",
        sm: "gap-2 px-2.5 py-1.5 text-body3_500 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      role="list"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

type SidebarMenuButtonProps = useRender.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    /** 현재 라우트·선택 행 */
    isActive?: boolean
  }

function SidebarMenuButton({
  className,
  isActive = false,
  size = "default",
  render,
  ...props
}: SidebarMenuButtonProps) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: "button",
        className: cn(
          sidebarMenuButtonVariants({ size }),
          isActive
            ? "text-primary"
            : "text-foreground-muted hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground",
          className
        ),
        ...({
          "data-active": isActive ? "" : undefined,
          "data-size": size ?? undefined,
          "aria-current": isActive ? "page" : undefined,
        } as React.ButtonHTMLAttributes<HTMLButtonElement>),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-button",
      active: isActive,
      size,
    },
  })
}

export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  sidebarGroupLabelVariants,
  sidebarMenuButtonVariants,
  type SidebarMenuButtonProps,
}
