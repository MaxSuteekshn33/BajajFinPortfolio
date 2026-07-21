"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Home, Users, LineChart } from "lucide-react";
import { DataSpineModal } from "@/components/DataSpineModal";

const navLinks = [
  { href: "/", label: "Main", icon: Home },
  { href: "/investor", label: "Investor", icon: Users },
  { href: "/markets", label: "Markets", icon: LineChart },
];

export function TopBanner() {
  const pathname = usePathname();
  const [spineOpen, setSpineOpen] = useState(false);

  return (
    <div className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:text-sm">
        <button
          onClick={() => setSpineOpen(true)}
          className="flex items-center gap-2 text-left text-white/90 hover:text-white"
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
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  isActive
                    ? "bg-white text-primary-dark"
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
