import { Scheme, RISK_LEVELS } from "@/data/schemes";
import { Card } from "@/components/ui/Card";

const ROWS: { label: string; render: (s: Scheme) => string }[] = [
  { label: "Category", render: (s) => s.subCategory },
  {
    label: "Risk level",
    render: (s) => RISK_LEVELS.find((r) => r.level === s.riskLevel)?.label ?? "",
  },
  { label: "NAV (Direct)", render: (s) => `₹${s.nav.direct}` },
  { label: "NAV (Regular)", render: (s) => `₹${s.nav.regular}` },
  { label: "Expense Ratio (Direct)", render: (s) => `${s.expenseRatio.direct}%` },
  { label: "Expense Ratio (Regular)", render: (s) => `${s.expenseRatio.regular}%` },
  { label: "1Y CAGR", render: (s) => `${s.cagr1y}%` },
  { label: "3Y CAGR", render: (s) => `${s.cagr3y}%` },
  { label: "5Y CAGR", render: (s) => `${s.cagr5y}%` },
  { label: "AUM", render: (s) => `₹${s.aumCr.toLocaleString("en-IN")} Cr` },
  { label: "Exit Load", render: (s) => s.exitLoad },
  { label: "Benchmark", render: (s) => s.benchmark },
  { label: "Fund Manager", render: (s) => s.fundManager },
];

export function ComparisonTable({ schemes }: { schemes: Scheme[] }) {
  if (schemes.length === 0) return null;

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-black/5 bg-surface-muted">
            <th className="sticky left-0 bg-surface-muted px-4 py-3 font-semibold text-gray-500">
              Metric
            </th>
            {schemes.map((s) => (
              <th key={s.id} className="min-w-[160px] px-4 py-3 font-bold text-primary-dark">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-surface" : "bg-surface-muted/50"}>
              <td className="sticky left-0 bg-inherit px-4 py-2.5 font-medium text-gray-500">
                {row.label}
              </td>
              {schemes.map((s) => (
                <td key={s.id} className="px-4 py-2.5 font-semibold text-gray-700">
                  {row.render(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
