"use client";

import { useEffect, useMemo, useState } from "react";
import { KPIRow } from "@/components/distributor/KPIRow";
import { ChurnRadar } from "@/components/distributor/ChurnRadar";
import { ClientDetailDrawer } from "@/components/distributor/ClientDetailDrawer";
import { LinkedClientsPanel } from "@/components/distributor/LinkedClientsPanel";
import { distributorProfile } from "@/lib/distributorIdentity";
import { generateClientBook } from "@/lib/distributorClients";
import { ClientPriority } from "@/lib/distributorTypes";

export default function RetentionPage() {
  const clients = useMemo(() => generateClientBook(), []);
  const [priorities, setPriorities] = useState<ClientPriority[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ reason: "missing_key" | "api_error"; message?: string } | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/retention-priority", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "batch",
        clients: clients.map((c) => ({
          clientId: c.id,
          name: c.name,
          aumValue: c.aumValue,
          personaId: c.personaId,
          sipStatus: c.sipStatus,
          daysSinceLastContact: c.daysSinceLastContact,
          recentLogins7d: c.recentLogins7d,
          idleCashAmount: c.idleCashAmount,
          recentRedemptionFlag: c.recentRedemptionFlag,
          lastActivityNote: c.lastActivityNote,
        })),
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) setPriorities(res.data.priorities);
        else setError({ reason: res.reason, message: res.message });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Retention</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-dark">
          Your book, {distributorProfile.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          A suggested contact order for your existing clients — you decide who to actually call.
        </p>
      </div>

      <div className="mb-6">
        <KPIRow profile={distributorProfile} />
      </div>

      <div className="mb-6">
        <LinkedClientsPanel />
      </div>

      <ChurnRadar
        clients={clients}
        priorities={priorities}
        loading={loading}
        errorReason={error?.reason ?? null}
        errorMessage={error?.message}
        onSelectClient={setSelectedClientId}
      />

      <ClientDetailDrawer
        key={selectedClientId ?? "none"}
        client={selectedClient}
        onClose={() => setSelectedClientId(null)}
      />
    </div>
  );
}
