import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-medium leading-none w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-text-secondary border border-border-default",
        active: "bg-success-50 text-success-strong",
        expiring: "bg-warning-50 text-warning-strong",
        renewing: "bg-secondary-50 text-secondary",
        saving: "bg-primary-100 text-primary-900",
        recommended: "bg-primary text-primary-foreground",
        insight: "bg-neutral-900 text-white",
        warning: "bg-error-50 text-error-strong",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === "insight" && <Sparkles className="size-3" aria-hidden="true" />}
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "active" && "bg-success",
            variant === "expiring" && "bg-warning",
            variant === "renewing" && "bg-secondary",
            variant === "warning" && "bg-error",
            (!variant || variant === "neutral") && "bg-text-muted"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
