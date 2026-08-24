import { ShieldCheck, Eye, UserCog, Lock } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { trustPrinciples } from "@/lib/marketing-data";

const icons = [ShieldCheck, Eye, UserCog, Lock];

export function TrustSection() {
  return (
    <section className="border-t border-divider py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Built for clarity"
          title="Financial data deserves to be handled carefully"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPrinciples.map((principle, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={principle.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border-default bg-surface-card p-6">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-[14.5px] font-semibold text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
