"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { MiniSparkline } from "./MiniSparkline";
import { formatPrice, formatChangePercent, formatINRCompact } from "@/lib/format";
import {
  generatePriceHistory,
  getVolatility,
  sliceRange,
  type Instrument,
  type Holding,
} from "@/lib/marketData";

export function InstrumentCard({
  instrument,
  holding,
  index = 0,
}: {
  instrument: Instrument;
  holding?: Holding;
  index?: number;
}) {
  const change = instrument.currentPrice - instrument.prevClose;
  const changePct = (change / instrument.prevClose) * 100;
  const positive = change >= 0;

  const history = sliceRange(
    generatePriceHistory(instrument.symbol, instrument.currentPrice, getVolatility(instrument)),
    "1M"
  );

  const currentValue = holding ? holding.quantity * instrument.currentPrice : 0;
  const investedValue = holding ? holding.quantity * holding.avgCost : 0;
  const pnl = currentValue - investedValue;
  const pnlPct = investedValue ? (pnl / investedValue) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 10) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="min-w-0"
    >
      <Link href={`/markets/${instrument.symbol}`} className="group block cursor-pointer">
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-2xl p-4 transition-colors duration-200 group-hover:border-black/10 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-primary-dark"
                style={{ background: instrument.accent }}
              >
                {instrument.monogram}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-mkt-text">{instrument.name}</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-mkt-muted">
                  <span className="font-mono">{instrument.symbol}</span>
                  <span aria-hidden>·</span>
                  <span className="truncate">{instrument.category}</span>
                </div>
              </div>
            </div>
            {holding && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-mkt-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-mkt-accent">
                <Wallet size={10} />
                Owned
              </span>
            )}
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="tabular-nums text-xl font-bold text-mkt-text sm:text-2xl">
                {formatPrice(instrument.currentPrice)}
              </p>
              <span
                className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  positive ? "bg-mkt-gain-soft text-mkt-gain" : "bg-mkt-loss-soft text-mkt-loss"
                }`}
              >
                {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {formatChangePercent(changePct)}
              </span>
            </div>
            <MiniSparkline data={history} positive={positive} />
          </div>

          <div className="mt-4 border-t border-mkt-border pt-3">
            {holding ? (
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
                <span className="text-mkt-muted">
                  {holding.quantity % 1 === 0 ? holding.quantity : holding.quantity.toFixed(2)}{" "}
                  {instrument.type === "stock" ? "shares" : "units"} · Invested{" "}
                  {formatINRCompact(Math.round(investedValue))}
                </span>
                <span
                  className={`font-semibold tabular-nums ${pnl >= 0 ? "text-mkt-gain" : "text-mkt-loss"}`}
                >
                  {pnl >= 0 ? "+" : ""}
                  {formatINRCompact(Math.round(pnl))} ({formatChangePercent(pnlPct)})
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                {instrument.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] text-mkt-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
