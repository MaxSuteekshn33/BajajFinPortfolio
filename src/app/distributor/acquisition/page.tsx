"use client";

import { useState } from "react";
import { ProspectIntakeForm } from "@/components/distributor/ProspectIntakeForm";
import { AcquisitionBrief } from "@/components/distributor/AcquisitionBrief";
import { ProspectAssistantChat } from "@/components/distributor/ProspectAssistantChat";
import { AcquisitionBrief as AcquisitionBriefType, ProspectIntake } from "@/lib/distributorTypes";

export default function AcquisitionPage() {
  const [prospect, setProspect] = useState<ProspectIntake | null>(null);
  const [prospectVersion, setProspectVersion] = useState(0);
  const [brief, setBrief] = useState<AcquisitionBriefType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ reason: "missing_key" | "api_error"; message?: string } | null>(null);

  async function handleSubmit(p: ProspectIntake) {
    setProspect(p);
    setProspectVersion((v) => v + 1);
    setBrief(null);
    setError(null);
    setLoading(true);

    const res = await fetch("/api/acquisition-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prospect: p }),
    }).then((r) => r.json());

    if (res.ok) setBrief(res.data);
    else setError({ reason: res.reason, message: res.message });
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Customer acquisition</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-dark">Build your pitch</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter a prospect&rsquo;s profile and get scheme suggestions, rapport-building talking points, and
          objection handling tailored to them.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="space-y-6">
          <ProspectIntakeForm onSubmit={handleSubmit} submitting={loading} />
          <ProspectAssistantChat key={prospectVersion} prospect={prospect} />
        </div>
        <AcquisitionBrief brief={brief} loading={loading} errorReason={error?.reason ?? null} errorMessage={error?.message} />
      </div>
    </div>
  );
}
