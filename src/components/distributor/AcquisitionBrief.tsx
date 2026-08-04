import { Loader2, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AiTag } from "@/components/ui/AiTag";
import { AiUnavailableNotice } from "@/components/ui/AiUnavailableNotice";
import { Riskometer } from "@/components/schemes/Riskometer";
import { getSchemeById } from "@/data/schemes";
import { AcquisitionBrief as AcquisitionBriefType } from "@/lib/distributorTypes";

export function AcquisitionBrief({
  brief,
  loading,
  errorReason,
  errorMessage,
}: {
  brief: AcquisitionBriefType | null;
  loading: boolean;
  errorReason: "missing_key" | "api_error" | null;
  errorMessage?: string;
}) {
  if (loading) {
    return (
      <Card className="flex items-center gap-2 p-6 text-sm text-gray-500">
        <Loader2 size={16} className="animate-spin" />
        Building the pitch brief…
      </Card>
    );
  }

  if (errorReason) {
    return <AiUnavailableNotice reason={errorReason} message={errorMessage} />;
  }

  if (!brief) {
    return (
      <Card className="p-6 text-sm text-gray-400">
        Fill in the prospect&rsquo;s details to generate scheme suggestions, talking points, and an
        objection-handling arsenal.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <h3 className="text-sm font-bold text-primary-dark">Suggested schemes</h3>
          </div>
          <AiTag />
        </div>
        <div className="space-y-3">
          {brief.schemeSuggestions.map((s) => {
            const scheme = getSchemeById(s.schemeId);
            if (!scheme) return null;
            return (
              <div key={s.schemeId} className="flex items-start gap-3 rounded-xl bg-surface-muted p-3">
                <Riskometer level={scheme.riskLevel} size={72} showLabel={false} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-primary-dark">{scheme.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{s.rationale}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-bold text-primary-dark">Rapport-building talking points</h3>
        <div className="space-y-3">
          {brief.talkingPoints.map((tp, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-primary-dark">{tp.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{tp.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert size={16} className="text-alert" />
          <h3 className="text-sm font-bold text-primary-dark">Objection-handling arsenal</h3>
        </div>
        <div className="space-y-3">
          {brief.objectionHandling.map((o, i) => (
            <div key={i} className="rounded-xl bg-surface-muted p-3">
              <p className="text-xs font-semibold text-loss">&ldquo;{o.objection}&rdquo;</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{o.response}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-2 border-accent/40 bg-accent/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-accent-dark" />
          <Badge tone="gold">Why Bajaj</Badge>
        </div>
        <p className="text-sm font-bold text-primary-dark">{brief.whyBajajAngle.headline}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">{brief.whyBajajAngle.body}</p>
      </Card>
    </div>
  );
}
