import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em]",
              tone === "light" ? "text-primary-700" : "text-primary-300"
            )}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-[30px] font-medium leading-[1.1] tracking-tight sm:text-[38px] md:text-[44px]",
            tone === "light" ? "text-text-primary" : "text-white",
            align === "center" && "mx-auto max-w-3xl"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-[15.5px] leading-relaxed",
              tone === "light" ? "text-text-secondary" : "text-neutral-400",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
