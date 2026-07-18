"use client";

import { Modal } from "@/components/ui/Modal";
import { howItWorksSteps } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

export function HowItWorksModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-8">
        <h3 className="text-xl font-bold text-primary-dark">How it works</h3>
        <p className="mt-1 text-sm text-gray-500">
          One data spine, two personalized experiences.
        </p>
        <div className="mt-6 flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
          {howItWorksSteps.map((step, i) => (
            <div key={step.title} className="flex flex-1 items-stretch">
              <div className="flex flex-1 flex-col gap-2 rounded-xl bg-surface-muted p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h4 className="text-sm font-semibold text-primary-dark">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
              {i < howItWorksSteps.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center px-2 sm:flex">
                  <ArrowRight size={18} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
