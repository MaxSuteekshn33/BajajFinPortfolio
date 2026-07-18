"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, ArrowLeftRight, Home } from "lucide-react";
import { DataSpineModal } from "@/components/DataSpineModal";

export function TopBanner() {
  const pathname = usePathname();
  const isInvestor = pathname?.startsWith("/investor");
  const otherHref = isInvestor ? "/distributor" : "/investor";
  const otherLabel = isInvestor ? "Switch to Distributor Co-Pilot" : "Switch to Investor App";
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
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Home size={13} />
            Landing
          </Link>
          <Link
            href={otherHref}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 font-medium hover:bg-white/20"
          >
            <ArrowLeftRight size={13} />
            {otherLabel}
          </Link>
        </div>
      </div>
      <DataSpineModal open={spineOpen} onClose={() => setSpineOpen(false)} />
    </div>
  );
}
