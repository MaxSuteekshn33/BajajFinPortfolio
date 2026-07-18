"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, TrendingDown, Sparkles, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/format";
import { Goal, finaiNudge, translations, Lang, distributorProfile } from "@/lib/mockData";

type Resolution = "topup" | "sip" | null;

export function GoalCard({
  goal,
  onResolve,
  onToast,
  lang = "en",
}: {
  goal: Goal;
  onResolve: (goalId: string, type: "topup" | "sip") => void;
  onToast?: (message: string) => void;
  lang?: Lang;
}) {
  const [resolution, setResolution] = useState<Resolution>(null);
  const [justResolved, setJustResolved] = useState(false);
  const t = translations[lang];

  const isOffTrack = goal.status === "off-track";
  const isComplete = goal.status === "complete";
  const isResolved = resolution !== null;

  const color = isComplete ? "green" : isOffTrack && !isResolved ? "orange" : isResolved ? "green" : "blue";

  function handleClick(type: "topup" | "sip") {
    setResolution(type);
    setJustResolved(true);
    onResolve(goal.id, type);
    onToast?.(
      `Done. ${finaiNudge.trailCredited} trail credited to your advisor ${distributorProfile.name}.`
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-primary-dark">{goal.name}</h3>
          <p className="mt-0.5 text-xs text-gray-400">
            Target {formatINR(goal.targetAmount)} by {goal.targetYear}
          </p>
        </div>
        {isComplete ? (
          <Badge tone="green">
            <CheckCircle2 size={12} /> 100% {t.complete}
          </Badge>
        ) : isOffTrack && !isResolved ? (
          <Badge tone="orange">
            <TrendingDown size={12} /> 8% {t.offTrack}
          </Badge>
        ) : isOffTrack && isResolved ? (
          <Badge tone="green">
            <TrendingUp size={12} /> {t.onTrack}
          </Badge>
        ) : (
          <Badge tone="blue">
            <TrendingUp size={12} /> {t.onTrack}
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-500">
          <span>{formatINR(goal.currentAmount)} saved</span>
          <span>{isResolved ? goal.targetProgress + 1 : goal.progress}%</span>
        </div>
        <ProgressBar
          progress={isResolved ? goal.targetProgress + 1 : goal.progress}
          color={color}
        />
      </div>

      <AnimatePresence>
        {isOffTrack && !isResolved && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl bg-alert-soft p-4">
              <div className="flex gap-2">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-alert" />
                <p className="text-xs leading-relaxed text-alert">{t.nudgeMessage}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="success"
                  className="text-xs px-3 py-2"
                  onClick={() => handleClick("topup")}
                >
                  {t.topUp} {formatINR(finaiNudge.topUpAmount)}
                </Button>
                <Button
                  variant="outline"
                  className="text-xs px-3 py-2 border-alert/40 text-alert hover:bg-alert-soft"
                  onClick={() => handleClick("sip")}
                >
                  {t.increaseSip} {formatINR(finaiNudge.sipIncreaseAmount)}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {isResolved && justResolved && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-gain-soft p-3 text-xs font-medium text-gain">
              <Check size={15} />
              {resolution === "topup"
                ? `Done! A one-time top-up of ${formatINR(
                    finaiNudge.topUpAmount
                  )} has been scheduled. Your goal is back on track.`
                : `Done! Your monthly SIP is increased by ${formatINR(
                    finaiNudge.sipIncreaseAmount
                  )}. Your goal is back on track.`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
