export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRCompact(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)} L`;
  }
  return formatINR(amount);
}

export function formatSigned(value: number, suffix = "%"): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}${suffix}`;
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatChangePercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCrore(value: number): string {
  if (value >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(2)} Lakh Cr`;
  }
  return `₹${value.toLocaleString("en-IN")} Cr`;
}
