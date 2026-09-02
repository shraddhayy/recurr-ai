import Link from "next/link";
import { Sparkles, ShieldCheck, Bell } from "lucide-react";

import { RecurrLogo } from "@/components/shell/logo";

const highlights = [
  { icon: Bell, text: "Never miss a renewal again" },
  { icon: Sparkles, text: "AI finds savings you'd miss" },
  { icon: ShieldCheck, text: "Your data, never sold" },
];

export function AuthLayout({
  children,
  eyebrow,
  title,
  description,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <Link href="/" aria-label="Recurr AI home">
          <RecurrLogo />
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <span className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary-700">
            {eyebrow}
          </span>
          <h1 className="font-display text-[26px] font-medium leading-tight tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{description}</p>

          <div className="mt-8">{children}</div>
        </div>

        <p className="text-center text-[12px] text-text-muted lg:text-left">
          By continuing, you agree to Recurr AI&apos;s terms and privacy principles.
        </p>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-neutral-950 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--parrot-900),transparent_60%)]" />

        <div className="relative">
          <span className="text-[12px] font-medium uppercase tracking-wide text-neutral-500">
            Subscription intelligence
          </span>
          <h2 className="mt-3 max-w-sm font-display text-[32px] font-medium leading-[1.15] tracking-tight text-white">
            Your subscriptions. Finally understood.
          </h2>
        </div>

        <div className="relative flex flex-col gap-4">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                <Icon className="size-4 text-primary-300" strokeWidth={1.75} />
              </span>
              <span className="text-[14px] text-neutral-200">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
