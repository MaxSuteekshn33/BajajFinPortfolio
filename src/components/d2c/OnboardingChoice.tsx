"use client";

import { useState } from "react";
import { ArrowRight, KeyRound, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DistributorCodeEntry } from "./DistributorCodeEntry";

export function OnboardingChoice() {
  const [mode, setMode] = useState<"choice" | "code" | "independent">("choice");

  if (mode === "code") {
    return <DistributorCodeEntry onBack={() => setMode("choice")} />;
  }

  if (mode === "independent") {
    return null;
  }

  return (
    <div className="mx-auto grid max-w-md gap-3 sm:max-w-2xl sm:grid-cols-2">
      <Card
        className="cursor-pointer p-5 transition-shadow hover:shadow-md"
        onClick={() => setMode("code")}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
          <KeyRound size={17} />
        </span>
        <h3 className="mt-3 text-sm font-bold text-primary-dark">I have a distributor code</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
          Link to your relationship manager for transparency and support, while still using every
          self-service tool on the app.
        </p>
        <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary">
          Enter code <ArrowRight size={12} />
        </p>
      </Card>
      <Card
        className="cursor-pointer p-5 transition-shadow hover:shadow-md"
        onClick={() => setMode("independent")}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent-dark">
          <Sparkles size={17} />
        </span>
        <h3 className="mt-3 text-sm font-bold text-primary-dark">I&rsquo;ll invest independently</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
          Explore schemes, take the suitability quiz, and invest fully on your own — with AI tools to
          help along the way.
        </p>
        <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary">
          Continue <ArrowRight size={12} />
        </p>
      </Card>
    </div>
  );
}
