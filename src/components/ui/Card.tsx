import { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface rounded-2xl shadow-sm border border-black/5 ${className}`}
    >
      {children}
    </div>
  );
}
