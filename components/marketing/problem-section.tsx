"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedCounter } from "@/components/marketing/animated-counter";
import { BrandChip } from "@/components/marketing/brand-chip";
import {
  heroServices,
  otherSubscriptionsCount,
  totalSubscriptions,
  totalMonthly,
  totalAnnual,
} from "@/lib/marketing-data";
import { formatINR } from "@/lib/utils";

export function ProblemSection() {
  return (
    <section className="border-t border-divider bg-surface-muted/50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The problem"
          title="One subscription is easy to track. Twelve is not."
          description="Each one felt small when you signed up. Netflix here, a productivity tool there, a free trial you forgot to cancel. Recurr AI shows you what they add up to."
        />

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {heroServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 rounded-full border border-border-default bg-surface-card py-2 pl-2 pr-4 shadow-xs"
            >
              <BrandChip name={service.name} size={32} shape="circle" />
              <span className="text-[13px] font-medium text-text-primary">{service.name}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: heroServices.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full border border-dashed border-border-strong bg-transparent py-2 pl-2 pr-4"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-surface-muted font-display text-[12px] font-semibold text-text-secondary">
              +{otherSubscriptionsCount}
            </span>
            <span className="text-[13px] font-medium text-text-secondary">more you might have forgotten</span>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Active subscriptions", value: totalSubscriptions, format: (n: number) => String(n) },
            { label: "Recurring per month", value: totalMonthly, format: formatINR },
            { label: "Recurring per year", value: totalAnnual, format: formatINR },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-xl border border-border-default bg-surface-card p-6">
                <AnimatedCounter
                  value={stat.value}
                  format={stat.format}
                  className="font-numeric text-[32px] font-medium text-text-primary"
                />
                <p className="mt-1.5 text-[13.5px] text-text-secondary">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
