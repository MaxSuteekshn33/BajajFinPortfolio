"use client";

import { Wallet, Compass } from "lucide-react";
import { formatINR, formatPrice, formatChangePercent } from "@/lib/format";
import type { Holding, Instrument } from "@/lib/marketData";

export function HoldingBanner({
  instrument,
  holding,
}: {
  instrument: Instrument;
  holding?: Holding;
}) {
  const unitLabel = instrument.type === "stock" ? "shares" : "units";

  if (!holding) {
    return (
      <div className="glass-panel flex flex-wrap items-center gap-3 rounded-2xl p-5 sm:p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-mkt-muted">
          <Compass size={16} />
        </span>
        <div>
          <p className="text-sm font-semibold text-mkt-text">You don&apos;t hold this yet</p>
          <p className="text-xs text-mkt-muted">
            This instrument is part of the pilot discovery list — shown here purely for research.
          </p>
        </div>
      </div>
    );
  }

  const currentValue = holding.quantity * instrument.currentPrice;
  const investedValue = holding.quantity * holding.avgCost;
  const pnl = currentValue - investedValue;
  const pnlPct = investedValue ? (pnl / investedValue) * 100 : 0;
  const positive = pnl >= 0;

  return (
    <div className="glass-panel-strong rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-mkt-accent">
        <Wallet size={13} />
        Your holding
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mkt-muted">Quantity</p>
          <p className="tabular-nums mt-0.5 text-sm font-bold text-mkt-text">
            {holding.quantity % 1 === 0 ? holding.quantity : holding.quantity.toFixed(2)}{" "}
            {unitLabel}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mkt-muted">Avg. cost</p>
          <p className="tabular-nums mt-0.5 text-sm font-bold text-mkt-text">
            {formatPrice(holding.avgCost)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mkt-muted">Current value</p>
          <p className="tabular-nums mt-0.5 text-sm font-bold text-mkt-text">
            {formatINR(Math.round(currentValue))}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mkt-muted">P&amp;L</p>
          <p
            className={`tabular-nums mt-0.5 text-sm font-bold ${
              positive ? "text-mkt-gain" : "text-mkt-loss"
            }`}
          >
            {positive ? "+" : ""}
            {formatINR(Math.round(pnl))} ({formatChangePercent(pnlPct)})
          </p>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-mkt-muted">
        Held since {new Date(holding.firstBuyDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
