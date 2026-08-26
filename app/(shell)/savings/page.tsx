import { PiggyBank, ArrowRight, TrendingDown } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { MetricCard } from "@/components/patterns/metric-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { savingsOpportunities } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { BrandChip, BrandChipStack } from "@/components/shared/brand-chip";

const badgeVariant = {
  Recommended: "recommended",
  Duplicate: "warning",
  Underused: "expiring",
} as const;

export default function SavingsPage() {
  const totalMonthly = savingsOpportunities.reduce((sum, s) => sum + s.monthlySavings, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Savings"
        title="Opportunities to cut costs"
        description="Recurr AI reviews your billing history and usage patterns to surface savings — you decide what to act on."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Potential monthly savings"
          value={formatCurrency(totalMonthly, { cents: true })}
          icon={PiggyBank}
          accent="primary"
        />
        <MetricCard
          label="Opportunities found"
          value={String(savingsOpportunities.length)}
          icon={TrendingDown}
          accent="secondary"
        />
        <MetricCard
          label="Annualized impact"
          value={formatCurrency(totalMonthly * 12)}
          suffix="/yr"
          icon={PiggyBank}
          accent="neutral"
        />
      </div>

      <div className="flex flex-col gap-4">
        {savingsOpportunities.map((op) => {
          return (
            <Card key={op.id} className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  {op.services.length > 1 ? (
                    <BrandChipStack names={op.services} size={34} />
                  ) : (
                    <BrandChip name={op.services[0]} size={40} className="rounded-md" />
                  )}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[15px] font-semibold text-text-primary">
                        {op.title}
                      </h3>
                      <Badge variant={badgeVariant[op.badge]}>{op.badge}</Badge>
                    </div>
                    <p className="max-w-xl text-[13.5px] leading-relaxed text-text-secondary">
                      {op.description}
                    </p>
                    <span className="text-[12px] text-text-muted">{op.effort}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-divider pt-4 sm:flex-col sm:items-end sm:gap-2 sm:border-t-0 sm:pt-0">
                  <div className="text-right">
                    <p className="font-numeric text-[18px] font-medium text-success">
                      +{formatCurrency(op.monthlySavings, { cents: true })}
                    </p>
                    <p className="text-[11.5px] text-text-muted">per month</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
