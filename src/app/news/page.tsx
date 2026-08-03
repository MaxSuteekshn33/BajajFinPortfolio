"use client";

import { useMemo, useState } from "react";
import { Newspaper, Sparkle } from "lucide-react";
import { newsItems } from "@/data/news";
import { getSchemeById } from "@/data/schemes";
import { personas } from "@/data/quiz";
import { useStoredPersona } from "@/lib/persona";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type CategoryFilter = "all" | "equity" | "debt" | "hybrid" | "macro" | "regulatory";

const CATEGORY_TONE: Record<string, "blue" | "green" | "gold" | "grey"> = {
  equity: "blue",
  debt: "green",
  hybrid: "gold",
  macro: "grey",
  regulatory: "grey",
};

export default function NewsPage() {
  const persona = useStoredPersona();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [onlyRelevant, setOnlyRelevant] = useState(false);

  const filtered = useMemo(() => {
    return newsItems.filter((n) => {
      if (category !== "all" && n.category !== category) return false;
      if (onlyRelevant && persona && !n.relevantPersonas.includes(persona)) return false;
      return true;
    });
  }, [category, onlyRelevant, persona]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <Newspaper size={22} className="text-primary" />
        <h1 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
          News Tracker
        </h1>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Market and fund-relevant news, tagged to your persona and holdings.
      </p>

      {persona && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-light px-4 py-2.5 text-xs font-medium text-primary">
          <Sparkle size={13} />
          Showing relevance for your <strong>{personas[persona].name}</strong> profile.
          <button
            onClick={() => setOnlyRelevant((v) => !v)}
            className="ml-auto rounded-lg bg-primary px-3 py-1 text-[11px] font-semibold text-white"
          >
            {onlyRelevant ? "Show all news" : "Show only relevant"}
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {(["all", "equity", "debt", "hybrid", "macro", "regulatory"] as CategoryFilter[]).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
              category === c
                ? "bg-primary text-white"
                : "bg-surface-muted text-gray-500 hover:bg-primary-light hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((n) => {
          const isRelevant = persona ? n.relevantPersonas.includes(persona) : false;
          return (
            <Card key={n.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={CATEGORY_TONE[n.category] ?? "grey"}>{n.category}</Badge>
                {isRelevant && <Badge tone="gold">Relevant to you</Badge>}
                <span className="text-[11px] text-gray-400">
                  {n.source} · {new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-primary-dark">{n.headline}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{n.summary}</p>
              {n.relevantSchemeIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {n.relevantSchemeIds.map((id) => {
                    const s = getSchemeById(id);
                    if (!s) return null;
                    return (
                      <span key={id} className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-gray-500">
                        {s.subCategory}
                      </span>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            No news matches these filters.
          </p>
        )}
      </div>
    </div>
  );
}
