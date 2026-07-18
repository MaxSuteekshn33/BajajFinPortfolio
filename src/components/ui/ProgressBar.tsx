"use client";

import { motion } from "framer-motion";

const colorMap = {
  blue: "bg-primary",
  green: "bg-gain",
  orange: "bg-alert",
};

export function ProgressBar({
  progress,
  color,
  height = "h-2.5",
}: {
  progress: number;
  color: keyof typeof colorMap;
  height?: string;
}) {
  return (
    <div className={`w-full ${height} rounded-full bg-surface-muted overflow-hidden`}>
      <motion.div
        className={`${height} rounded-full ${colorMap[color]}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
