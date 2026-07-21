"use client";

import { Radar, ChevronRight, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChurnClient, churnClients, totalChurnRiskCount } from "@/lib/mockData";

export function ChurnRadar({
  onSelectClient,
  onPrepCall,
}: {
  onSelectClient: (client: ChurnClient) => void;
  onPrepCall: (client: ChurnClient) => void;
}) {
  return (
    <Card className="p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-alert-soft text-alert">
            <Radar size={18} />
          </div>
          <div>
            <h3 className="font-bold text-primary-dark">Churn Radar</h3>
            <p className="text-xs text-gray-400">
              {totalChurnRiskCount} clients showing redemption risk in next 30 days
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-gray-400">
              <th className="pb-2 pr-3 font-medium">Client</th>
              <th className="pb-2 pr-3 font-medium">AUM</th>
              <th className="pb-2 pr-3 font-medium">Risk</th>
              <th className="pb-2 pr-3 font-medium">Reason</th>
              <th className="pb-2 pr-3 font-medium" />
              <th className="pb-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {churnClients.map((client) => (
              <tr
                key={client.id}
                onClick={() => onSelectClient(client)}
                className="cursor-pointer border-b border-black/5 last:border-0 hover:bg-surface-muted"
              >
                <td className="py-3 pr-3 font-semibold text-primary-dark">
                  {client.name}
                </td>
                <td className="py-3 pr-3 text-gray-500">{client.aum}</td>
                <td className="py-3 pr-3">
                  <Badge tone={client.riskScore === "High" ? "red" : "orange"}>
                    {client.riskScore}
                  </Badge>
                </td>
                <td className="py-3 pr-3 text-gray-500">{client.reason}</td>
                <td className="py-3 pr-3 text-right">
                  {client.riskScore === "High" && (
                    <Button
                      variant="outline"
                      className="px-2.5 py-1.5 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrepCall(client);
                      }}
                    >
                      <PhoneCall size={12} />
                      Prep call
                    </Button>
                  )}
                </td>
                <td className="py-3 text-right text-gray-300">
                  <ChevronRight size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Showing 6 of {totalChurnRiskCount} at-risk clients, sorted by risk score.
      </p>
    </Card>
  );
}
