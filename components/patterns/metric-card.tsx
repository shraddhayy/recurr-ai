import * as React from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatPercent } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  delta,
  deltaGood = "up",
  icon: Icon,
  accent = "primary",
  suffix,
}: {
  label: string;
  value: string;
  delta?: number;
  /** Whether an "up" delta should read as positive (green) or negative (red). */
  deltaGood?: "up" | "down";
  icon?: LucideIcon;
  accent?: "primary" | "secondary" | "neutral";
  suffix?: string;
}) {
  const isPositiveDelta = delta !== undefined && delta > 0;
  const isGood =
    delta === undefined ? null : deltaGood === "up" ? isPositiveDelta : !isPositiveDelta;

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-text-secondary">{label}</span>
        {Icon && (
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-md",
              accent === "primary" && "bg-primary-50 text-primary-600",
              accent === "secondary" && "bg-secondary-50 text-secondary",
              accent === "neutral" && "bg-surface-muted text-text-secondary"
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-numeric text-[26px] font-medium leading-none text-text-primary">
          {value}
        </span>
        {suffix && <span className="text-[13px] text-text-muted">{suffix}</span>}
      </div>
      {delta !== undefined && (
        <div className="flex items-center gap-1 text-[12.5px]">
          {isPositiveDelta ? (
            <ArrowUpRight className={cn("size-3.5", isGood ? "text-success" : "text-error")} />
          ) : (
            <ArrowDownRight className={cn("size-3.5", isGood ? "text-success" : "text-error")} />
          )}
          <span className={cn("font-numeric font-medium", isGood ? "text-success" : "text-error")}>
            {formatPercent(delta)}
          </span>
          <span className="text-text-muted">vs last month</span>
        </div>
      )}
    </Card>
  );
}
