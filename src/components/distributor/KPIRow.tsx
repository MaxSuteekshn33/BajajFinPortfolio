import { Card } from "@/components/ui/Card";
import { distributorProfile } from "@/lib/mockData";

const kpis = [
  { label: "Total AUM", value: distributorProfile.aum },
  { label: "Monthly SIP Book", value: distributorProfile.monthlySipBook },
  { label: "Client Retention", value: `${distributorProfile.clientRetention}%` },
  { label: "Revenue This Quarter", value: distributorProfile.revenueThisQuarter },
];

export function KPIRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {kpis.map((kpi) => (
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
