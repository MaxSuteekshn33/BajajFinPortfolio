"use client";

import { useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";
import { educationArticles, EducationArticle } from "@/data/education";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

const CATEGORIES = [
  "All",
  "Basics",
  "SIP Investing",
  "Taxation",
  "Risk",
  "Goal Planning",
] as const;

export default function LearnPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<EducationArticle | null>(null);

  const filtered = useMemo(() => {
    if (category === "All") return educationArticles;
    return educationArticles.filter((a) => a.category === category);
  }, [category]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <GraduationCap size={22} className="text-primary" />
        <h1 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
          Bajaj Finserv Learn
        </h1>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Financial literacy explainers — mutual fund basics, SIP investing, taxation, risk and goal planning.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              category === c
                ? "bg-primary text-white"
                : "bg-surface-muted text-gray-500 hover:bg-primary-light hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {filtered.map((a) => (
          <Card
            key={a.slug}
            className="cursor-pointer p-5 transition-shadow hover:shadow-md"
            onClick={() => setActive(a)}
          >
            <Badge tone="blue">{a.category}</Badge>
            <h3 className="mt-2.5 text-sm font-bold text-primary-dark leading-snug">
              {a.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{a.summary}</p>
            <p className="mt-3 text-[11px] font-semibold text-primary">
              {a.readMins} min read →
            </p>
          </Card>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} maxWidth="max-w-lg">
        {active && (
          <div className="p-7">
            <Badge tone="blue">{active.category}</Badge>
            <h2 className="mt-2.5 text-lg font-bold text-primary-dark">{active.title}</h2>
            <p className="mt-1 text-xs text-gray-400">{active.readMins} min read</p>

            <div className="mt-4 space-y-4">
              {active.sections.map((s) => (
                <div key={s.heading}>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
                    {s.heading}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
