import Link from "next/link";
import { GraduationCap, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { KPIRow } from "@/components/distributor/KPIRow";
import { distributorProfile } from "@/lib/distributorIdentity";

const modules = [
  {
    href: "/distributor/acquisition",
    icon: Users,
    title: "Customer acquisition",
    description:
      "Enter a prospect's profile and get AI-generated scheme suggestions, talking points, and objection handling.",
  },
  {
    href: "/distributor/retention",
    icon: TrendingUp,
    title: "Retention",
    description: "A suggested contact priority order across your existing client book.",
  },
  {
    href: "/distributor/learn",
    icon: GraduationCap,
    title: "Learning hub",
    description: "Market updates and product training, in English or Hindi.",
  },
];

export default function DistributorCockpitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-primary">
          {distributorProfile.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-primary-dark">{distributorProfile.name}</h1>
          <p className="text-xs text-gray-500">
            {distributorProfile.city} · Advising since {distributorProfile.advisingSince}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <KPIRow profile={distributorProfile} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {modules.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card className="h-full p-5 transition-shadow hover:shadow-md">
              <m.icon size={20} className="text-primary" />
              <h3 className="mt-3 text-sm font-bold text-primary-dark">{m.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{m.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
