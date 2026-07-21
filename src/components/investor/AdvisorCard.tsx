"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { distributorProfile } from "@/lib/mockData";

export function AdvisorCard({
  onBookCall,
  onWhatsApp,
}: {
  onBookCall: () => void;
  onWhatsApp: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden border-2 border-primary/15 bg-gradient-to-r from-primary-light via-white to-white p-6 sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white ring-4 ring-white">
              {distributorProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                <ShieldCheck size={12} />
                Your Advisor
              </p>
              <p className="mt-0.5 font-bold text-primary-dark">
                {distributorProfile.name} · {distributorProfile.city}
              </p>
              <p className="text-xs text-gray-500">
                Advising you since {distributorProfile.advisingSince}
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 gap-2 sm:w-auto">
            <Button
              variant="primary"
              className="flex-1 px-4 py-2.5 text-xs sm:flex-none"
              onClick={onBookCall}
            >
              <Phone size={14} />
              Book a call
            </Button>
            <Button
              variant="outline"
              className="flex-1 px-4 py-2.5 text-xs sm:flex-none"
              onClick={onWhatsApp}
            >
              <MessageCircle size={14} />
              WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
