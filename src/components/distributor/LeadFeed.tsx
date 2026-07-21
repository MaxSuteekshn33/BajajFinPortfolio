"use client";

import { motion } from "framer-motion";
import { UserPlus, MapPin, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { leads } from "@/lib/mockData";
import { formatINR } from "@/lib/format";

export function LeadFeed({
  accepted,
  onAccept,
}: {
  accepted: string[];
  onAccept: (leadId: string) => void;
}) {
  const pendingCount = leads.length - accepted.length;

  return (
    <Card className="p-7">
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
            <div key={lead.id} className="overflow-hidden rounded-xl bg-surface-muted">
              {isAccepted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gain-soft text-gain">
                      <Check size={14} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary-dark">
                        Added to your book
                      </p>
                      <p className="text-xs text-gray-500">
                        {lead.name} · Projected trail: {formatINR(lead.projectedTrailPerYear)}/yr
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-semibold text-primary-dark">{lead.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={11} /> {lead.city} · {lead.distance}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{lead.investmentIntent}</p>
                  </div>
                  <Button
                    variant="primary"
                    className="shrink-0 px-3 py-2 text-xs"
                    onClick={() => onAccept(lead.id)}
                  >
                    Accept
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
