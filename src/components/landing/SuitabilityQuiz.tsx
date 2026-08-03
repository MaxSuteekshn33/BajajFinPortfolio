"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { quizQuestions, derivePersona, personas, PersonaId } from "@/data/quiz";
import { schemes } from "@/data/schemes";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AiTag } from "@/components/ui/AiTag";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { setStoredPersona } from "@/lib/persona";

export function SuitabilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const totalSteps = quizQuestions.length;
  const question = quizQuestions[step];

  const result = useMemo(() => {
    if (!done) return null;
    return derivePersona(answers);
  }, [done, answers]);

  useEffect(() => {
    if (result) setStoredPersona(result.personaId);
  }, [result]);

  const shortlist = useMemo(() => {
    if (!result) return [];
    return schemes
      .filter((s) => s.personaFit.includes(result.personaId))
      .sort((a, b) => b.cagr3y - a.cagr3y)
      .slice(0, 6);
  }, [result]);

  function selectOption(optionId: string) {
    const nextAnswers = { ...answers, [question.id]: optionId };
    setAnswers(nextAnswers);
    if (step < totalSteps - 1) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      setTimeout(() => setDone(true), 220);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done && result) {
    const persona = personas[result.personaId as PersonaId];
    const maxScore = Math.max(...Object.values(result.scores));
    return (
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-gain">
            <CheckCircle2 size={18} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Your persona
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-primary-dark sm:text-3xl">
            {persona.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-primary">{persona.tagline}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
            {persona.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(Object.keys(result.scores) as PersonaId[]).map((id) => (
              <div key={id}>
                <p className="text-[11px] font-medium text-gray-500">
                  {personas[id].name}
                </p>
                <ProgressBar
                  progress={(result.scores[id] / (maxScore || 1)) * 100}
                  color={id === result.personaId ? "gold" : "blue"}
                  height="h-1.5"
                />
              </div>
            ))}
          </div>

          <button
            onClick={restart}
            className="mt-4 text-xs font-semibold text-primary hover:underline"
          >
            Retake the quiz
          </button>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary-dark">
              Funds matching your profile
            </h3>
            <p className="text-xs text-gray-500">
              Shortlisted based on your persona — review the details and decide for yourself.
            </p>
          </div>
          <AiTag />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {shortlist.map((s) => (
            <SchemeCard key={s.id} scheme={s} showAiTag={false} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500">
          Question {step + 1} of {totalSteps}
        </p>
        <p className="text-xs font-semibold text-primary">
          {Math.round(((step + 1) / totalSteps) * 100)}%
        </p>
      </div>
      <ProgressBar progress={((step + 1) / totalSteps) * 100} color="blue" />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
        >
          <Card className="mt-5 p-6 sm:p-7">
            <h3 className="text-lg font-bold text-primary-dark sm:text-xl">
              {question.question}
            </h3>
            {question.helpText && (
              <p className="mt-1.5 text-xs text-gray-500">{question.helpText}</p>
            )}

            <div className="mt-5 space-y-2.5">
              {question.options.map((opt) => {
                const isSelected = answers[question.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(opt.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-primary bg-primary-light text-primary"
                        : "border-black/10 text-gray-700 hover:border-primary/30 hover:bg-surface-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ArrowLeft size={14} /> Back
        </Button>
        <Button
          variant="outline"
          disabled={!answers[question.id] || step === totalSteps - 1}
          onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
        >
          Next <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}
