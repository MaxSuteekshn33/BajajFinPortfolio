"use client";

import { useState } from "react";
import { PhoneCall, Video } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DistributorProfile } from "@/lib/distributorIdentity";
import { VideoCallModal } from "./VideoCallModal";

export function RelationshipManagerCard({
  rm,
  investorName,
}: {
  rm: DistributorProfile;
  investorName: string;
}) {
  const [callOpen, setCallOpen] = useState(false);
  const initials = rm.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <Card className="p-5">
        <Badge tone="green">Linked to your account</Badge>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-base font-bold text-primary">
            {initials}
          </span>
          <div>
            <p className="text-sm font-bold text-primary-dark">{rm.name}</p>
            <p className="text-xs text-gray-500">
              Your relationship manager · {rm.city} · advising since {rm.advisingSince}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          Hi {investorName.split(" ")[0]}, you&rsquo;re all set. Use every tool on this app to invest and
          track your portfolio yourself — reach out to {rm.name.split(" ")[0]} anytime for a second
          opinion.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setCallOpen(true)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-white hover:bg-primary-dark"
          >
            <Video size={13} /> Request video call
          </button>
          <a
            href={`tel:${rm.phone.replace(/\s/g, "")}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-surface-muted py-2 text-xs font-semibold text-primary-dark hover:bg-primary-light"
          >
            <PhoneCall size={13} /> Call
          </a>
        </div>
      </Card>

      <VideoCallModal open={callOpen} onClose={() => setCallOpen(false)} rmName={rm.name} />
    </>
  );
}
