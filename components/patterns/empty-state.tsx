import * as React from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border-default bg-surface-muted/40 px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
        <Icon className="size-[22px] text-primary-600" strokeWidth={1.75} />
      </div>
      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-[15px] font-semibold font-display text-text-primary">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-text-secondary">{description}</p>
      </div>
      {action}
    </div>
  );
}
