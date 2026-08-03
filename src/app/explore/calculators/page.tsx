"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  sipFutureValue,
  lumpsumFutureValue,
  requiredSipForGoal,
  stepUpSipFutureValue,
  totalInvested,
  stepUpTotalInvested,
  formatINR,
} from "@/lib/calculators";

type Tab = "sip" | "lumpsum" | "goal" | "stepup";

const TABS: { id: Tab; label: string }[] = [
  { id: "sip", label: "SIP" },
  { id: "lumpsum", label: "Lumpsum" },
  { id: "goal", label: "Goal Retriever" },
  { id: "stepup", label: "Step-up SIP" },
];

function Field({
  label,
  value,
  onChange,
  suffix,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
        />
        {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultPanel({
  invested,
  maturity,
}: {
  invested: number;
  maturity: number;
}) {
  const gains = Math.max(maturity - invested, 0);
  const investedPct = maturity > 0 ? (invested / maturity) * 100 : 0;

  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase text-gray-400">
        Projected maturity value
      </p>
      <CountUp
        value={maturity}
        format={formatINR}
        className="mt-1 block text-3xl font-extrabold text-primary-dark sm:text-4xl"
      />

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Invested amount</span>
          <span className="font-semibold text-primary-dark">{formatINR(invested)}</span>
        </div>
        <ProgressBar progress={investedPct} color="blue" height="h-2" />
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Estimated gains</span>
          <span className="font-semibold text-gain">{formatINR(gains)}</span>
        </div>
      </div>

      <p className="mt-5 text-[10px] leading-relaxed text-gray-400">
        Projections assume a constant annual return and are for illustration
        only — actual mutual fund returns fluctuate and are not guaranteed.
        AI-assisted estimate, not investment advice.
      </p>
    </Card>
  );
}

export default function CalculatorsPage() {
  const [tab, setTab] = useState<Tab>("sip");

  const [sipAmount, setSipAmount] = useState(5000);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpReturn, setLumpReturn] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);

  const [goalAmount, setGoalAmount] = useState(2000000);
  const [goalReturn, setGoalReturn] = useState(12);
  const [goalYears, setGoalYears] = useState(10);

  const [stepAmount, setStepAmount] = useState(5000);
  const [stepReturn, setStepReturn] = useState(12);
  const [stepYears, setStepYears] = useState(10);
  const [stepUpPct, setStepUpPct] = useState(10);

  const sipResult = useMemo(
    () => ({
      maturity: sipFutureValue(sipAmount, sipReturn, sipYears),
      invested: totalInvested(sipAmount, sipYears),
    }),
    [sipAmount, sipReturn, sipYears]
  );

  const lumpResult = useMemo(
    () => ({
      maturity: lumpsumFutureValue(lumpAmount, lumpReturn, lumpYears),
      invested: lumpAmount,
    }),
    [lumpAmount, lumpReturn, lumpYears]
  );

  const requiredSip = useMemo(
    () => requiredSipForGoal(goalAmount, goalReturn, goalYears),
    [goalAmount, goalReturn, goalYears]
  );

  const stepResult = useMemo(
    () => ({
      maturity: stepUpSipFutureValue(stepAmount, stepReturn, stepYears, stepUpPct),
      invested: stepUpTotalInvested(stepAmount, stepYears, stepUpPct),
    }),
    [stepAmount, stepReturn, stepYears, stepUpPct]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/explore" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
        <ArrowLeft size={13} /> Back to Explore Schemes
      </Link>

      <h1 className="mt-3 text-2xl font-extrabold text-primary-dark sm:text-3xl">
        Calculators
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Plan your investment amount and timeline before you commit.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "bg-primary text-white"
                : "bg-surface-muted text-gray-500 hover:bg-primary-light hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "sip" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Card className="space-y-4 p-6">
            <Field label="Monthly SIP amount (₹)" value={sipAmount} onChange={setSipAmount} min={500} />
            <Field label="Expected annual return" value={sipReturn} onChange={setSipReturn} suffix="%" min={1} max={30} />
            <Field label="Duration" value={sipYears} onChange={setSipYears} suffix="years" min={1} max={40} />
          </Card>
          <ResultPanel invested={sipResult.invested} maturity={sipResult.maturity} />
        </div>
      )}

      {tab === "lumpsum" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Card className="space-y-4 p-6">
            <Field label="Lumpsum amount (₹)" value={lumpAmount} onChange={setLumpAmount} min={1000} />
            <Field label="Expected annual return" value={lumpReturn} onChange={setLumpReturn} suffix="%" min={1} max={30} />
            <Field label="Duration" value={lumpYears} onChange={setLumpYears} suffix="years" min={1} max={40} />
          </Card>
          <ResultPanel invested={lumpResult.invested} maturity={lumpResult.maturity} />
        </div>
      )}

      {tab === "goal" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Card className="space-y-4 p-6">
            <Field label="Goal amount (₹)" value={goalAmount} onChange={setGoalAmount} min={10000} />
            <Field label="Expected annual return" value={goalReturn} onChange={setGoalReturn} suffix="%" min={1} max={30} />
            <Field label="Target date (years away)" value={goalYears} onChange={setGoalYears} suffix="years" min={1} max={40} />
          </Card>
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase text-gray-400">
              Required monthly SIP
            </p>
            <CountUp
              value={requiredSip}
              format={formatINR}
              className="mt-1 block text-3xl font-extrabold text-primary-dark sm:text-4xl"
            />
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              Investing this amount every month for {goalYears} years at an
              assumed {goalReturn}% annual return could get you to your{" "}
              {formatINR(goalAmount)} goal.
            </p>
            <p className="mt-5 text-[10px] leading-relaxed text-gray-400">
              Estimate assumes a constant annual return — actual returns
              fluctuate. AI-assisted estimate, not investment advice.
            </p>
          </Card>
        </div>
      )}

      {tab === "stepup" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Card className="space-y-4 p-6">
            <Field label="Starting monthly SIP (₹)" value={stepAmount} onChange={setStepAmount} min={500} />
            <Field label="Annual step-up" value={stepUpPct} onChange={setStepUpPct} suffix="%" min={0} max={50} />
            <Field label="Expected annual return" value={stepReturn} onChange={setStepReturn} suffix="%" min={1} max={30} />
            <Field label="Duration" value={stepYears} onChange={setStepYears} suffix="years" min={1} max={40} />
          </Card>
          <ResultPanel invested={stepResult.invested} maturity={stepResult.maturity} />
        </div>
      )}
    </div>
  );
}
