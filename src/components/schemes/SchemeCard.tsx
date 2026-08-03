"use client";

import { useState } from "react";
import { Info, TrendingUp, ShieldCheck, Layers, Sparkles, LucideIcon } from "lucide-react";
import { Scheme } from "@/data/schemes";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AiTag } from "@/components/ui/AiTag";
import { Tooltip } from "@/components/ui/Tooltip";
import { useStoredPersona } from "@/lib/persona";
import { Riskometer } from "./Riskometer";
import { InvestModal } from "./InvestModal";

const CATEGORY_TONE: Record<Scheme["category"], "blue" | "green" | "gold"> = {
  equity: "blue",
  debt: "green",
  hybrid: "gold",
};

const CATEGORY_ICON: Record<Scheme["category"], LucideIcon> = {
  equity: TrendingUp,
  debt: ShieldCheck,
  hybrid: Layers,
};

const CATEGORY_ICON_BG: Record<Scheme["category"], string> = {
  equity: "bg-primary",
  debt: "bg-gain",
  hybrid: "bg-accent-dark",
};

export function SchemeCard({
  scheme,
  showAiTag = false,
  showActions = true,
  selected = false,
  onToggleCompare,
}: {
  scheme: Scheme;
  showAiTag?: boolean;
  showActions?: boolean;
  selected?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  const [plan, setPlan] = useState<"direct" | "regular">("direct");
  const [investMode, setInvestMode] = useState<"sip" | "lumpsum" | "redeem" | null>(null);
  const delta = scheme.expenseRatio.regular - scheme.expenseRatio.direct;
  const persona = useStoredPersona();
  const featured = !!persona && scheme.personaFit.includes(persona);
  const CategoryIcon = CATEGORY_ICON[scheme.category];

  return (
    <Card
      className={`group relative flex flex-col gap-4 overflow-hidden border-white/60 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(16,24,43,0.1)] ${
        selected ? "ring-2 ring-primary" : featured ? "ring-1 ring-primary/40" : ""
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          scheme.category === "equity"
            ? "from-primary to-primary/40"
            : scheme.category === "debt"
              ? "from-gain to-gain/40"
              : "from-accent to-accent/40"
        }`}
      />

      {featured && (
        <div className="-mx-5 -mt-5 flex items-center gap-1.5 bg-primary px-5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
          <Sparkles size={11} /> Matches your profile
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${CATEGORY_ICON_BG[scheme.category]}`}
          >
            <CategoryIcon size={18} />
          </span>
          <div>
            <Badge tone={CATEGORY_TONE[scheme.category]}>{scheme.subCategory}</Badge>
            <h3 className="mt-2 text-base font-bold text-black leading-snug">
              {scheme.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              {scheme.description}
            </p>
          </div>
        </div>
        <Riskometer level={scheme.riskLevel} size={110} />
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-muted p-3 text-center">
        <div>
          <p className="text-[10px] uppercase text-gray-400">1Y CAGR</p>
          <p className="text-sm font-bold text-gain">{scheme.cagr1y}%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-gray-400">3Y CAGR</p>
          <p className="text-sm font-bold text-gain">{scheme.cagr3y}%</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-gray-400">5Y CAGR</p>
          <p className="text-sm font-bold text-gain">{scheme.cagr5y}%</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-lg bg-surface-muted p-1">
            {(["direct", "regular"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`rounded-md px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                  plan === p ? "bg-primary text-white" : "text-gray-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Tooltip content="Direct and Regular hold the identical portfolio. Regular carries a higher expense ratio because part of it is paid out as trail commission to the distributor who facilitates your investment; Direct has none, so its NAV/returns run slightly higher over time.">
            <span className="flex cursor-help items-center gap-1 text-[10px] text-gray-400">
              <Info size={11} /> what&apos;s the difference?
            </span>
          </Tooltip>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-black/5 p-3 text-xs">
          <p className="text-gray-500">
            NAV:{" "}
            <span className="font-semibold text-primary-dark">
              ₹{scheme.nav[plan]}
            </span>
          </p>
          <p className="text-gray-500">
            Expense Ratio:{" "}
            <span className="font-semibold text-primary-dark">
              {scheme.expenseRatio[plan]}%
            </span>
          </p>
        </div>
        {plan === "regular" && (
          <p className="mt-1.5 text-[10px] text-alert">
            +{delta.toFixed(2)}% goes to distributor trail commission vs Direct
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600">
        <p>
          Fund Manager: <span className="font-semibold text-primary-dark">{scheme.fundManager}</span>
        </p>
        <p>
          Benchmark: <span className="font-semibold text-primary-dark">{scheme.benchmark}</span>
        </p>
        <p>
          AUM: <span className="font-semibold text-primary-dark">₹{scheme.aumCr.toLocaleString("en-IN")} Cr</span>
        </p>
        <p>
          Min SIP: <span className="font-semibold text-primary-dark">₹{scheme.minSip}</span>
        </p>
        <p>
          Exit Load: <span className="font-semibold text-primary-dark">{scheme.exitLoad}</span>
        </p>
        <p>
          Since: <span className="font-semibold text-primary-dark">{scheme.inceptionYear}</span>
        </p>
      </div>

      {showActions && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setInvestMode("sip")}
            className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-dark"
          >
            Invest via SIP
          </button>
          <button
            onClick={() => setInvestMode("lumpsum")}
            className="flex-1 rounded-lg border border-primary/30 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary-light"
          >
            Invest Lumpsum
          </button>
          <button
            onClick={() => setInvestMode("redeem")}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-surface-muted"
          >
            Redeem
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        {showAiTag ? <AiTag /> : <span />}
        {onToggleCompare && (
          <button
            onClick={() => onToggleCompare(scheme.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              selected
                ? "bg-primary text-white"
                : "border border-primary/30 text-primary hover:bg-primary-light"
            }`}
          >
            {selected ? "Added to compare" : "Add to compare"}
          </button>
        )}
      </div>

      {investMode && (
        <InvestModal
          scheme={scheme}
          mode={investMode}
          open={!!investMode}
          onClose={() => setInvestMode(null)}
        />
      )}
    </Card>
  );
}
