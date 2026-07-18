"use client";

import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { PortfolioHeader } from "@/components/investor/PortfolioHeader";
import { GoalCard } from "@/components/investor/GoalCard";
import { AskFinAIWidget } from "@/components/investor/AskFinAIWidget";
import { AdvisorModal } from "@/components/investor/AdvisorModal";
import { initialGoals } from "@/lib/mockData";

export default function InvestorAppPage() {
  const [goals] = useState(initialGoals);
  const [advisorOpen, setAdvisorOpen] = useState(false);

  function handleResolveGoal() {
    // resolution animation handled locally inside GoalCard
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <TopBanner />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <PortfolioHeader onTalkToAdvisor={() => setAdvisorOpen(true)} />

        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Your Goals
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onResolve={handleResolveGoal} />
            ))}
          </div>
        </div>
      </main>

      <AskFinAIWidget />
      <AdvisorModal open={advisorOpen} onClose={() => setAdvisorOpen(false)} />
    </div>
  );
}
