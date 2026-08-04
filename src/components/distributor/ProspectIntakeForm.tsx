"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { quizQuestions, derivePersona } from "@/data/quiz";
import { ProspectIntake } from "@/lib/distributorTypes";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary/50";
const labelClass = "text-[11px] font-semibold uppercase tracking-wide text-gray-500";

export function ProspectIntakeForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (prospect: ProspectIntake) => void;
  submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyCapacity, setMonthlyCapacity] = useState("");
  const [statedGoal, setStatedGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const canSubmit = name.trim() && age && city.trim() && monthlyCapacity && statedGoal.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const { personaId } = derivePersona(answers);
    onSubmit({
      name: name.trim(),
      age: Number(age),
      city: city.trim(),
      contactPhone: phone.trim() || undefined,
      monthlyCapacity: Number(monthlyCapacity),
      statedGoal: statedGoal.trim(),
      personaId,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-primary-dark">New prospect</h3>
      <p className="mt-0.5 text-xs text-gray-500">
        Enter what you know so far — the AI fills the gaps with a pitch-ready brief.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Name</label>
            <input className={`mt-1 ${inputClass}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <input
              type="number"
              className={`mt-1 ${inputClass}`}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="35"
            />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input className={`mt-1 ${inputClass}`} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Pune" />
          </div>
          <div>
            <label className={labelClass}>Contact (optional)</label>
            <input className={`mt-1 ${inputClass}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." />
          </div>
        </div>

        <div>
          <label className={labelClass}>Stated goal</label>
          <input
            className={`mt-1 ${inputClass}`}
            value={statedGoal}
            onChange={(e) => setStatedGoal(e.target.value)}
            placeholder="e.g. Child's education in 12 years"
          />
        </div>

        <div>
          <label className={labelClass}>Monthly investment capacity (₹)</label>
          <input
            type="number"
            className={`mt-1 ${inputClass}`}
            value={monthlyCapacity}
            onChange={(e) => setMonthlyCapacity(e.target.value)}
            placeholder="10000"
          />
        </div>

        <div className="rounded-xl bg-surface-muted p-3">
          <p className={labelClass}>Quick risk appetite read (optional, improves the brief)</p>
          <div className="mt-2 space-y-2">
            {quizQuestions.map((q) => (
              <div key={q.id}>
                <label className="text-xs text-gray-600">{q.question}</label>
                <select
                  className={`mt-1 ${inputClass}`}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                >
                  <option value="">Skip</option>
                  {q.options.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            className={`mt-1 ${inputClass} min-h-[70px]`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else worth knowing before the call"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles size={15} />
          {submitting ? "Building brief…" : "Generate acquisition brief"}
        </button>
      </form>
    </Card>
  );
}
