"use client";

import { useState } from "react";
import { KeyRound, ArrowRight, TrendingUp, TrendingDown, Wallet, PauseCircle, PlayCircle, User } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Riskometer } from "./Riskometer";
import { generateMockPortfolio, MockPortfolio } from "@/lib/mockPortfolio";

const CATEGORY_TONE: Record<string, "blue" | "green" | "gold"> = {
  equity: "blue",
  debt: "green",
  hybrid: "gold",
};

function inr(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function PortfolioLookup() {
  const [code, setCode] = useState("");
  const [portfolio, setPortfolio] = useState<MockPortfolio | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setPortfolio(generateMockPortfolio(code));
  }

  return (
    <>
      <div className="glass-cta relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/80 via-primary-light/60 to-white/40 p-5 shadow-[0_8px_30px_rgba(0,55,159,0.08)] backdrop-blur-xl sm:max-w-md">
        <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <KeyRound size={18} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold text-primary-dark">Already investing with us?</p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              Enter your investor code to pull up your live portfolio — holdings, SIPs and gains, all in one view.
            </p>
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="e.g. AABCD"
                className="w-full min-w-0 flex-1 rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm font-semibold tracking-wide text-primary-dark outline-none placeholder:font-normal placeholder:text-gray-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!code.trim()}
                className="flex shrink-0 items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                View <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal open={!!portfolio} onClose={() => setPortfolio(null)} maxWidth="max-w-2xl">
        {portfolio && <PortfolioView portfolio={portfolio} />}
      </Modal>
    </>
  );
}

function PortfolioView({ portfolio }: { portfolio: MockPortfolio }) {
  const isGain = portfolio.totalGain >= 0;

  return (
    <div className="p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <User size={20} />
        </span>
        <div>
          <p className="text-base font-bold text-primary-dark">{portfolio.investorName}</p>
          <p className="text-xs text-gray-400">
            Folio {portfolio.folioNumber} &middot; Investor since {portfolio.memberSince}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-surface-muted p-4 sm:grid-cols-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">Invested</p>
          <p className="mt-0.5 text-sm font-bold text-primary-dark tabular-nums">{inr(portfolio.totalInvested)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">Current value</p>
          <p className="mt-0.5 text-sm font-bold text-primary-dark tabular-nums">{inr(portfolio.totalCurrent)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">Overall gain</p>
          <p className={`mt-0.5 flex items-center gap-1 text-sm font-bold tabular-nums ${isGain ? "text-gain" : "text-loss"}`}>
            {isGain ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {inr(Math.abs(portfolio.totalGain))} ({portfolio.totalGainPct.toFixed(1)}%)
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">XIRR</p>
          <p className="mt-0.5 text-sm font-bold text-gain tabular-nums">{portfolio.xirr.toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        Holdings ({portfolio.holdings.length})
      </p>
      <div className="mt-2 flex flex-col gap-3">
        {portfolio.holdings.map((h) => {
          const gain = h.currentValue - h.investedAmount;
          const gainPct = (gain / h.investedAmount) * 100;
          const gainPositive = gain >= 0;
          return (
            <div key={h.scheme.id} className="rounded-xl border border-black/5 bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Riskometer level={h.scheme.riskLevel} size={64} showLabel={false} />
                  <div>
                    <Badge tone={CATEGORY_TONE[h.scheme.category]}>{h.scheme.subCategory}</Badge>
                    <p className="mt-1.5 text-sm font-bold text-primary-dark leading-snug">{h.scheme.name}</p>
                    <p className="mt-1 text-[11px] text-gray-400 capitalize">
                      {h.plan} plan &middot; {h.units.toLocaleString("en-IN")} units
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-primary-dark tabular-nums">{inr(h.currentValue)}</p>
                  <p className={`text-xs font-semibold tabular-nums ${gainPositive ? "text-gain" : "text-loss"}`}>
                    {gainPositive ? "+" : ""}
                    {gainPct.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2.5 text-[11px] text-gray-500">
                <span>Invested: <span className="font-semibold text-primary-dark">{inr(h.investedAmount)}</span></span>
                {h.sip ? (
                  <span className={`flex items-center gap-1 font-semibold ${h.sip.active ? "text-gain" : "text-gray-400"}`}>
                    {h.sip.active ? <PlayCircle size={12} /> : <PauseCircle size={12} />}
                    SIP {h.sip.active ? "active" : "paused"} &middot; {inr(h.sip.amount)}/mo
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400">
                    <Wallet size={12} /> One-time lumpsum
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-[10px] leading-relaxed text-gray-400">
        Demo view generated for illustration from the code you entered — no real account data is accessed. In production this would authenticate against your actual folio.
      </p>
    </div>
  );
}
