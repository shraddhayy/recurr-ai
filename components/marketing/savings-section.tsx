"use client";

import { PiggyBank } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedCounter } from "@/components/marketing/animated-counter";
import { savingsBreakdown, potentialSavingsAnnual } from "@/lib/marketing-data";
import { formatINR } from "@/lib/utils";

export function SavingsSection() {
  return (
    <section id="savings" className="border-t border-divider py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Savings"
              title="You could be paying for more than you use."
              description="Recurr AI reviews your billing history and usage patterns to surface real opportunities to save — with the reasoning shown, not just a number."
            />
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-primary-200 bg-primary-50/50 p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <PiggyBank className="size-[18px]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-primary-800">Potential savings</p>
                  <AnimatedCounter
                    value={potentialSavingsAnnual}
                    format={formatINR}
                    className="font-numeric text-[26px] font-medium text-primary-900"
                  />
                  <span className="ml-1 text-[12.5px] text-primary-700">/year</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3.5 border-t border-primary-200/70 pt-5">
                {savingsBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13.5px] font-medium text-text-primary">{item.label}</p>
                      <p className="text-[12px] text-text-secondary">{item.description}</p>
                    </div>
                    <span className="shrink-0 font-numeric text-[13.5px] font-medium text-primary-700">
                      +{formatINR(item.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 border-t border-primary-200/70 pt-4 text-[11.5px] text-primary-700">
                Illustrative figures based on demo data — actual savings depend on your subscriptions.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
