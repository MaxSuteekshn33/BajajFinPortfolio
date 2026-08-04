"use client";

import { Link2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLinkedClients } from "@/lib/distributorLink";

export function LinkedClientsPanel() {
  const linked = useLinkedClients();

  if (linked.length === 0) return null;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Link2 size={15} className="text-primary" />
        <h3 className="text-sm font-bold text-primary-dark">Linked via D2C app</h3>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        These clients self-served through the app using your distributor code — they still count as your
        book, and are surfaced here so you can stay in the loop.
      </p>
      <div className="mt-3 space-y-2">
        {linked.map((c) => (
          <div key={c.code} className="flex items-center justify-between rounded-xl bg-surface-muted px-3 py-2">
            <div>
              <p className="text-sm font-semibold text-primary-dark">{c.investorName}</p>
              <p className="text-[11px] text-gray-500">Code {c.code}</p>
            </div>
            <Badge tone="blue">App-linked</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
