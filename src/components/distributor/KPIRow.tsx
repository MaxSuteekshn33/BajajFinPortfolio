import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { distributorProfile } from "@/lib/mockData";
import { formatINRCompact } from "@/lib/format";

export function KPIRow({ extraAum }: { extraAum: number }) {
  const staticKpis = [
    { label: "Monthly SIP Book", value: distributorProfile.monthlySipBook },
    { label: "Client Retention", value: `${distributorProfile.clientRetention}%` },
    { label: "Revenue This Quarter", value: distributorProfile.revenueThisQuarter },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Total AUM</p>
        <CountUp
          value={distributorProfile.aumValue + extraAum}
          format={formatINRCompact}
          className="mt-2 block text-2xl font-extrabold text-primary-dark"
        />
      </Card>
      {staticKpis.map((kpi) => (
        <Card key={kpi.label} className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {kpi.label}
          </p>
          <p className="mt-2 text-2xl font-extrabold text-primary-dark">{kpi.value}</p>
        </Card>
      ))}
    </div>
  );
}
