"use client";

import { useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";
import { distributorLessons, DistributorLesson } from "@/data/distributorLessons";
import { LessonCard } from "@/components/distributor/LessonCard";
import { LessonModal } from "@/components/distributor/LessonModal";

const CATEGORIES = ["All", "Market Update", "Product Training"] as const;

export default function DistributorLearnPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [active, setActive] = useState<DistributorLesson | null>(null);

  const filtered = useMemo(() => {
    if (category === "All") return distributorLessons;
    return distributorLessons.filter((l) => l.category === category);
  }, [category]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap size={22} className="text-primary" />
          <h1 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">Learning hub</h1>
        </div>
        <div className="flex rounded-lg bg-surface-muted p-1">
          {(["en", "hi"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                lang === l ? "bg-primary text-white" : "text-gray-500"
              }`}
            >
              {l === "en" ? "EN" : "हिंदी"}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Short video and text lessons on recent market happenings and product training — in English or
        Hindi.
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
        {filtered.map((l) => (
          <LessonCard key={l.slug} lesson={l} lang={lang} onOpen={() => setActive(l)} />
        ))}
      </div>

      <LessonModal lesson={active} lang={lang} onClose={() => setActive(null)} />
    </div>
  );
}
