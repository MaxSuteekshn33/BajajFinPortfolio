"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, LineChart, Network, ArrowRight, Info, Check, Minus, X, ShieldCheck } from "lucide-react";
import { HowItWorksModal } from "@/components/HowItWorksModal";
import { DataSpineModal } from "@/components/DataSpineModal";
import { TopBanner } from "@/components/TopBanner";
import {
  problemStats,
  problemLine,
  compareColumns,
  compareRows,
  CompareValue,
} from "@/lib/mockData";

export default function LandingPage() {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [spineOpen, setSpineOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col bg-gradient-to-b from-primary-light via-background to-background">
      <TopBanner />

      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          BAJAJ FINSERV ASSET MANAGEMENT
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-extrabold tracking-tight text-primary-dark sm:text-5xl md:text-6xl"
        >
          Investing,
          <br />
          Made Personal.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg"
        >
          Bajaj FinOS pairs hyper-personalized, goal-based investing with a dedicated human
          advisor and a calm AI companion — so every decision fits your life, not a generic
          model portfolio.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setHowItWorksOpen(true)}
          className="mx-auto mt-6 flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary-light"
        >
          <Info size={15} />
          How it works
        </motion.button>
      </section>

      {/* Problem strip */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {problemStats.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5"
            >
              <p className="text-2xl font-extrabold text-primary-dark sm:text-3xl">{p.stat}</p>
              <p className="mt-1.5 text-xs leading-snug text-gray-500">{p.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm font-semibold text-primary">{problemLine}</p>
      </section>

      {/* Entry cards */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <EntryCard
            href="/investor"
            icon={<Users size={26} />}
            title="AdvisorEdge"
            subtitle="Your portfolio"
            description="Goal-based investing, behavioural nudges, and a calm AI voice — built for people, not just portfolios."
          />
          <EntryCard
            href="/markets"
            icon={<LineChart size={26} />}
            title="FinBuddy"
            subtitle="Stocks & mutual funds"
            description="Research and invest directly in stocks and mutual funds, with charts and ratios built for your holdings."
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <ComparisonTable />
      </section>

      {/* Diagram */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <DataSpineDiagram onOpenSpine={() => setSpineOpen(true)} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/5 bg-white px-6 py-6 text-center text-xs text-gray-400">
        <p>Prototype for ATOM Season 9 — CEO&apos;s Challenge</p>
        <p className="mx-auto mt-2 max-w-2xl leading-relaxed">
          Bajaj Finserv Asset Management is registered with SEBI. Mutual fund investments are
          subject to market risks — please read all scheme-related documents carefully. Your
          data is handled under the RBI-regulated Account Aggregator framework and the DPDP Act,
          2023. This is a non-functional prototype; no real transactions are processed.
        </p>
      </footer>

      <HowItWorksModal open={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
      <DataSpineModal open={spineOpen} onClose={() => setSpineOpen(false)} />
    </main>
  );
}

function EntryCard({
  href,
  icon,
  title,
  subtitle,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-9 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div>
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white transition-colors group-hover:bg-primary-dark">
          {icon}
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {subtitle}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-primary-dark">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
      <div className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-primary-dark">
        Enter
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function CompareIcon({ value }: { value: CompareValue }) {
  if (value === "yes")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-gain-soft text-gain">
        <Check size={14} />
      </span>
    );
  if (value === "partial")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-alert-soft text-alert">
        <Minus size={14} />
      </span>
    );
  return (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-loss-soft text-loss">
      <X size={14} />
    </span>
  );
}

function ComparisonTable() {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-9">
      <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
        Competitive positioning
      </p>
      <h2 className="mb-6 text-center text-xl font-bold text-primary-dark">Why FinOS wins</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-gray-400">
              <th className="pb-3 pr-3 font-medium">Feature</th>
              {compareColumns.map((col) => (
                <th
                  key={col}
                  className={`pb-3 px-2 text-center font-medium ${
                    col === "Bajaj FinOS" ? "text-primary" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.feature} className="border-b border-black/5 last:border-0">
                <td className="py-3 pr-3 text-gray-600">{row.feature}</td>
                <td className="py-3 px-2 bg-primary-light/40">
                  <CompareIcon value={row.bajajFinos} />
                </td>
                <td className="py-3 px-2">
                  <CompareIcon value={row.growwZerodha} />
                </td>
                <td className="py-3 px-2">
                  <CompareIcon value={row.traditionalAmc} />
                </td>
                <td className="py-3 px-2">
                  <CompareIcon value={row.bankRm} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DataSpineDiagram({ onOpenSpine }: { onOpenSpine: () => void }) {
  return (
    <div className="rounded-3xl bg-white p-9 shadow-sm ring-1 ring-black/5 sm:p-14">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
        One brain, always personal
      </p>
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <DiagramNode icon={<Users size={22} />} label="AdvisorEdge" sub="Goals & AI" />

        <div className="relative flex flex-1 items-center justify-center">
          <svg
            className="absolute top-1/2 hidden h-px w-full -translate-y-1/2 sm:block"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="#00379F"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          <button onClick={onOpenSpine} className="z-10">
            <DiagramNode
              icon={<Network size={24} />}
              label="Unified Data Spine"
              sub="Consented signals"
              primary
              clickable
            />
          </button>
        </div>

        <DiagramNode icon={<ShieldCheck size={22} />} label="Your Advisor" sub="Human, on call" />
      </div>
    </div>
  );
}

function DiagramNode({
  icon,
  label,
  sub,
  primary = false,
  clickable = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  primary?: boolean;
  clickable?: boolean;
}) {
  return (
    <div
      className={`z-10 flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4 text-center ${
        clickable ? "transition-transform hover:scale-105" : ""
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          primary ? "bg-primary text-white" : "bg-primary-light text-primary"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-primary-dark">{label}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}
