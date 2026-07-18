"use client";

import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { PortfolioHeader } from "@/components/investor/PortfolioHeader";
import { GoalCard } from "@/components/investor/GoalCard";
import { AskFinAIWidget } from "@/components/investor/AskFinAIWidget";
import { AdvisorModal } from "@/components/investor/AdvisorModal";
import { AdvisorCard } from "@/components/investor/AdvisorCard";
import { MarketDipBanner } from "@/components/investor/MarketDipBanner";
import { ToastStack, useToast } from "@/components/ui/Toast";
import { initialGoals, distributorProfile, Lang } from "@/lib/mockData";

export default function InvestorAppPage() {
  const [goals] = useState(initialGoals);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const { toasts, showToast } = useToast();

  function handleResolveGoal() {
    // resolution animation handled locally inside GoalCard
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <TopBanner />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <div className="mb-5 flex items-center justify-end">
          <div className="flex items-center gap-0.5 rounded-full bg-white p-0.5 text-xs font-semibold shadow-sm ring-1 ring-black/5">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                lang === "en" ? "bg-primary text-white" : "text-gray-500 hover:text-primary"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                lang === "hi" ? "bg-primary text-white" : "text-gray-500 hover:text-primary"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        <div className="mb-5">
          <AdvisorCard
            onBookCall={() =>
              showToast(
                `Call requested with ${distributorProfile.name}. He'll confirm a time shortly.`
              )
            }
            onWhatsApp={() =>
              showToast(`Opening WhatsApp chat with ${distributorProfile.name}...`)
            }
          />
        </div>

        <PortfolioHeader onTalkToAdvisor={() => setAdvisorOpen(true)} />

        <div className="mt-6">
          <MarketDipBanner lang={lang} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Your Goals
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onResolve={handleResolveGoal}
                onToast={showToast}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </main>

      <AskFinAIWidget onTalkToAdvisor={() => setAdvisorOpen(true)} />
      <AdvisorModal open={advisorOpen} onClose={() => setAdvisorOpen(false)} />
      <ToastStack toasts={toasts} />
    </div>
  );
}
