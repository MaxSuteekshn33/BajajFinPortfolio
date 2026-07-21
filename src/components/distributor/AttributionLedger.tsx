import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ledgerEntries, Channel } from "@/lib/mockData";

const channelTone: Record<Channel, "blue" | "orange" | "grey"> = {
  App: "blue",
  Assisted: "orange",
  Branch: "grey",
};

export function AttributionLedger() {
  return (
    <Card className="p-7">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gain-soft text-gain">
          <ShieldCheck size={18} />
        </div>
        <h3 className="font-bold text-primary-dark">Attribution Ledger</h3>
      </div>

      <div className="mt-4 rounded-xl bg-primary px-4 py-3 text-xs font-medium text-white sm:text-sm">
        Assisted-Direct Model: your clients stay yours, on every channel.
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-gray-400">
              <th className="pb-2 pr-3 font-medium">Client</th>
              <th className="pb-2 pr-3 font-medium">Transaction</th>
              <th className="pb-2 pr-3 font-medium">Channel</th>
              <th className="pb-2 pr-3 font-medium">Attribution</th>
              <th className="pb-2 font-medium">Trail Earned</th>
            </tr>
          </thead>
          <tbody>
            {ledgerEntries.map((entry) => (
              <tr key={entry.id} className="border-b border-black/5 last:border-0">
                <td className="py-3 pr-3 font-semibold text-primary-dark">
                  {entry.client}
                </td>
                <td className="py-3 pr-3 text-gray-500">{entry.transaction}</td>
                <td className="py-3 pr-3">
                  <Badge tone={channelTone[entry.channel]}>{entry.channel}</Badge>
                </td>
                <td className="py-3 pr-3">
                  <Badge tone="green">{entry.attributionStatus}</Badge>
                </td>
                <td className="py-3 font-semibold text-primary-dark">
                  {entry.trailEarned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
