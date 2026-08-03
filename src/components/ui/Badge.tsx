import { ReactNode } from "react";

type Tone = "blue" | "green" | "orange" | "red" | "grey" | "gold";

const tones: Record<Tone, string> = {
  blue: "bg-primary-light text-primary",
  green: "bg-gain-soft text-gain",
  orange: "bg-alert-soft text-alert",
  red: "bg-loss-soft text-loss",
  grey: "bg-surface-muted text-gray-600",
  gold: "bg-accent/20 text-accent-dark",
};

export function Badge({
  children,
  tone = "grey",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
