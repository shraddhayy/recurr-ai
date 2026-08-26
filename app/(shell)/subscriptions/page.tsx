"use client";

import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Repeat2 } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/patterns/empty-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subscriptions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { BrandChip } from "@/components/shared/brand-chip";

const statusVariant = {
  active: "active",
  expiring: "expiring",
  renewing: "renewing",
} as const;

const statusLabel = {
  active: "Active",
  expiring: "Expiring",
  renewing: "Renewing",
} as const;

export default function SubscriptionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(subscriptions.map((s) => s.category)))],
    []
  );

  const filtered = subscriptions.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || s.category === category;
    return matchesQuery && matchesCategory;
  });

  const total = filtered.reduce(
    (sum, s) => sum + (s.cycle === "Yearly" ? s.amount / 12 : s.amount),
    0
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Subscriptions"
        title="Every recurring charge, in one place"
        description={`${subscriptions.length} active subscriptions · ${formatCurrency(total)} tracked this month`}
        actions={
          <Button size="md">
            <Plus className="size-4" />
            Add subscription
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-divider p-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Search subscriptions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startIcon={<Search />}
            className="sm:max-w-xs"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="md" className="sm:ml-auto">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </div>

        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Repeat2}
                title="No subscriptions match your search"
                description="Try a different name or clear your filters to see everything you're tracking."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </div>
          ) : (
            <>
              {/* Column headings — desktop only */}
              <div className="hidden grid-cols-[1fr_140px_120px_120px_110px] gap-4 px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide text-text-muted md:grid">
                <span>Subscription</span>
                <span>Category</span>
                <span>Status</span>
                <span>Renews</span>
                <span className="text-right">Amount</span>
              </div>
              <Separator className="hidden md:block" />
              <div className="flex flex-col">
                {filtered.map((sub, i) => (
                  <div key={sub.id}>
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-surface-muted/60 md:grid-cols-[1fr_140px_120px_120px_110px] md:items-center md:gap-4">
                      <div className="flex items-center gap-3">
                        <BrandChip name={sub.name} size={36} className="rounded-md" />
                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-medium text-text-primary">{sub.name}</p>
                          <p className="text-[12px] text-text-muted md:hidden">{sub.category}</p>
                        </div>
                      </div>
                      <span className="hidden text-[13px] text-text-secondary md:block">{sub.category}</span>
                      <Badge variant={statusVariant[sub.status]} dot className="w-fit">
                        {statusLabel[sub.status]}
                      </Badge>
                      <span className="text-[13px] text-text-secondary">{sub.nextRenewal}</span>
                      <div className="text-left md:text-right">
                        <span className="font-numeric text-[13.5px] font-medium text-text-primary">
                          {formatCurrency(sub.amount, { cents: true })}
                        </span>
                        <span className="ml-1 text-[11.5px] text-text-muted">
                          /{sub.cycle === "Monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                    </div>
                    {i < filtered.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
