"use client";

export type MarketFilter = "all" | "holdings" | "stock" | "mutual_fund";

const filters: { id: MarketFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "holdings", label: "My Holdings" },
  { id: "stock", label: "Stocks" },
  { id: "mutual_fund", label: "Mutual Funds" },
];

export function FilterTabs({
  active,
  onChange,
}: {
  active: MarketFilter;
  onChange: (f: MarketFilter) => void;
}) {
  return (
    <div className="glass-panel inline-flex flex-wrap gap-1 rounded-full p-1">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
            active === f.id
              ? "bg-mkt-accent text-white"
              : "text-mkt-muted hover:bg-black/[0.04] hover:text-mkt-text"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
