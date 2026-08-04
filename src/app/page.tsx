"use client";

import { useRef, useState } from "react";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { SuitabilityQuiz } from "@/components/landing/SuitabilityQuiz";
import { PortfolioLookup } from "@/components/schemes/PortfolioLookup";
import { Card } from "@/components/ui/Card";
import { ConsentModal } from "@/components/ui/ConsentModal";

export default function Home() {
  const quizRef = useRef<HTMLDivElement>(null);
  const [consentOpen, setConsentOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Hero onStartQuiz={() => quizRef.current?.scrollIntoView({ behavior: "smooth" })} />

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-md">
          <PortfolioLookup />
        </div>
      </section>

      <section ref={quizRef} className="scroll-mt-20 bg-surface-muted py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
              What kind of investor are you?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
              Six quick questions — no jargon. We&apos;ll explain exactly how we
              got to your result.
            </p>
          </div>
          <SuitabilityQuiz />
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
          <Card className="p-5">
            <TrendingUp size={20} className="text-primary" />
            <h3 className="mt-3 text-sm font-bold text-primary-dark">
              Direct vs Regular, made visible
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              Every scheme shows both plans side by side, with the expense
              ratio delta and what it pays for — explained plainly.
            </p>
          </Card>
          <Card className="p-5">
            <ShieldCheck size={20} className="text-primary" />
            <h3 className="mt-3 text-sm font-bold text-primary-dark">
              Descriptive AI, never prescriptive
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              Our shortlists and FinAsk answers explain and inform — they
              never tell you what to buy, sell, or switch to.
            </p>
          </Card>
          <Card className="p-5">
            <Users size={20} className="text-primary" />
            <button onClick={() => setConsentOpen(true)} className="w-full text-left">
              <h3 className="mt-3 text-sm font-bold text-primary-dark hover:underline">
                Your data, on consent
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Account Aggregator-based, DPDP Act 2023 compliant. Tap to see
                exactly what&apos;s used and why.
              </p>
            </button>
          </Card>
        </div>
      </section>

      <ConsentModal open={consentOpen} onClose={() => setConsentOpen(false)} />
    </div>
  );
}
