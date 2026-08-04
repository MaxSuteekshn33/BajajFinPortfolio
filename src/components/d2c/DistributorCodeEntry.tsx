"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { generateMockPortfolio } from "@/lib/mockPortfolio";
import { resolveRelationshipManager } from "@/lib/distributorIdentity";
import { setStoredDistributorLink, addLinkedClient } from "@/lib/distributorLink";
import { RelationshipManagerCard } from "./RelationshipManagerCard";

export function DistributorCodeEntry({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");
  const [linked, setLinked] = useState<{ investorName: string; code: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    const trimmed = code.trim().toUpperCase();
    const portfolio = generateMockPortfolio(trimmed);
    setStoredDistributorLink(trimmed);
    addLinkedClient({ code: trimmed, investorName: portfolio.investorName });
    setLinked({ investorName: portfolio.investorName, code: trimmed });
  }

  if (linked) {
    const rm = resolveRelationshipManager(linked.code);
    return (
      <div className="mx-auto max-w-md space-y-3">
        <RelationshipManagerCard rm={rm} investorName={linked.investorName} />
        <button onClick={onBack} className="text-xs font-semibold text-gray-400 hover:text-primary">
          &larr; Back
        </button>
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-md p-5">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-primary">
        <ArrowLeft size={12} /> Back
      </button>
      <div className="mt-3 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
          <KeyRound size={18} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-primary-dark">Enter your distributor code</p>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
            We&rsquo;ll link your account to your relationship manager for transparency and support.
          </p>
          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 10))}
              placeholder="e.g. AABCD"
              className="w-full min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold tracking-wide text-primary-dark outline-none placeholder:font-normal placeholder:text-gray-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={!code.trim()}
              className="flex shrink-0 items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Link <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
}
