import { TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpendTrendChart } from "@/components/patterns/spend-trend-chart";
import { CategoryBreakdownChart } from "@/components/patterns/category-breakdown-chart";
import { categoryBreakdown } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const total = categoryBreakdown.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Analytics"
        title="Where your money is actually going"
        description="A category-level breakdown of recurring spend, updated as new charges come in."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Spend trend</CardTitle>
              <CardDescription>Total recurring spend, last 6 months</CardDescription>
            </div>
            <Badge variant="active" dot>
              <TrendingUp className="size-3" />
              +6.6% MoM
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <SpendTrendChart />
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>By category</CardTitle>
            <CardDescription>{formatCurrency(total)} tracked this month</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <CategoryBreakdownChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category detail</CardTitle>
          <CardDescription>Monthly spend and share of total, by category</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          {categoryBreakdown
            .slice()
            .sort((a, b) => b.amount - a.amount)
            .map((c) => {
              const pct = (c.amount / total) * 100;
              return (
                <div key={c.category} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2 font-medium text-text-primary">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: c.color }}
                        aria-hidden="true"
                      />
                      {c.category}
                    </span>
                    <span className="font-numeric text-text-secondary">
                      {formatCurrency(c.amount, { cents: true })}{" "}
                      <span className="text-text-muted">· {pct.toFixed(0)}%</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{ width: `${pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}
