import { schemes, Scheme } from "@/data/schemes";
import { hashSeed, mulberry32 } from "@/lib/prng";

const FIRST_NAMES = [
  "Arjun", "Priya", "Rohan", "Sneha", "Kabir", "Ananya", "Vikram", "Meera",
  "Aditya", "Ishaan", "Kavya", "Rahul", "Divya", "Nikhil", "Pooja",
];
const LAST_NAMES = [
  "Mehta", "Nair", "Malhotra", "Iyer", "Singh", "Rao", "Kapoor", "Desai",
  "Bhatt", "Chawla", "Menon", "Reddy", "Joshi", "Sharma", "Verma",
];

export interface Holding {
  scheme: Scheme;
  plan: "direct" | "regular";
  units: number;
  investedAmount: number;
  currentValue: number;
  sip: { active: boolean; amount: number; startedMonthsAgo: number } | null;
}

export interface MockPortfolio {
  code: string;
  folioNumber: string;
  investorName: string;
  memberSince: number;
  holdings: Holding[];
  totalInvested: number;
  totalCurrent: number;
  totalGain: number;
  totalGainPct: number;
  xirr: number;
}

export function generateMockPortfolio(rawCode: string): MockPortfolio {
  const code = rawCode.trim().toUpperCase();
  const seed = hashSeed(code || "AABCD");
  const rand = mulberry32(seed);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  const investorName = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
  const memberSince = 2020 + Math.floor(rand() * 5); // 2020–2024

  const shuffled = [...schemes].sort(() => rand() - 0.5);
  const holdingCount = 3 + Math.floor(rand() * 2); // 3 or 4 holdings
  const holdingSchemes = shuffled.slice(0, holdingCount);

  const holdings: Holding[] = holdingSchemes.map((scheme) => {
    const plan: "direct" | "regular" = rand() > 0.35 ? "direct" : "regular";
    const yearsHeld = 0.5 + rand() * 3.5; // 6 months – 4 years
    const investedAmount = Math.round((8000 + rand() * 90000) / 500) * 500;
    const annualReturn = scheme.cagr3y / 100;
    const noise = 0.85 + rand() * 0.3; // +/-15% variance vs headline CAGR
    const growth = Math.pow(1 + annualReturn * noise, yearsHeld);
    const currentValue = Math.round(investedAmount * growth);
    const units = Number((investedAmount / scheme.nav[plan]).toFixed(3));

    const hasSip = rand() > 0.3;
    const sip = hasSip
      ? {
          active: rand() > 0.25,
          amount: [500, 1000, 2000, 5000, 10000][Math.floor(rand() * 5)],
          startedMonthsAgo: Math.round(yearsHeld * 12),
        }
      : null;

    return { scheme, plan, units, investedAmount, currentValue, sip };
  });

  const totalInvested = holdings.reduce((s, h) => s + h.investedAmount, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.currentValue, 0);
  const totalGain = totalCurrent - totalInvested;
  const totalGainPct = (totalGain / totalInvested) * 100;
  const xirr = totalGainPct / (holdings.length ? 1.6 : 1) * (0.9 + rand() * 0.3);

  const folioNumber = `BF${(seed % 900000 + 100000)}/${code.slice(0, 3) || "AAB"}`;

  return {
    code,
    folioNumber,
    investorName,
    memberSince,
    holdings,
    totalInvested,
    totalCurrent,
    totalGain,
    totalGainPct,
    xirr,
  };
}
