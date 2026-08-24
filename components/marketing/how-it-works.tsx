"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Layers, RadarIcon, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { BrandChip } from "@/components/marketing/brand-chip";
import { howItWorksSteps, heroServices, upcomingRenewals, savingsBreakdown } from "@/lib/marketing-data";
import { formatINR, cn } from "@/lib/utils";

const stepIcons = [Link2, Layers, RadarIcon, Sparkles];

function StepPreview({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="flex flex-wrap gap-2.5">
        {heroServices.slice(0, 6).map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-2 rounded-full border border-border-default bg-surface-card py-1.5 pl-1.5 pr-3.5"
          >
            <span className="flex size-6 items-center justify-center rounded-full">
              <BrandChip name={s.name} size={24} shape="circle" />
            </span>
            <span className="text-[12.5px] font-medium text-text-primary">{s.name}</span>
          </div>
        ))}
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="flex flex-col gap-2">
        {["AI", "Design", "Entertainment"].map((cat) => (
          <div key={cat} className="flex items-center justify-between rounded-lg border border-border-default bg-surface-card px-4 py-2.5">
            <span className="text-[13px] font-medium text-text-primary">{cat}</span>
            <span className="font-numeric text-[13px] text-text-secondary">
              {formatINR(cat === "AI" ? 798 : cat === "Design" ? 1098 : 847)}/mo
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="flex flex-col gap-2">
        {upcomingRenewals.slice(0, 3).map((r) => (
          <div key={r.service} className="flex items-center justify-between rounded-lg border border-border-default bg-surface-card px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-warning" />
              <span className="text-[13px] font-medium text-text-primary">{r.service}</span>
            </div>
            <span className="text-[12px] text-text-muted">{r.when}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {savingsBreakdown.slice(0, 3).map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border border-primary-200 bg-primary-50/50 px-4 py-2.5">
          <span className="text-[13px] font-medium text-text-primary">{s.label}</span>
          <span className="font-numeric text-[13px] font-medium text-primary-700">+{formatINR(s.amount)}</span>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="border-t border-divider py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How Recurr AI works"
          title="From scattered to understood, in four steps"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-2">
            {howItWorksSteps.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = active === i;
              return (
                <Reveal key={step.number} delay={i * 0.06}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left transition-colors",
                      isActive
                        ? "border-primary-200 bg-primary-50/60"
                        : "border-transparent hover:bg-surface-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg",
                        isActive ? "bg-primary-600 text-white" : "bg-surface-muted text-text-secondary"
                      )}
                    >
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-numeric text-[12px] text-text-muted">{step.number}</span>
                        <h3 className="font-display text-[16px] font-semibold text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </button>

                  {/* Mobile-only inline preview */}
                  <div className={cn("mt-3 mb-2 rounded-xl border border-border-default bg-surface-muted/40 p-4 lg:hidden", !isActive && "hidden")}>
                    <StepPreview step={i} />
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border-default bg-surface-card p-7 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepPreview step={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
