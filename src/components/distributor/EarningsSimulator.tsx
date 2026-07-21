"use client";

import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { distributorProfile } from "@/lib/mockData";
import { formatINRCompact } from "@/lib/format";

function projectedAnnualTrail(adoptionPct: number) {
  return distributorProfile.annualTrailIncomeBase * (0.85 + 0.55 * (adoptionPct / 100));
}

export function EarningsSimulator() {
  const [adoption, setAdoption] = useState(30);
  const projected = projectedAnnualTrail(adoption);
  const uplift = projected - projectedAnnualTrail(0);
  const upliftPct = Math.round((uplift / projectedAnnualTrail(0)) * 100);

  return (
    <Card className="p-7">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gain-soft text-gain">
          <Calculator size={18} />
        </div>
        <div>
          <h3 className="font-bold text-primary-dark">Earnings Simulator</h3>
          <p className="text-xs text-gray-400">
            Projected trail income as clients move to the assisted-direct model
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Projected annual trail income
          </p>
          <CountUp
            value={projected}
            format={formatINRCompact}
            className="mt-1 block text-3xl font-extrabold text-primary-dark"
          />
          {adoption > 0 && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-gain">
              <TrendingUp size={13} />+{upliftPct}% vs. 0% adoption
            </p>
          )}
        </div>

        <div className="w-full sm:w-64">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Clients on assisted-direct model</span>
            <span className="font-bold text-primary-dark">{adoption}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={adoption}
            onChange={(e) => setAdoption(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-[10px] text-gray-400">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
