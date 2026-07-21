"use client";

import { useMemo, useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { MarketsHero } from "@/components/markets/MarketsHero";
import { FilterTabs, type MarketFilter } from "@/components/markets/FilterTabs";
import { InstrumentCard } from "@/components/markets/InstrumentCard";
import { instruments, holdings, getHolding } from "@/lib/marketData";

export default function MarketsPage() {
  const [filter, setFilter] = useState<MarketFilter>("all");

  const { investedValue, currentValue } = useMemo(() => {
    return holdings.reduce(
      (acc, h) => {
        const inst = instruments.find((i) => i.symbol === h.symbol);
        if (!inst) return acc;
        acc.investedValue += h.quantity * h.avgCost;
        acc.currentValue += h.quantity * inst.currentPrice;
        return acc;
      },
      { investedValue: 0, currentValue: 0 }
    );
  }, []);

  const filtered = instruments.filter((inst) => {
    if (filter === "all") return true;
    if (filter === "holdings") return Boolean(getHolding(inst.symbol));
    return inst.type === filter;
  });

  return (
    <div className="mkt-scope relative min-h-dvh bg-mkt-bg">
      <TopBanner />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(0, 55, 159, 0.08)" }}
        />
        <div
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(91, 141, 239, 0.1)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <MarketsHero investedValue={investedValue} currentValue={currentValue} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-mkt-muted">
            Pilot List · 10 Stocks &amp; 6 Mutual Funds
          </h2>
          <FilterTabs active={filter} onChange={setFilter} />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((inst, i) => (
            <InstrumentCard
              key={inst.symbol}
              instrument={inst}
              holding={getHolding(inst.symbol)}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-panel mt-8 rounded-2xl p-12 text-center text-sm text-mkt-muted">
            Nothing here yet — try a different filter.
          </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-mkt-muted">
          Prices, ratios, and fund data shown are illustrative mock data for this pilot and do
          not reflect live markets. Bajaj Finserv Asset Management is registered with SEBI;
          mutual fund investments are subject to market risks. Data is handled under the
          RBI-regulated Account Aggregator framework and the DPDP Act, 2023.
        </p>
      </div>
    </div>
  );
}
