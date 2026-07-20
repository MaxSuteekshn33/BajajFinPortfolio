"use client";

import { formatPrice } from "@/lib/format";

export function RangeBar({
  label,
  low,
  high,
  current,
}: {
  label: string;
  low: number;
  high: number;
  current: number;
}) {
  const pct = high === low ? 50 : ((current - low) / (high - low)) * 100;
  const clamped = Math.min(100, Math.max(0, pct));

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-mkt-muted">
        <span className="font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-white/10">
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-mkt-bg bg-mkt-accent shadow-[0_0_0_2px_rgba(91,141,239,0.4)]"
          style={{ left: `calc(${clamped}% - 6px)` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs tabular-nums text-mkt-text">
        <span>{formatPrice(low)}</span>
        <span>{formatPrice(high)}</span>
      </div>
    </div>
  );
}
