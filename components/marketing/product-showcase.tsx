"use client";

import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedCounter } from "@/components/marketing/animated-counter";
import { BrandChip } from "@/components/marketing/brand-chip";
import { Badge } from "@/components/ui/badge";
import {
  heroServices,
  totalSubscriptions,
  totalMonthly,
  totalAnnual,
  potentialSavingsAnnual,
} from "@/lib/marketing-data";
import { formatINR } from "@/lib/utils";

const trend = [
  { m: "Mar", v: 3820 },
  { m: "Apr", v: 4010 },
  { m: "May", v: 4180 },
  { m: "Jun", v: 4340 },
  { m: "Jul", v: 4460 },
  { m: "Aug", v: 4620 },
];

const statusByService: Record<string, { label: string; variant: "active" | "renewing" | "expiring" | "recommended" }> = {
  Netflix: { label: "Renewing", variant: "renewing" },
  Claude: { label: "Duplicate", variant: "expiring" },
  Adobe: { label: "Save", variant: "recommended" },
};

export function ProductShowcase() {
  return (
    <section id="product" className="border-t border-divider bg-surface-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product"
          title="Everything recurring, in one intelligent view"
          description="A live look at what Recurr AI shows you the moment you connect your subscriptions."
          align="center"
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-border-default bg-surface-card shadow-lg">
            {/* Faux browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-divider px-4 py-3">
              <span className="size-2.5 rounded-full bg-neutral-200" />
              <span className="size-2.5 rounded-full bg-neutral-200" />
              <span className="size-2.5 rounded-full bg-neutral-200" />
              <span className="ml-3 rounded-md bg-surface-muted px-3 py-1 text-[11px] text-text-muted">
                app.recurrai.com/overview
              </span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-divider sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Active subscriptions", value: totalSubscriptions, format: (n: number) => String(n) },
                { label: "Monthly", value: totalMonthly, format: formatINR },
                { label: "Annual", value: totalAnnual, format: formatINR },
                { label: "Potential savings", value: potentialSavingsAnnual, format: formatINR, accent: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-card p-5">
                  <p className="text-[12px] font-medium text-text-secondary">{stat.label}</p>
                  <AnimatedCounter
                    value={stat.value}
                    format={stat.format}
                    className={`font-numeric text-[22px] font-medium ${
                      stat.accent ? "text-primary-700" : "text-text-primary"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-px bg-divider lg:grid-cols-5">
              <div className="bg-surface-card p-6 lg:col-span-2">
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="showcaseFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--parrot-500)" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="var(--parrot-500)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "var(--neutral-500)", fontSize: 11 }} />
                      <Area type="monotone" dataKey="v" stroke="var(--parrot-600)" strokeWidth={2} fill="url(#showcaseFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-1 text-[12.5px] text-text-muted">Recurring spend, last 6 months</p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-divider sm:grid-cols-3 lg:col-span-3">
                {heroServices.map((service, i) => {
                  const status = statusByService[service.name];
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      whileHover={{ y: -2 }}
                      className="flex flex-col gap-2 bg-surface-card p-4"
                    >
                      <div className="flex items-center justify-between">
                        <BrandChip name={service.name} size={32} />
                        {status && (
                          <Badge variant={status.variant} className="text-[10px]">
                            {status.label}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-text-primary">{service.name}</p>
                        <p className="font-numeric text-[11.5px] text-text-muted">{formatINR(service.monthly)}/mo</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
