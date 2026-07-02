"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"

import type { AvatarSizeApi } from "../../component-size-tokens"
import { Icon } from "./icon"
import { cn } from "../../lib/utils"

const avatarVariants = cva(
  "group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "size-6",
        default: "size-8",
        md: "size-9",
        lg: "size-10",
        xl: "size-12",
        "2xl": "size-16",
        "3xl": "size-20",
        "4xl": "size-24",
        "5xl": "size-32",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground",
  {
    variants: {
      variant: {
        default: [
          "text-sm",
          "group-data-[size=xs]/avatar:text-[10px]",
          "group-data-[size=sm]/avatar:text-xs",
          "group-data-[size=md]/avatar:text-sm",
          "group-data-[size=lg]/avatar:text-base",
          "group-data-[size=xl]/avatar:text-lg",
          "group-data-[size=2xl]/avatar:text-xl",
          "group-data-[size=3xl]/avatar:text-2xl",
          "group-data-[size=4xl]/avatar:text-3xl",
          "group-data-[size=5xl]/avatar:text-4xl",
        ].join(" "),
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const avatarBadgeVariants = cva(
  "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
  {
    variants: {
      size: {
        xs: "size-1.5 [&>svg]:hidden",
        sm: "size-2 [&>svg]:hidden",
        default: "size-2.5 [&>svg]:size-2",
        md: "size-2.5 [&>svg]:size-2",
        lg: "size-3 [&>svg]:size-2",
        xl: "size-3.5 [&>svg]:size-2.5",
        "2xl": "size-4 [&>svg]:size-3",
        "3xl": "size-5 [&>svg]:size-3.5",
        "4xl": "size-6 [&>svg]:size-4",
        "5xl": "size-8 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const avatarGroupCountVariants = cva(
  "relative flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background",
  {
    variants: {
      size: {
        xs: "size-5 text-[10px] [&>svg]:size-3",
        sm: "size-6 text-xs [&>svg]:size-3",
        default: "size-8 text-sm [&>svg]:size-4",
        md: "size-9 text-sm [&>svg]:size-4",
        lg: "size-10 text-base [&>svg]:size-5",
        xl: "size-12 text-lg [&>svg]:size-6",
        "2xl": "size-16 text-xl [&>svg]:size-8",
        "3xl": "size-20 text-2xl [&>svg]:size-10",
        "4xl": "size-24 text-3xl [&>svg]:size-12",
        "5xl": "size-32 text-4xl [&>svg]:size-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSizeApi
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  variant = "default",
  ...props
}: AvatarPrimitive.Fallback.Props &
  VariantProps<typeof avatarFallbackVariants>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      data-variant={variant}
      className={cn(avatarFallbackVariants({ variant }), className)}
      {...props}
    />
  )
}

function AvatarIcon({
  icon,
  className,
  ...props
}: Omit<React.ComponentProps<typeof AvatarFallback>, "children" | "variant"> & {
  icon: LucideIcon
}) {
  return (
    <AvatarFallback variant="icon" className={className} {...props}>
      <Icon icon={icon} />
    </AvatarFallback>
  )
}

function AvatarBadge({
  className,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof avatarBadgeVariants>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        avatarBadgeVariants({ size }),
        !size &&
          [
            "group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden",
            "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
            "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
            "group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2",
            "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
            "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
            "group-data-[size=2xl]/avatar:size-4 group-data-[size=2xl]/avatar:[&>svg]:size-3",
            "group-data-[size=3xl]/avatar:size-5 group-data-[size=3xl]/avatar:[&>svg]:size-3.5",
            "group-data-[size=4xl]/avatar:size-6 group-data-[size=4xl]/avatar:[&>svg]:size-4",
            "group-data-[size=5xl]/avatar:size-8 group-data-[size=5xl]/avatar:[&>svg]:size-5",
          ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof avatarGroupCountVariants>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        avatarGroupCountVariants({ size }),
        !size &&
          [
            "group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:text-[10px] group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
            "group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-xs group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
            "group-has-data-[size=default]/avatar-group:size-8 group-has-data-[size=default]/avatar-group:text-sm group-has-data-[size=default]/avatar-group:[&>svg]:size-4",
            "group-has-data-[size=md]/avatar-group:size-9 group-has-data-[size=md]/avatar-group:text-sm group-has-data-[size=md]/avatar-group:[&>svg]:size-4",
            "group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-base group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
            "group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xl]/avatar-group:text-lg group-has-data-[size=xl]/avatar-group:[&>svg]:size-6",
            "group-has-data-[size=2xl]/avatar-group:size-16 group-has-data-[size=2xl]/avatar-group:text-xl group-has-data-[size=2xl]/avatar-group:[&>svg]:size-8",
            "group-has-data-[size=3xl]/avatar-group:size-20 group-has-data-[size=3xl]/avatar-group:text-2xl group-has-data-[size=3xl]/avatar-group:[&>svg]:size-10",
            "group-has-data-[size=4xl]/avatar-group:size-24 group-has-data-[size=4xl]/avatar-group:text-3xl group-has-data-[size=4xl]/avatar-group:[&>svg]:size-12",
            "group-has-data-[size=5xl]/avatar-group:size-32 group-has-data-[size=5xl]/avatar-group:text-4xl group-has-data-[size=5xl]/avatar-group:[&>svg]:size-16",
          ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIcon,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  avatarBadgeVariants,
  avatarFallbackVariants,
  avatarGroupCountVariants,
  avatarVariants,
}
