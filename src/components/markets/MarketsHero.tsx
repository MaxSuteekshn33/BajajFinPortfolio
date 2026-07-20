"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { formatINR, formatChangePercent } from "@/lib/format";
import { investorProfile } from "@/lib/mockData";

export function MarketsHero({
  investedValue,
  currentValue,
}: {
  investedValue: number;
  currentValue: number;
}) {
  const pnl = currentValue - investedValue;
  const pnlPct = investedValue ? (pnl / investedValue) * 100 : 0;
  const positive = pnl >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel-strong rounded-3xl p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-mkt-muted">
        <Sparkles size={13} className="text-mkt-violet" />
        Personalized for {investorProfile.name.split(" ")[0]} · {investorProfile.persona}
      </div>
      <h1 className="mt-3 text-2xl font-bold text-mkt-text sm:text-3xl">
        Your stocks & mutual funds
      </h1>
      <p className="mt-1.5 max-w-xl text-sm text-mkt-muted">
        A single view of what you already hold, and how the rest of the pilot list has been
        moving — built from your own transaction history, not generic picks.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mkt-muted">
            Direct Holdings Value
          </p>
          <p className="tabular-nums mt-1 text-2xl font-extrabold text-mkt-text sm:text-3xl">
            {formatINR(Math.round(currentValue))}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mkt-muted">
            Overall Gain / Loss
          </p>
          <p
            className={`tabular-nums mt-1 text-xl font-bold sm:text-2xl ${
              positive ? "text-mkt-gain" : "text-mkt-loss"
            }`}
          >
            {positive ? "+" : ""}
            {formatINR(Math.round(pnl))}{" "}
            <span className="text-base">({formatChangePercent(pnlPct)})</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mkt-muted">Invested</p>
          <p className="tabular-nums mt-1 text-xl font-bold text-mkt-text sm:text-2xl">
            {formatINR(Math.round(investedValue))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
