"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Home, Users, LineChart } from "lucide-react";
import { DataSpineModal } from "@/components/DataSpineModal";

const navLinks = [
  { href: "/", label: "Main", icon: Home },
  { href: "/investor", label: "InvestServ", icon: Users },
  { href: "/markets", label: "FinBuddy", icon: LineChart },
];

export function TopBanner() {
  const pathname = usePathname();
  const [spineOpen, setSpineOpen] = useState(false);

  return (
    <div className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <button
          onClick={() => setSpineOpen(true)}
          className="flex items-center gap-2 text-left text-xs text-white/80 hover:text-white sm:text-sm"
        >
          <Network size={14} className="shrink-0" />
          <span>
            Powered by{" "}
            <strong className="font-semibold underline decoration-white/30 underline-offset-2">
              Unified Data Spine
            </strong>{" "}
            — one customer graph across AMC, distributor, and Bajaj group signals (consented)
          </span>
        </button>
        <nav className="flex items-center gap-1.5 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive
                    ? "bg-white text-primary-dark shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={13} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <DataSpineModal open={spineOpen} onClose={() => setSpineOpen(false)} />
    </div>
  );
}
