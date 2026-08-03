export function sipFutureValue(monthlyAmount: number, annualReturnPct: number, years: number) {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyAmount * n;
  return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

export function lumpsumFutureValue(principal: number, annualReturnPct: number, years: number) {
  const r = annualReturnPct / 100;
  return principal * Math.pow(1 + r, years);
}

export function requiredSipForGoal(targetAmount: number, annualReturnPct: number, years: number) {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  if (r === 0) return targetAmount / n;
  const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return targetAmount / factor;
}

export function stepUpSipFutureValue(
  startingMonthlyAmount: number,
  annualReturnPct: number,
  years: number,
  stepUpPct: number
) {
  const r = annualReturnPct / 100 / 12;
  let corpus = 0;
  let monthlyAmount = startingMonthlyAmount;

  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      corpus = corpus * (1 + r) + monthlyAmount;
    }
    monthlyAmount = monthlyAmount * (1 + stepUpPct / 100);
  }

  return corpus;
}

export function totalInvested(monthlyAmount: number, years: number) {
  return monthlyAmount * years * 12;
}

export function stepUpTotalInvested(
  startingMonthlyAmount: number,
  years: number,
  stepUpPct: number
) {
  let total = 0;
  let monthlyAmount = startingMonthlyAmount;
  for (let year = 0; year < years; year++) {
    total += monthlyAmount * 12;
    monthlyAmount = monthlyAmount * (1 + stepUpPct / 100);
  }
  return total;
}

export const formatINR = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN")}`;
