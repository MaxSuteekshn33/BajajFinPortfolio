import { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface rounded-2xl shadow-sm border border-black/5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
