"use client";

import { Tooltip } from "@/components/ui/Tooltip";
import { Info } from "lucide-react";

export function StatTile({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "gain" | "loss" | "neutral";
}) {
  const valueColor =
    tone === "gain" ? "text-mkt-gain" : tone === "loss" ? "text-mkt-loss" : "text-mkt-text";

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-mkt-muted">
        {label}
        {hint && (
          <Tooltip content={hint}>
            <Info size={11} className="cursor-pointer opacity-70" />
          </Tooltip>
        )}
      </div>
      <p className={`tabular-nums mt-1.5 text-lg font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
