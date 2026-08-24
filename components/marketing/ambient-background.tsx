import { cn } from "@/lib/utils";

/**
 * A soft, slow-drifting gradient mesh with a fine grain overlay — the kind of
 * ambient texture premium fintech sites (Revolut, Ramp) use behind hero
 * copy: felt, not noticed. Pure CSS (no video/image assets, no JS per
 * frame), and the drift animation is stopped globally for
 * prefers-reduced-motion via the site-wide media query in globals.css.
 */
export function AmbientBackground({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -left-[10%] -top-[15%] size-[55%] rounded-full blur-[60px] animate-drift-a",
          variant === "light" ? "bg-primary-400/70" : "bg-primary-500/40"
        )}
      />
      <div
        className={cn(
          "absolute -right-[12%] top-[5%] size-[45%] rounded-full blur-[65px] animate-drift-b",
          variant === "light" ? "bg-secondary-300/70" : "bg-secondary-500/35"
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-20%] left-[20%] size-[50%] rounded-full blur-[75px] animate-drift-c",
          variant === "light" ? "bg-primary-300/60" : "bg-primary-400/30"
        )}
      />
      <div className={cn("absolute inset-0 bg-grain", variant === "light" ? "opacity-[0.03]" : "opacity-[0.05]")} />
    </div>
  );
}
