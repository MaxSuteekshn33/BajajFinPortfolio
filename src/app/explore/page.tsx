"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, X } from "lucide-react";
import { schemes } from "@/data/schemes";
import { FilterBar, Filters, defaultFilters } from "@/components/schemes/FilterBar";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { ComparisonTable } from "@/components/schemes/ComparisonTable";
import { PortfolioLookup } from "@/components/schemes/PortfolioLookup";
import { Button } from "@/components/ui/Button";

export default function ExplorePage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      if (filters.category !== "all" && s.category !== filters.category) return false;
      if (filters.risk !== "all" && s.riskLevel !== filters.risk) return false;
      if (filters.minSip !== "all" && s.minSip > filters.minSip) return false;
      if (filters.cagrBucket !== "all") {
        if (filters.cagrBucket === "0-8" && !(s.cagr3y < 8)) return false;
        if (filters.cagrBucket === "8-15" && !(s.cagr3y >= 8 && s.cagr3y < 15)) return false;
        if (filters.cagrBucket === "15+" && !(s.cagr3y >= 15)) return false;
      }
      return true;
    });
  }, [filters]);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }

  const compareSchemes = schemes.filter((s) => compareIds.includes(s.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
            Explore Schemes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            The full Bajaj Finserv AMC fund shelf — equity, debt and hybrid.
          </p>
        </div>
        <Link href="/explore/calculators">
          <Button variant="secondary">
            <Calculator size={14} /> Calculators
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <PortfolioLookup />
      </div>

      <div className="mt-4">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <p className="mt-4 text-xs text-gray-400">
        {filtered.length} scheme{filtered.length !== 1 ? "s" : ""} match your filters
      </p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {filtered.map((s) => (
          <SchemeCard
            key={s.id}
            scheme={s}
            selected={compareIds.includes(s.id)}
            onToggleCompare={toggleCompare}
          />
        ))}
      </div>

      {compareIds.length >= 2 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-surface/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <p className="text-xs font-semibold text-gray-600">
              {compareIds.length} schemes selected for comparison
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCompareIds([])}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-surface-muted"
              >
                Clear
              </button>
              <Button onClick={() => setShowCompare(true)}>Compare</Button>
            </div>
          </div>
        </div>
      )}

      {showCompare && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/50 p-4" onClick={() => setShowCompare(false)}>
          <div
            className="mx-auto mt-10 max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Scheme Comparison</h2>
              <button
                onClick={() => setShowCompare(false)}
                className="rounded-full bg-surface p-2 text-gray-500 hover:bg-surface-muted"
              >
                <X size={16} />
              </button>
            </div>
            <ComparisonTable schemes={compareSchemes} />
          </div>
        </div>
      )}
    </div>
  );
}
