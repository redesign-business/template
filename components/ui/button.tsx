import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-button whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-background-tertiary bg-background-tertiary text-scheme-btn-text",
        alternate: "border border-white bg-white text-neutral-darkest",
        secondary: "border border-scheme-border text-scheme-text",
        "secondary-alt": "border border-white text-white",
        link: "gap-2 text-scheme-text",
        "link-alt": "gap-2 text-white",
        ghost: "hover:bg-neutral-darkest hover:text-white",
        none: "",
      },
      size: { default: "px-6 py-3", sm: "px-5 py-2", link: "p-0", icon: "size-10", none: "" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    title?: string;
    href?: string;
    url?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

export function Button({ className, variant, size, asChild = false, title, href, url, type, onClick, iconLeft, iconRight, children, ...props }: ButtonProps) {
  const destination = href ?? url;
  if (!asChild && !destination && !onClick && type !== "submit") return null;
  const Comp: React.ElementType = asChild ? Slot : destination ? "a" : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} href={destination} title={title} type={destination ? undefined : type} onClick={onClick} {...props}>
      {iconLeft}<Slottable>{children ?? title}</Slottable>{iconRight}
    </Comp>
  );
}
