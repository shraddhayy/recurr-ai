import { Sparkles, TrendingUp, CalendarClock, PiggyBank, AlertTriangle } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiInsights } from "@/lib/mock-data";
import { BrandChip, BrandChipStack } from "@/components/shared/brand-chip";
import { cn } from "@/lib/utils";

const kindConfig = {
  trend: { icon: TrendingUp, accent: "bg-secondary-50 text-secondary", dot: "bg-secondary-500", label: "Trend" },
  renewal: { icon: CalendarClock, accent: "bg-warning-50 text-warning-strong", dot: "bg-warning-500", label: "Renewal" },
  savings: { icon: PiggyBank, accent: "bg-primary-50 text-primary-600", dot: "bg-primary-500", label: "Savings" },
  alert: { icon: AlertTriangle, accent: "bg-error-50 text-error-strong", dot: "bg-error-500", label: "Alert" },
} as const;

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="AI Insights"
        title="What Recurr AI noticed"
        description="A running feed of patterns, anomalies, and recommendations pulled from your subscription activity."
      />

      <Card className="border-neutral-900 bg-neutral-950">
        <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-white/10">
              <Sparkles className="size-4 text-white" />
            </span>
            <div>
              <p className="text-[13.5px] font-medium text-white">Recurr AI is watching 14 subscriptions</p>
              <p className="text-[12.5px] text-neutral-400">
                New insights appear automatically as billing and usage data comes in.
              </p>
            </div>
          </div>
          <Badge variant="insight">4 new this week</Badge>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {aiInsights.map((insight) => {
          const { icon: Icon, accent, dot, label } = kindConfig[insight.kind];
          const hasServices = insight.services.length > 0;
          return (
            <Card key={insight.id} className="p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-start gap-4">
                {hasServices ? (
                  insight.services.length > 1 ? (
                    <BrandChipStack names={insight.services} size={30} />
                  ) : (
                    <span className="relative shrink-0">
                      <BrandChip name={insight.services[0]} size={36} className="rounded-md" />
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-surface-card",
                          dot
                        )}
                      />
                    </span>
                  )
                ) : (
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${accent}`}>
                    <Icon className="size-[17px]" strokeWidth={1.75} />
                  </span>
                )}
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[14.5px] font-semibold text-text-primary">
                        {insight.title}
                      </h3>
                      {hasServices && (
                        <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${accent}`}>
                          {label}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-text-muted">{insight.timestamp}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-text-secondary">{insight.body}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
