"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/marketing/animated-counter";
import { AmbientBackground } from "@/components/marketing/ambient-background";
import { BrandChip } from "@/components/marketing/brand-chip";
import { ScanField } from "@/components/marketing/scan-field";
import { CardHaze } from "@/components/marketing/card-haze";
import { heroServices, totalMonthly, potentialSavingsAnnual } from "@/lib/marketing-data";
import { formatINR } from "@/lib/utils";

export function Hero() {
  const [scanDone, setScanDone] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <AmbientBackground variant="light" className="-z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--parrot-100),transparent)]" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[12px] font-medium text-primary-800"
          >
            <span className="size-1.5 rounded-full bg-primary-600" />
            Subscription intelligence, not another tracker
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[38px] font-medium leading-[1.05] tracking-tight text-text-primary sm:text-[48px] lg:text-[52px]"
          >
            The subscriptions you forgot are still charging you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[16px] leading-relaxed text-text-secondary"
          >
            Recurr AI brings every recurring payment into one clear view — so nothing
            renews, duplicates, or quietly drains your account without you knowing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/overview">
                Get started free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">
                <PlayCircle className="size-4" />
                See how it works
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-[12.5px] text-text-muted"
          >
            No card required · Set up in under 2 minutes
          </motion.p>
        </div>

        {/* Signature visual: chaos resolved by a scan, live */}
        <div className="mx-auto hidden w-full max-w-[480px] flex-col gap-4 lg:flex">
          <div className="flex items-center gap-2">
            <span
              className={`size-1.5 rounded-full transition-colors duration-500 ${
                scanDone ? "bg-primary-600" : "bg-neutral-300"
              }`}
            />
            <span className="text-[12px] font-medium text-text-muted">
              {scanDone ? "Organized. 3 things worth a look." : "Scanning your subscriptions…"}
            </span>
          </div>

          <div className="relative isolate overflow-hidden rounded-2xl border border-border-default bg-surface-muted/40 p-4">
            <CardHaze className="-z-10" />
            <ScanField onDone={() => setScanDone(true)} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={scanDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 rounded-xl border border-border-default bg-surface-card px-5 py-3.5"
          >
            <div>
              <span className="block text-[10.5px] font-medium uppercase tracking-wide text-text-muted">
                Monthly recurring
              </span>
              <AnimatedCounter
                value={totalMonthly}
                format={formatINR}
                className="font-numeric text-[19px] font-medium text-text-primary"
              />
            </div>
            <span className="h-8 w-px bg-divider" />
            <div>
              <span className="block text-[10.5px] font-medium uppercase tracking-wide text-text-muted">
                Potential savings
              </span>
              <span className="font-numeric text-[19px] font-medium text-primary-700">
                {formatINR(potentialSavingsAnnual)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile-friendly compact version of the same visual */}
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4 lg:hidden">
          <div className="relative isolate flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-border-default bg-surface-card px-6 py-6 text-center shadow-md">
            <CardHaze className="-z-10 opacity-70" />
            <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
              Monthly recurring
            </span>
            <AnimatedCounter
              value={totalMonthly}
              format={formatINR}
              className="font-numeric text-[24px] font-medium text-text-primary"
            />
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-800">
              {formatINR(potentialSavingsAnnual)} potential savings
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {heroServices.map((service) => (
              <BrandChip key={service.name} name={service.name} size={44} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
