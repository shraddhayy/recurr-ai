import { X, Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

const before = [
  "Scattered across emails and bank statements",
  "Unknown renewal dates",
  "Forgotten services still charging you",
  "Duplicate tools doing the same job",
  "No clear picture of yearly cost",
];

const after = [
  "One intelligent view of everything recurring",
  "A clear renewal timeline, before charges land",
  "Duplicate detection across overlapping tools",
  "Savings opportunities, explained",
  "AI recommendations you can act on",
];

export function TransformationSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The transformation"
          title="From scattered spending to one clear view"
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-border-default bg-surface-muted/60 p-7">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">
                Before
              </span>
              <ul className="flex flex-col gap-3.5">
                {before.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-text-secondary">
                    <X className="mt-0.5 size-4 shrink-0 text-error" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-primary-200 bg-primary-50/50 p-7">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-primary-700">
                After Recurr AI
              </span>
              <ul className="flex flex-col gap-3.5">
                {after.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] font-medium text-text-primary">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary-600" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
