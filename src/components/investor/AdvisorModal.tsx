"use client";

import { MapPin, Star, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { distributorProfile } from "@/lib/mockData";

export function AdvisorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gain-soft text-gain">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-primary-dark">
          We&apos;ll connect you to a Bajaj partner advisor near you
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Based on your profile and location, here&apos;s your matched partner:
        </p>

        <div className="mt-5 rounded-2xl bg-surface-muted p-4 text-left">
          <div className="flex items-center justify-between">
            <p className="font-bold text-primary-dark">{distributorProfile.name}</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-alert">
              <Star size={12} className="fill-alert" /> 4.9
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} /> {distributorProfile.city} · 2.3 km away
          </p>
          <p className="mt-2 text-xs text-gray-500">
            {distributorProfile.clients} clients managed · {distributorProfile.aum} AUM
          </p>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-gray-400">
          Your digital app stays exactly as is — this simply adds a human partner
          on top, whenever you want one. Every action you take in the app keeps
          crediting your assigned advisor.
        </p>
      </div>
    </Modal>
  );
}
