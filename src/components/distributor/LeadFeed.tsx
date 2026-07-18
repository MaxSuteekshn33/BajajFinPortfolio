"use client";

import { useState } from "react";
import { UserPlus, MapPin, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { leads } from "@/lib/mockData";

export function LeadFeed() {
  const [accepted, setAccepted] = useState<string[]>([]);

  const pendingCount = leads.length - accepted.length;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
          <UserPlus size={18} />
        </div>
        <div>
          <h3 className="font-bold text-primary-dark">Lead Feed</h3>
          <p className="text-xs text-gray-400">
            {pendingCount} new digitally-originated investors near you need advisory
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {leads.map((lead) => {
          const isAccepted = accepted.includes(lead.id);
          return (
            <div
              key={lead.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted p-4"
            >
              <div>
                <p className="text-sm font-semibold text-primary-dark">{lead.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={11} /> {lead.city} · {lead.distance}
                </p>
                <p className="mt-1 text-xs text-gray-500">{lead.investmentIntent}</p>
              </div>
              {isAccepted ? (
                <span className="flex shrink-0 items-center gap-1 rounded-lg bg-gain-soft px-3 py-2 text-xs font-semibold text-gain">
                  <Check size={13} /> Accepted
                </span>
              ) : (
                <Button
                  variant="primary"
                  className="shrink-0 px-3 py-2 text-xs"
                  onClick={() => setAccepted((prev) => [...prev, lead.id])}
                >
                  Accept
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
