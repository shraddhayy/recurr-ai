import { cn } from "@/lib/utils";

/**
 * Signature mark: an open "renewal ring" — a ~290° arc with a leading dot,
 * standing in for the recurring billing cycle at the center of the product.
 * Used sparingly: here, and as a quiet motif in AI Insight moments.
 */
export function RecurrMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="var(--parrot-600)" />
      <path
        d="M22.5 16a6.5 6.5 0 1 1-2.1-4.8"
        stroke="var(--parrot-50)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="21.4" cy="9.9" r="1.6" fill="var(--parrot-50)" />
    </svg>
  );
}

export function RecurrLogo({
  className,
  collapsed,
  theme = "light",
}: {
  className?: string;
  collapsed?: boolean;
  /** Which background this sits on — "dark" for the sidebar/dark sections, "light" for the marketing navbar/footer. */
  theme?: "light" | "dark";
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <RecurrMark className="size-8" />
      {!collapsed && (
        <span
          className={cn(
            "font-display text-[16.5px] font-semibold tracking-tight",
            theme === "dark" ? "text-white" : "text-text-primary"
          )}
        >
          Recurr <span className={theme === "dark" ? "text-primary-300" : "text-primary-600"}>AI</span>
        </span>
      )}
    </div>
  );
}
