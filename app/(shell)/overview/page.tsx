import { currentUser } from "@clerk/nextjs/server";
import { Wallet, Repeat2, CalendarClock, PiggyBank, ArrowRight, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { MetricCard } from "@/components/patterns/metric-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BrandChip } from "@/components/shared/brand-chip";
import { subscriptions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { SpendTrendChart } from "@/components/patterns/spend-trend-chart";

const statusVariant = {
  active: "active",
  expiring: "expiring",
  renewing: "renewing",
} as const;

function timeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function OverviewPage() {
  const user = await currentUser();
  const displayName =
    (user?.unsafeMetadata?.displayName as string | undefined) || user?.firstName || "there";

  const upcoming = subscriptions
    .slice()
    .sort((a, b) => a.nextRenewal.localeCompare(b.nextRenewal))
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Overview"
        title={`${timeOfDayGreeting()}, ${displayName}`}
        description="Here's how your recurring spend is trending this month."
        actions={
          <Button variant="outline" size="md">
            Export report
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total monthly spend"
          value={formatCurrency(371.86)}
          delta={6.6}
          deltaGood="down"
          icon={Wallet}
          accent="primary"
        />
        <MetricCard
          label="Active subscriptions"
          value="14"
          delta={2.1}
          deltaGood="down"
          icon={Repeat2}
          accent="secondary"
        />
        <MetricCard
          label="Renewing this week"
          value="3"
          icon={CalendarClock}
          accent="neutral"
        />
        <MetricCard
          label="Potential savings"
          value={formatCurrency(28.69)}
          suffix="/mo"
          icon={PiggyBank}
          accent="primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Spend over time</CardTitle>
              <CardDescription>Last 6 months, all subscriptions combined</CardDescription>
            </div>
            <Badge variant="neutral">Monthly</Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <SpendTrendChart />
          </CardContent>
        </Card>

        <Card className="flex flex-col border-primary-200 bg-gradient-to-b from-primary-50/60 to-surface-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-neutral-900">
                <Sparkles className="size-3.5 text-white" />
              </span>
              <CardTitle>AI Insight</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-3">
            <p className="text-[13.5px] leading-relaxed text-text-secondary">
              Your Cloud &amp; Dev category grew <span className="font-numeric font-medium text-text-primary">34%</span> month
              over month, mostly from AWS usage-based billing. Setting a soft budget alert could
              help you catch spikes earlier next time.
            </p>
            <Button variant="secondary" size="sm" className="self-start">
              Review AI Insights
              <ArrowRight className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Upcoming renewals</CardTitle>
            <CardDescription>What&apos;s about to charge next</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href="/subscriptions">
              View all
              <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-col">
            {upcoming.map((sub, i) => (
              <div key={sub.id}>
                <div className="flex items-center gap-4 py-3">
                  <BrandChip name={sub.name} size={40} className="rounded-md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-text-primary">{sub.name}</p>
                    <p className="text-[12px] text-text-muted">{sub.category}</p>
                  </div>
                  <Badge variant={statusVariant[sub.status]} dot>
                    {sub.status === "active" ? "Active" : sub.status === "expiring" ? "Expiring" : "Renewing"}
                  </Badge>
                  <div className="w-20 text-right">
                    <p className="font-numeric text-[13.5px] font-medium text-text-primary">
                      {formatCurrency(sub.amount, { cents: true })}
                    </p>
                    <p className="text-[11.5px] text-text-muted">{sub.nextRenewal}</p>
                  </div>
                </div>
                {i < upcoming.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
