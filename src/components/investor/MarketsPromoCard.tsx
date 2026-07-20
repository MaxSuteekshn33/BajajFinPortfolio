"use client";

import Link from "next/link";
import { LineChart, ArrowRight } from "lucide-react";
import { stocks, mutualFunds, holdings } from "@/lib/marketData";

export function MarketsPromoCard() {
  const preview = [...stocks.slice(0, 2), mutualFunds[0]];

  return (
    <Link
      href="/markets"
      className="group relative block cursor-pointer overflow-hidden rounded-3xl p-6 sm:p-7"
      style={{
        background: "linear-gradient(135deg, #060a17 0%, #0b1220 55%, #131b30 100%)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#5b8def]/20 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-[#a78bfa]/15 blur-[70px]" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
            <LineChart size={12} />
            New · Markets
          </div>
          <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">
            Your stocks &amp; mutual funds, in one place
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-white/60">
            See what you already hold across {holdings.length} instruments, plus{" "}
            {stocks.length + mutualFunds.length - holdings.length} more to research — with
            charts, P/E, debt-to-equity, and fund ratios for every one.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
            Explore Markets
            <ArrowRight size={15} />
          </span>
        </div>

        <div className="flex shrink-0 -space-x-3 sm:flex-col sm:-space-x-0 sm:-space-y-3">
          {preview.map((inst) => (
            <div
              key={inst.symbol}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 text-[10px] font-bold text-[#060a17] shadow-lg"
              style={{ background: inst.accent, borderColor: "#0b1220" }}
            >
              {inst.monogram}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
