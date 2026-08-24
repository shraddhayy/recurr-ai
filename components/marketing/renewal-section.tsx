"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { BrandChip } from "@/components/marketing/brand-chip";
import { upcomingRenewals } from "@/lib/marketing-data";
import { formatINR } from "@/lib/utils";

export function RenewalSection() {
  return (
    <section className="border-t border-divider py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Renewal intelligence"
            title="See it before it leaves your account"
            description="Recurr AI builds a clear timeline of what's about to renew — so a charge is never a surprise again."
          />

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border-default bg-surface-card p-7">
              <div className="relative flex flex-col gap-0">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-divider" aria-hidden="true" />
                {upcomingRenewals.map((r, i) => (
                  <motion.div
                    key={r.service}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative flex items-center gap-4 py-3.5"
                  >
                    <span
                      className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
                        i === 0
                          ? "border-primary-600 bg-primary-600"
                          : "border-border-strong bg-surface-card"
                      }`}
                    >
                      <Bell
                        className={`size-3.5 ${i === 0 ? "text-white" : "text-text-muted"}`}
                        strokeWidth={2}
                      />
                    </span>
                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BrandChip name={r.service} size={28} />
                        <div>
                          <p className="text-[13.5px] font-medium text-text-primary">{r.service}</p>
                          <p className="text-[12px] text-text-muted">{r.when}</p>
                        </div>
                      </div>
                      <span className="font-numeric text-[13.5px] text-text-secondary">
                        {formatINR(r.amount)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
