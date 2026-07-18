"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Network, ArrowRight, Info } from "lucide-react";
import { HowItWorksModal } from "@/components/HowItWorksModal";

export default function LandingPage() {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col bg-gradient-to-b from-primary-light via-background to-background">
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
          One Platform.
          <br />
          Two Faces. One Brain.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg"
        >
          Bajaj FinOS delivers hyper-personalized investing for every investor — and an
          equally powerful AI co-pilot for every distributor. Same intelligence, two
          experiences, zero conflict.
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

      {/* Entry cards */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <EntryCard
            href="/investor"
            icon={<Users size={26} />}
            title="Investor App"
            subtitle="D2C experience"
            description="Goal-based investing, behavioural nudges, and a calm AI voice — built for people, not just portfolios."
            accent="primary"
          />
          <EntryCard
            href="/distributor"
            icon={<Briefcase size={26} />}
            title="Distributor Co-Pilot"
            subtitle="B2B experience"
            description="Churn radar, next-best-conversations, and a ledger that proves every client stays yours."
            accent="alert"
          />
        </div>
      </section>

      {/* Diagram */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <DataSpineDiagram />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/5 bg-white py-6 text-center text-xs text-gray-400">
        Prototype for ATOM Season 9 — CEO&apos;s Challenge
      </footer>

      <HowItWorksModal open={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
    </main>
  );
}

function EntryCard({
  href,
  icon,
  title,
  subtitle,
  description,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  accent: "primary" | "alert";
}) {
  const accentClasses =
    accent === "primary"
      ? "bg-primary text-white group-hover:bg-primary-dark"
      : "bg-alert text-white group-hover:opacity-90";

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div>
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${accentClasses}`}
        >
          {icon}
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {subtitle}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-primary-dark">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-primary">
        Enter
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function DataSpineDiagram() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
        One brain, two faces
      </p>
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <DiagramNode icon={<Users size={22} />} label="Investor App" sub="D2C" />

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
          <DiagramNode
            icon={<Network size={24} />}
            label="Unified Data Spine"
            sub="Consented signals"
            primary
          />
        </div>

        <DiagramNode icon={<Briefcase size={22} />} label="Distributor Co-Pilot" sub="B2B" />
      </div>
    </div>
  );
}

function DiagramNode({
  icon,
  label,
  sub,
  primary = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <div className="z-10 flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4 text-center">
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
