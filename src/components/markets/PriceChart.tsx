"use client";

import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { sliceRange, type ChartRange, type PricePoint } from "@/lib/marketData";
import { formatPrice } from "@/lib/format";

const ranges: ChartRange[] = ["1W", "1M", "6M", "1Y"];

function formatTick(date: string, range: ChartRange) {
  const d = new Date(date);
  if (range === "1W" || range === "1M") {
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

export function PriceChart({ history, positive }: { history: PricePoint[]; positive: boolean }) {
  const [range, setRange] = useState<ChartRange>("1M");
  const data = sliceRange(history, range);
  const color = positive ? "var(--color-mkt-gain)" : "var(--color-mkt-loss)";

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-mkt-text">Price history</h3>
        <div className="flex gap-1 rounded-full bg-white/5 p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
                range === r ? "bg-mkt-accent text-white" : "text-mkt-muted hover:text-mkt-text"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(v) => formatTick(v, range)}
              tick={{ fill: "#8b93a7", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: "#8b93a7", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={56}
              tickFormatter={(v) => `₹${Math.round(v)}`}
            />
            <Tooltip
              contentStyle={{
                background: "#0b1220",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: "#8b93a7" }}
              itemStyle={{ color: "#f1f5f9" }}
              formatter={(value) => [formatPrice(Number(value)), "Close"]}
              labelFormatter={(v) => formatTick(v, range)}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={color}
              strokeWidth={2}
              fill="url(#priceFill)"
              isAnimationActive={true}
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
