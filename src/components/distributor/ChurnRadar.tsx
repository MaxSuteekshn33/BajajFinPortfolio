import { Loader2, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AiTag } from "@/components/ui/AiTag";
import { AiUnavailableNotice } from "@/components/ui/AiUnavailableNotice";
import { ClientPriority, DistributorClient } from "@/lib/distributorTypes";
import { formatINR } from "@/lib/calculators";

function priorityTone(score: number): "red" | "orange" | "grey" {
  if (score >= 4) return "red";
  if (score >= 3) return "orange";
  return "grey";
}

export function ChurnRadar({
  clients,
  priorities,
  loading,
  errorReason,
  errorMessage,
  onSelectClient,
}: {
  clients: DistributorClient[];
  priorities: ClientPriority[] | null;
  loading: boolean;
  errorReason: "missing_key" | "api_error" | null;
  errorMessage?: string;
  onSelectClient: (clientId: string) => void;
}) {
  if (loading) {
    return (
      <Card className="flex items-center gap-2 p-6 text-sm text-gray-500">
        <Loader2 size={16} className="animate-spin" />
        Prioritizing your client book…
      </Card>
    );
  }

  if (errorReason) {
    return <AiUnavailableNotice reason={errorReason} message={errorMessage} />;
  }

  const priorityMap = new Map(priorities?.map((p) => [p.clientId, p]));
  const ranked = [...clients].sort(
    (a, b) => (priorityMap.get(b.id)?.priorityScore ?? 0) - (priorityMap.get(a.id)?.priorityScore ?? 0)
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-primary-dark">Who to contact next</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Suggestions from your client book — not mandatory tasks.
          </p>
        </div>
        <AiTag />
      </div>
      <div className="divide-y divide-black/5">
        {ranked.map((c) => {
          const p = priorityMap.get(c.id);
          return (
            <button
              key={c.id}
              onClick={() => onSelectClient(c.id)}
              className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-muted"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-primary-dark">{c.name}</p>
                  {p && <Badge tone={priorityTone(p.priorityScore)}>Priority {p.priorityScore}/5</Badge>}
                </div>
                <p className="mt-1 text-xs text-gray-500">{c.city} · AUM {formatINR(c.aumValue)}</p>
                {p && <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{p.reason}</p>}
                {p && (
                  <p className="mt-1 text-xs font-medium text-primary">Suggested: {p.suggestedAction}</p>
                )}
              </div>
              <Phone size={16} className="mt-1 shrink-0 text-gray-300" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
