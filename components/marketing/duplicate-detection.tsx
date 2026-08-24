"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { BrandChip } from "@/components/marketing/brand-chip";
import { duplicateGroup } from "@/lib/marketing-data";

export function DuplicateDetection() {
  return (
    <section className="border-t border-divider bg-surface-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-2xl border border-border-default bg-surface-card p-7">
              <span className="text-[11.5px] font-semibold uppercase tracking-wide text-text-muted">
                {duplicateGroup.category}
              </span>
              <div className="mt-4 flex flex-col gap-2.5">
                {duplicateGroup.services.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex items-center gap-3 rounded-lg border border-warning-50 bg-warning-50/60 px-4 py-2.5"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full">
                      <BrandChip name={name} size={28} shape="circle" />
                    </span>
                    <span className="text-[13.5px] font-medium text-text-primary">{name}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-4 flex items-center gap-2 rounded-lg bg-warning-50 px-4 py-2.5"
              >
                <Layers className="size-4 shrink-0 text-warning-strong" strokeWidth={1.75} />
                <span className="text-[12.5px] font-medium text-warning-strong">
                  Potential overlap detected
                </span>
              </motion.div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Duplicate detection"
              title="Three tools doing one job costs three times as much"
              description={duplicateGroup.message}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
