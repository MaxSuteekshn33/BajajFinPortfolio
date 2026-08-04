"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { AiUnavailableNotice } from "@/components/ui/AiUnavailableNotice";
import { ClientDetail, ClientSummary, DistributorClient } from "@/lib/distributorTypes";
import { formatINR } from "@/lib/calculators";

function toSummary(c: DistributorClient): ClientSummary {
  return {
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
  };
}

export function ClientDetailDrawer({
  client,
  onClose,
}: {
  client: DistributorClient | null;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  // The parent remounts this component (via a client-id key) whenever a different
  // client is selected, so `client` is always freshly non-null on mount — safe to
  // start "loading" without a synchronous setState in the effect below.
  const [loading, setLoading] = useState(!!client);
  const [error, setError] = useState<{ reason: "missing_key" | "api_error"; message?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    fetch("/api/retention-priority", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "detail", client: toSummary(client) }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;
        if (res.ok) setDetail(res.data);
        else setError({ reason: res.reason, message: res.message });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [client]);

  const handleCopy = () => {
    if (!detail) return;
    const text = [detail.nextBestConversation, ...detail.talkingPoints].join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal open={!!client} onClose={onClose} maxWidth="max-w-md">
      {client && (
        <div className="p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Call prep</p>
          <h3 className="mt-1 text-lg font-extrabold text-primary-dark">{client.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {client.city} · AUM {formatINR(client.aumValue)}
          </p>

          <div className="mt-4">
            {loading && (
              <div className="flex items-center gap-2 py-6 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Preparing brief…
              </div>
            )}
            {error && <AiUnavailableNotice reason={error.reason} message={error.message} />}
            {detail && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge tone={detail.priorityScore >= 4 ? "red" : detail.priorityScore >= 3 ? "orange" : "grey"}>
                    Priority {detail.priorityScore}/5
                  </Badge>
                  <span className="text-xs text-gray-500">{detail.reason}</span>
                </div>

                <div className="rounded-xl bg-primary-light p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Open with</p>
                  <p className="mt-1 text-sm text-primary-dark">{detail.nextBestConversation}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Talking points</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {detail.talkingPoints.map((tp, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-700">
                        · {tp}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[11px] italic text-gray-400">
                  Suggested — not a mandatory task.
                </p>

                <button
                  onClick={handleCopy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy call script"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
