import { cn } from "@/lib/utils";

/**
 * A soft field of out-of-focus subscription cards sitting behind the live
 * Scan visual — the same credit-card proportions (1.586:1) used everywhere
 * else in the product, blurred into bokeh and tinted blue so the sharp,
 * in-focus card grid in front reads as "resolved out of a haze." Blue here
 * is deliberately the *unresolved* state's color; parrot green stays reserved
 * for the moment a card is actually organized, so the two colors keep telling
 * the same story the ScanField already tells.
 *
 * Pure CSS blur — no image or video assets, so it never fails to load and
 * costs nothing to render. Static (no motion), so it's identical under
 * prefers-reduced-motion with no extra branching needed.
 */
const cards = [
  { top: "4%", left: "-8%", w: 132, rotate: -16, tone: "blue" as const },
  { top: "58%", left: "-6%", w: 108, rotate: 10, tone: "primary" as const },
  { top: "-6%", left: "38%", w: 118, rotate: 8, tone: "blue" as const },
  { top: "70%", left: "30%", w: 96, rotate: -12, tone: "blue" as const },
  { top: "2%", left: "78%", w: 126, rotate: 14, tone: "primary" as const },
  { top: "62%", left: "82%", w: 112, rotate: -9, tone: "blue" as const },
];

const toneClass: Record<"blue" | "primary", string> = {
  blue: "bg-secondary-300/60 border-secondary-200",
  primary: "bg-primary-300/50 border-primary-200",
};

export function CardHaze({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base blue glow — the "unresolved" wash the sharp grid emerges from */}
      <div
        className="absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{ background: "radial-gradient(circle, var(--blue-200), transparent 70%)" }}
      />

      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(
            "absolute aspect-[1.586/1] rounded-xl border blur-lg",
            toneClass[card.tone]
          )}
          style={{
            top: card.top,
            left: card.left,
            width: card.w,
            transform: `rotate(${card.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
