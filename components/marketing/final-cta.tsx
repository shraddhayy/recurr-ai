import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";

export function FinalCta() {
  return (
    <section className="border-t border-divider py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-16 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,var(--parrot-100),transparent)]" />
            <h2 className="mx-auto max-w-xl font-display text-[30px] font-medium leading-[1.15] tracking-tight text-text-primary sm:text-[36px]">
              Stop guessing what your subscriptions cost you.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-text-secondary">
              See every recurring charge in one place — set up takes less than 2 minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/overview">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
