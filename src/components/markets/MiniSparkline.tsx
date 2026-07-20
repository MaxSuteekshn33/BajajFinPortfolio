"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import type { PricePoint } from "@/lib/marketData";

export function MiniSparkline({ data, positive }: { data: PricePoint[]; positive: boolean }) {
  const color = positive ? "var(--color-mkt-gain)" : "var(--color-mkt-loss)";
  const gradientId = `spark-${positive ? "up" : "down"}`;

  return (
    <div className="h-12 w-24 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Area
            type="monotone"
            dataKey="close"
            stroke={color}
            strokeWidth={1.75}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
