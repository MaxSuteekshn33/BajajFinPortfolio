"use client";

import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { formatINR, formatSigned } from "@/lib/format";
import { investorProfile } from "@/lib/mockData";

export function PortfolioHeader({ onTalkToAdvisor }: { onTalkToAdvisor: () => void }) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-primary-dark">
              {investorProfile.name}
            </h1>
            <span className="text-sm text-gray-400">
              {investorProfile.age} · {investorProfile.city}
            </span>
            <Tooltip content={investorProfile.personaExplainer}>
              <Badge tone="blue" className="cursor-pointer">
                <Sparkles size={11} />
                {investorProfile.persona}
              </Badge>
            </Tooltip>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Portfolio Value
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary-dark">
                {formatINR(investorProfile.portfolioValue)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                XIRR
              </p>
              <p className="mt-1 text-2xl font-bold text-gain">
                {formatSigned(investorProfile.xirr)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Active Goals
              </p>
              <p className="mt-1 text-2xl font-bold text-primary-dark">
                {investorProfile.activeGoals}
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" onClick={onTalkToAdvisor} className="shrink-0">
          Talk to an Advisor
        </Button>
      </div>
    </Card>
  );
}
