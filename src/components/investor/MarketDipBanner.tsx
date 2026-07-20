"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingDown, ChevronDown } from "lucide-react";
import { translations, Lang } from "@/lib/mockData";

export function MarketDipBanner({ lang }: { lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const t = translations[lang];

  return (
    <div className="rounded-2xl bg-alert-soft">
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <div className="flex items-center gap-2.5">
          <TrendingDown size={16} className="shrink-0 text-alert" />
          <p className="text-xs font-medium leading-snug text-alert sm:text-sm">
            {t.bannerTitle}
          </p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-alert px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90"
        >
          {t.bannerCta}
          <ChevronDown
            size={14}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs leading-relaxed text-alert/90">{t.bannerBody}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
