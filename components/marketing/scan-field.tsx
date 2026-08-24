"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

import { BrandChip } from "@/components/marketing/brand-chip";
import { heroServices } from "@/lib/marketing-data";

// Ordered left-to-right so the scan line's sweep reveals cards in a natural sequence.
const chaosLayout = [
  { top: "30%", left: "-4%", rotate: -9 },
  { top: "60%", left: "2%", rotate: 7 },
  { top: "6%", left: "13%", rotate: -13 },
  { top: "82%", left: "25%", rotate: 10 },
  { top: "0%", left: "45%", rotate: -6 },
  { top: "76%", left: "57%", rotate: 12 },
  { top: "9%", left: "77%", rotate: -11 },
  { top: "58%", left: "80%", rotate: 8 },
  { top: "33%", left: "90%", rotate: -14 },
];

const gridLayout = [
  { top: "2%", left: "2%" },
  { top: "2%", left: "37%" },
  { top: "2%", left: "72%" },
  { top: "38%", left: "2%" },
  { top: "38%", left: "37%" },
  { top: "38%", left: "72%" },
  { top: "74%", left: "2%" },
  { top: "74%", left: "37%" },
  { top: "74%", left: "72%" },
];

// Green is earned — only these three get a signal, matching the AI/showcase story elsewhere.
const signals: Record<number, string> = {
  0: "Renews soon",
  4: "Duplicate",
  6: "Save ₹799",
};

const CARD_W = 30; // % of container width
const SCAN_DURATION = 1.9;

export function ScanField({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(shouldReduceMotion ? 9 : 0);
  const scanning = inView && !shouldReduceMotion && revealedCount < heroServices.length;

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      if (inView && shouldReduceMotion) onDone?.();
      return;
    }
    const stagger = (SCAN_DURATION * 1000) / heroServices.length;
    const timers = heroServices.map((_, i) =>
      setTimeout(() => setRevealedCount((c) => Math.max(c, i + 1)), 250 + i * stagger)
    );
    const doneTimer = setTimeout(() => {
      onDone?.();
    }, 250 + SCAN_DURATION * 1000 + 200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, shouldReduceMotion]);

  return (
    <div ref={ref} className="relative aspect-[6/5] w-full">
      {/* Scan line */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ left: "-4%", opacity: 0 }}
            animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: SCAN_DURATION, delay: 0.25, ease: "linear" }}
            className="absolute top-0 z-20 h-full w-[3px]"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--parrot-500), transparent)",
              boxShadow: "0 0 24px 4px var(--parrot-400)",
            }}
          />
        )}
      </AnimatePresence>

      {heroServices.map((service, i) => {
        const isRevealed = i < revealedCount;
        const pos = isRevealed ? gridLayout[i] : chaosLayout[i];
        const signal = signals[i];

        return (
          <motion.div
            key={service.name}
            animate={{
              top: pos.top,
              left: pos.left,
              rotate: isRevealed ? 0 : chaosLayout[i].rotate,
              opacity: isRevealed ? 1 : 0.55,
              scale: isRevealed ? 1 : 0.92,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center gap-2 rounded-xl border border-border-default bg-surface-card px-2.5 py-2 shadow-sm"
            style={{ width: `${CARD_W}%` }}
          >
            <BrandChip name={service.name} size={26} />
            <span className="truncate text-[11.5px] font-medium text-text-primary">
              {service.name}
            </span>

            <AnimatePresence>
              {isRevealed && signal && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="absolute -right-1 -top-1 z-30 flex size-4 items-center justify-center rounded-full bg-primary-600 shadow-sm"
                  title={signal}
                  role="img"
                  aria-label={signal}
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-500 opacity-60" />
                  <span className="relative size-1.5 rounded-full bg-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
