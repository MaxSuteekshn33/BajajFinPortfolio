export type RiskLevel =
  | "low"
  | "low-to-moderate"
  | "moderate"
  | "moderately-high"
  | "high"
  | "very-high";

export const RISK_LEVELS: { level: RiskLevel; label: string }[] = [
  { level: "low", label: "Low" },
  { level: "low-to-moderate", label: "Low to Moderate" },
  { level: "moderate", label: "Moderate" },
  { level: "moderately-high", label: "Moderately High" },
  { level: "high", label: "High" },
  { level: "very-high", label: "Very High" },
];

export type SchemeCategory = "equity" | "debt" | "hybrid";

export interface Scheme {
  id: string;
  name: string;
  category: SchemeCategory;
  subCategory: string;
  riskLevel: RiskLevel;
  nav: { direct: number; regular: number };
  expenseRatio: { direct: number; regular: number };
  cagr1y: number;
  cagr3y: number;
  cagr5y: number;
  aumCr: number;
  fundManager: string;
  benchmark: string;
  minSip: number;
  minLumpsum: number;
  exitLoad: string;
  inceptionYear: number;
  description: string;
  personaFit: string[];
}

export const schemes: Scheme[] = [
  {
    id: "bf-flexi-cap",
    name: "Bajaj Finserv Flexi Cap Fund",
    category: "equity",
    subCategory: "Flexi Cap",
    riskLevel: "very-high",
    nav: { direct: 18.42, regular: 17.61 },
    expenseRatio: { direct: 0.62, regular: 1.98 },
    cagr1y: 14.8,
    cagr3y: 19.2,
    cagr5y: 17.6,
    aumCr: 4210,
    fundManager: "Nimesh Chandan",
    benchmark: "NIFTY 500 TRI",
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 12 months",
    inceptionYear: 2021,
    description:
      "Invests across large, mid and small cap stocks without market-cap bias, giving the fund manager flexibility to rotate as opportunities shift.",
    personaFit: ["growth-seeker", "steady-accumulator"],
  },
  {
    id: "bf-large-cap",
    name: "Bajaj Finserv Large Cap Fund",
    category: "equity",
    subCategory: "Large Cap",
    riskLevel: "very-high",
    nav: { direct: 15.07, regular: 14.51 },
    expenseRatio: { direct: 0.55, regular: 1.85 },
    cagr1y: 12.1,
    cagr3y: 16.4,
    cagr5y: 15.1,
    aumCr: 3180,
    fundManager: "Sorbh Gupta",
    benchmark: "NIFTY 100 TRI",
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 12 months",
    inceptionYear: 2021,
    description:
      "Core allocation to India's top 100 companies by market cap — built for investors who want equity growth with relatively lower volatility than mid/small cap.",
    personaFit: ["steady-accumulator", "capital-preserver", "growth-seeker"],
  },
  {
    id: "bf-large-mid-cap",
    name: "Bajaj Finserv Large & Mid Cap Fund",
    category: "equity",
    subCategory: "Large & Mid Cap",
    riskLevel: "very-high",
    nav: { direct: 13.88, regular: 13.32 },
    expenseRatio: { direct: 0.6, regular: 1.92 },
    cagr1y: 15.6,
    cagr3y: 20.1,
    cagr5y: 18.3,
    aumCr: 2640,
    fundManager: "Nimesh Chandan",
    benchmark: "NIFTY LargeMidcap 250 TRI",
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 12 months",
    inceptionYear: 2022,
    description:
      "Blends the stability of large caps with the growth potential of mid caps in a minimum 35%/35% split, per SEBI category norms.",
    personaFit: ["growth-seeker", "steady-accumulator"],
  },
  {
    id: "bf-small-cap",
    name: "Bajaj Finserv Small Cap Fund",
    category: "equity",
    subCategory: "Small Cap",
    riskLevel: "very-high",
    nav: { direct: 11.24, regular: 10.79 },
    expenseRatio: { direct: 0.68, regular: 2.05 },
    cagr1y: 18.9,
    cagr3y: 24.7,
    cagr5y: 21.4,
    aumCr: 1890,
    fundManager: "Sorbh Gupta",
    benchmark: "NIFTY Smallcap 250 TRI",
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 12 months",
    inceptionYear: 2023,
    description:
      "High-conviction bets on smaller, emerging companies. Highest volatility in the equity shelf — best suited to long horizons and high risk tolerance.",
    personaFit: ["growth-seeker"],
  },
  {
    id: "bf-liquid",
    name: "Bajaj Finserv Liquid Fund",
    category: "debt",
    subCategory: "Liquid",
    riskLevel: "low",
    nav: { direct: 1214.32, regular: 1208.9 },
    expenseRatio: { direct: 0.18, regular: 0.35 },
    cagr1y: 6.9,
    cagr3y: 6.4,
    cagr5y: 5.8,
    aumCr: 6720,
    fundManager: "Nimesh Chandan",
    benchmark: "CRISIL Liquid Debt A-I Index",
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: "Graded exit load for redemption within 7 days",
    inceptionYear: 2020,
    description:
      "Invests in debt and money market instruments maturing within 91 days — built for parking short-term surplus cash with high liquidity.",
    personaFit: ["capital-preserver", "income-focused", "steady-accumulator"],
  },
  {
    id: "bf-overnight",
    name: "Bajaj Finserv Overnight Fund",
    category: "debt",
    subCategory: "Overnight",
    riskLevel: "low",
    nav: { direct: 1108.65, regular: 1104.21 },
    expenseRatio: { direct: 0.12, regular: 0.22 },
    cagr1y: 6.5,
    cagr3y: 6.1,
    cagr5y: 5.5,
    aumCr: 2140,
    fundManager: "Ritu Modi",
    benchmark: "CRISIL Overnight Index",
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: "Nil",
    inceptionYear: 2020,
    description:
      "Invests in overnight securities with 1-day maturity — the lowest-risk instrument on the shelf, near-zero interest rate and credit risk.",
    personaFit: ["capital-preserver", "income-focused"],
  },
  {
    id: "bf-money-market",
    name: "Bajaj Finserv Money Market Fund",
    category: "debt",
    subCategory: "Money Market",
    riskLevel: "low-to-moderate",
    nav: { direct: 1287.44, regular: 1279.02 },
    expenseRatio: { direct: 0.25, regular: 0.55 },
    cagr1y: 7.2,
    cagr3y: 6.8,
    cagr5y: 6.1,
    aumCr: 1560,
    fundManager: "Ritu Modi",
    benchmark: "CRISIL Money Market A-I Index",
    minSip: 500,
    minLumpsum: 1000,
    exitLoad: "Nil",
    inceptionYear: 2021,
    description:
      "Invests in money market instruments with up to 1-year maturity, aiming for slightly higher accrual than liquid funds with modest added duration risk.",
    personaFit: ["income-focused", "capital-preserver", "steady-accumulator"],
  },
  {
    id: "bf-balanced-advantage",
    name: "Bajaj Finserv Balanced Advantage Fund",
    category: "hybrid",
    subCategory: "Balanced Advantage",
    riskLevel: "high",
    nav: { direct: 14.96, regular: 14.38 },
    expenseRatio: { direct: 0.48, regular: 1.72 },
    cagr1y: 11.4,
    cagr3y: 14.9,
    cagr5y: 13.2,
    aumCr: 3050,
    fundManager: "Sorbh Gupta",
    benchmark: "CRISIL Hybrid 50+50 Moderate Index",
    minSip: 500,
    minLumpsum: 5000,
    exitLoad: "1% if redeemed within 12 months",
    inceptionYear: 2022,
    description:
      "Dynamically shifts between equity and debt based on market valuation signals — designed to smooth the ride for investors uneasy with full equity swings.",
    personaFit: ["steady-accumulator", "income-focused", "growth-seeker"],
  },
  {
    id: "bf-arbitrage",
    name: "Bajaj Finserv Arbitrage Fund",
    category: "hybrid",
    subCategory: "Arbitrage",
    riskLevel: "low-to-moderate",
    nav: { direct: 12.65, regular: 12.31 },
    expenseRatio: { direct: 0.3, regular: 0.95 },
    cagr1y: 7.1,
    cagr3y: 6.9,
    cagr5y: 6.3,
    aumCr: 1420,
    fundManager: "Ritu Modi",
    benchmark: "Nifty 50 Arbitrage Index",
    minSip: 1000,
    minLumpsum: 5000,
    exitLoad: "0.25% if redeemed within 30 days",
    inceptionYear: 2022,
    description:
      "Captures price differences between cash and derivatives markets for equity-taxed, debt-like return stability — a tax-efficient parking option.",
    personaFit: ["capital-preserver", "income-focused"],
  },
];

export function getSchemeById(id: string) {
  return schemes.find((s) => s.id === id);
}
