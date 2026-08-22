import * as React from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-divider pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        {eyebrow && (
          <span className="text-[11.5px] font-semibold uppercase tracking-wider text-primary-600">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-[26px] font-medium tracking-tight text-text-primary sm:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-[14px] leading-relaxed text-text-secondary">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
    </div>
  );
}
