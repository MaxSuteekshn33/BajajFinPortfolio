"use client";

import { ReactNode } from "react";
import { ShieldHalf, Wallet, TrendingUp, ChevronDown } from "lucide-react";
import { RiskLevel, RISK_LEVELS, SchemeCategory } from "@/data/schemes";
import { RadialCategoryOrbit } from "./RadialCategoryOrbit";

export interface Filters {
  category: SchemeCategory | "all";
  risk: RiskLevel | "all";
  minSip: number | "all";
  cagrBucket: "all" | "0-8" | "8-15" | "15+";
}

export const defaultFilters: Filters = {
  category: "all",
  risk: "all",
  minSip: "all",
  cagrBucket: "all",
};

function Select<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: ReactNode;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const isActive = value !== "all";
  return (
    <div className="min-w-[150px] flex-1">
      <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </label>
      <div
        className={`group relative mt-1.5 flex items-center gap-2 rounded-xl border px-3 py-2.5 backdrop-blur-md transition-all ${
          isActive
            ? "border-primary/30 bg-primary-light/70 shadow-[0_2px_10px_rgba(0,55,159,0.08)]"
            : "border-white/60 bg-white/60 hover:border-primary/20 hover:bg-white/80"
        }`}
      >
        <span className={isActive ? "text-primary" : "text-gray-400"}>{icon}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="peer w-full cursor-pointer appearance-none bg-transparent text-xs font-semibold text-primary-dark outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none text-gray-400 transition-transform peer-focus:rotate-180" />
      </div>
    </div>
  );
}

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-4 shadow-[0_8px_24px_rgba(16,24,43,0.05)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex flex-wrap items-start gap-5">
        <RadialCategoryOrbit
          value={filters.category}
          onChange={(v) => onChange({ ...filters, category: v })}
        />
        <div className="flex flex-1 flex-wrap gap-3 pt-1 sm:pt-6">
          <Select
            label="Risk level"
            icon={<ShieldHalf size={14} />}
            value={filters.risk}
            onChange={(v) => onChange({ ...filters, risk: v })}
            options={[
              { value: "all", label: "All risk levels" },
              ...RISK_LEVELS.map((r) => ({ value: r.level, label: r.label })),
            ]}
          />
          <Select
            label="Min SIP"
            icon={<Wallet size={14} />}
            value={String(filters.minSip)}
            onChange={(v) => onChange({ ...filters, minSip: v === "all" ? "all" : Number(v) })}
            options={[
              { value: "all", label: "Any amount" },
              { value: "500", label: "Up to ₹500" },
              { value: "1000", label: "Up to ₹1,000" },
            ]}
          />
          <Select
            label="3Y CAGR"
            icon={<TrendingUp size={14} />}
            value={filters.cagrBucket}
            onChange={(v) => onChange({ ...filters, cagrBucket: v })}
            options={[
              { value: "all", label: "Any return" },
              { value: "0-8", label: "0% – 8%" },
              { value: "8-15", label: "8% – 15%" },
              { value: "15+", label: "15%+" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
