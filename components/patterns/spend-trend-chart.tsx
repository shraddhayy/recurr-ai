"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { monthlySpendTrend } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function SpendTrendChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlySpendTrend} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--parrot-500)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--parrot-500)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--neutral-150)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--neutral-500)", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--neutral-500)", fontSize: 12 }}
            tickFormatter={(v) => `$${v}`}
            width={52}
          />
          <Tooltip
            cursor={{ stroke: "var(--neutral-300)", strokeDasharray: 4 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-md border border-border-default bg-surface-card px-3 py-2 shadow-md">
                  <p className="text-[11.5px] text-text-muted">{label}</p>
                  <p className="font-numeric text-[13px] font-medium text-text-primary">
                    {formatCurrency(payload[0].value as number)}
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="var(--parrot-600)"
            strokeWidth={2}
            fill="url(#spendFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
