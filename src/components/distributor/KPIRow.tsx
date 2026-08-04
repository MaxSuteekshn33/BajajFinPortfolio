"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Card } from "@/components/ui/Card";
import { DistributorProfile } from "@/lib/distributorIdentity";
import { formatINR } from "@/lib/calculators";

export function KPIRow({ profile }: { profile: DistributorProfile }) {
  const stats = [
    { label: "AUM under management", value: profile.aumValue, format: formatINR },
    { label: "Active clients", value: profile.clientCount, format: (n: number) => Math.round(n).toString() },
    { label: "Monthly SIP book", value: profile.monthlySipBook, static: true },
    { label: "Client retention", value: profile.clientRetention, format: (n: number) => `${Math.round(n)}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{s.label}</p>
          {s.static ? (
            <p className="mt-1 text-xl font-extrabold text-primary-dark">{s.value as string}</p>
          ) : (
            <CountUp
              value={s.value as number}
              format={s.format as (n: number) => string}
              className="mt-1 block text-xl font-extrabold text-primary-dark tabular-nums"
            />
          )}
        </Card>
      ))}
    </div>
  );
}
