"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categoryBreakdown } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function CategoryBreakdownChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryBreakdown}
            dataKey="amount"
            nameKey="category"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            strokeWidth={0}
          >
            {categoryBreakdown.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              return (
                <div className="rounded-md border border-border-default bg-surface-card px-3 py-2 shadow-md">
                  <p className="text-[11.5px] text-text-muted">{item.name}</p>
                  <p className="font-numeric text-[13px] font-medium text-text-primary">
                    {formatCurrency(item.value as number, { cents: true })}
                  </p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
