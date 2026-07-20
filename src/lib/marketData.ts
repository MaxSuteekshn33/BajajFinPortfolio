// All data below is hardcoded mock data for demo purposes only.
// This is a data/analytics surface, not investment advice — no buy/sell
// recommendations are ever generated, only descriptive analysis of the
// instrument and of the signed-in investor's own historical pattern.

export type InstrumentType = "stock" | "mutual_fund";
export type RiskLevel = "Low" | "Moderate" | "Moderately High" | "High" | "Very High";

export interface PricePoint {
  date: string; // ISO date
  close: number;
}

interface BaseInstrument {
  symbol: string;
  name: string;
  type: InstrumentType;
  category: string; // sector for stocks, fund category for MFs
  monogram: string;
  accent: string; // hex accent used for the instrument's avatar/sparkline
  currentPrice: number;
  prevClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  week52High: number;
  week52Low: number;
  about: string;
  tags: string[]; // descriptive personalization tags, never "buy" language
}

export interface StockInstrument extends BaseInstrument {
  type: "stock";
  marketCapCr: number;
  peRatio: number;
  pbRatio: number;
  debtToEquity: number;
  roe: number;
  dividendYield: number;
  beta: number;
}

export interface MutualFundInstrument extends BaseInstrument {
  type: "mutual_fund";
  aumCr: number;
  expenseRatio: number;
  cagr1y: number;
  cagr3y: number;
  cagr5y: number;
  riskLevel: RiskLevel;
  exitLoad: string;
  fundManager: string;
  benchmark: string;
}

export type Instrument = StockInstrument | MutualFundInstrument;

export interface Holding {
  symbol: string;
  quantity: number; // shares for stocks, units for mutual funds
  avgCost: number;
  firstBuyDate: string;
}

// ---------------- Seeded deterministic price-history generator ----------------

function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic ~1y daily close series that lands exactly on currentPrice today. */
export function generatePriceHistory(
  symbol: string,
  currentPrice: number,
  volatility: number,
  days = 365
): PricePoint[] {
  const rand = mulberry32(hashSeed(symbol));
  const drift = (rand() - 0.48) * 0.0009; // gentle long-run trend, symbol-specific
  const changes: number[] = [];
  for (let i = 0; i < days; i++) {
    const shock = (rand() - 0.5) * volatility;
    changes.push(drift + shock);
  }
  // Build forward from an implied start price, then rescale so the last point == currentPrice exactly.
  const raw: number[] = [1];
  for (let i = 0; i < days; i++) {
    raw.push(raw[raw.length - 1] * (1 + changes[i]));
  }
  const scale = currentPrice / raw[raw.length - 1];
  const today = new Date();
  const points: PricePoint[] = raw.map((v, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - i));
    return { date: d.toISOString().slice(0, 10), close: Number((v * scale).toFixed(2)) };
  });
  points[points.length - 1] = { ...points[points.length - 1], close: currentPrice };
  return points;
}

export type ChartRange = "1W" | "1M" | "6M" | "1Y";

export function sliceRange(history: PricePoint[], range: ChartRange): PricePoint[] {
  const days = { "1W": 7, "1M": 30, "6M": 182, "1Y": 365 }[range];
  return history.slice(Math.max(0, history.length - days));
}

// ---------------- Pilot instrument list (10 stocks + 6 mutual funds) ----------------

export const stocks: StockInstrument[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    type: "stock",
    category: "Energy & Conglomerate",
    monogram: "RI",
    accent: "#5b8def",
    currentPrice: 2894.4,
    prevClose: 2861.15,
    open: 2868.0,
    dayHigh: 2911.8,
    dayLow: 2855.5,
    week52High: 3217.9,
    week52Low: 2543.1,
    marketCapCr: 1958000,
    peRatio: 24.8,
    pbRatio: 2.3,
    debtToEquity: 0.38,
    roe: 9.6,
    dividendYield: 0.35,
    beta: 0.92,
    about:
      "India's largest private-sector conglomerate, spanning energy & petrochemicals, retail, and digital services through Reliance Jio.",
    tags: ["Large cap", "Multi-sector"],
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    type: "stock",
    category: "IT Services",
    monogram: "TC",
    accent: "#34d399",
    currentPrice: 4162.2,
    prevClose: 4128.9,
    open: 4135.0,
    dayHigh: 4179.5,
    dayLow: 4110.3,
    week52High: 4592.25,
    week52Low: 3785.0,
    marketCapCr: 1506000,
    peRatio: 27.9,
    pbRatio: 13.1,
    debtToEquity: 0.02,
    roe: 47.2,
    dividendYield: 1.42,
    beta: 0.68,
    about:
      "India's largest IT services exporter, providing consulting, technology, and outsourcing services across banking, retail, and manufacturing clients globally.",
    tags: ["Large cap", "Low debt", "IT services"],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    type: "stock",
    category: "Private Banking",
    monogram: "HB",
    accent: "#a78bfa",
    currentPrice: 1728.55,
    prevClose: 1712.4,
    open: 1715.0,
    dayHigh: 1739.9,
    dayLow: 1706.2,
    week52High: 1880.0,
    week52Low: 1478.15,
    marketCapCr: 1315000,
    peRatio: 19.4,
    pbRatio: 2.8,
    debtToEquity: 0.87,
    roe: 16.8,
    dividendYield: 1.15,
    beta: 0.85,
    about:
      "India's largest private-sector bank by assets, with a nationwide retail and corporate banking franchise and a strong deposit base.",
    tags: ["Large cap", "Banking"],
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    type: "stock",
    category: "IT Services",
    monogram: "IN",
    accent: "#38bdf8",
    currentPrice: 1896.7,
    prevClose: 1912.55,
    open: 1908.0,
    dayHigh: 1919.4,
    dayLow: 1883.1,
    week52High: 2006.45,
    week52Low: 1567.4,
    marketCapCr: 787000,
    peRatio: 25.1,
    pbRatio: 8.6,
    debtToEquity: 0.09,
    roe: 31.4,
    dividendYield: 2.68,
    beta: 0.72,
    about:
      "A global leader in next-generation digital services and consulting, helping enterprises navigate cloud and AI-led transformation.",
    tags: ["Large cap", "Low debt", "IT services"],
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    type: "stock",
    category: "Private Banking",
    monogram: "IB",
    accent: "#f59e0b",
    currentPrice: 1268.9,
    prevClose: 1254.3,
    open: 1257.0,
    dayHigh: 1276.6,
    dayLow: 1249.8,
    week52High: 1362.35,
    week52Low: 1046.75,
    marketCapCr: 894000,
    peRatio: 20.3,
    pbRatio: 3.4,
    debtToEquity: 0.94,
    roe: 17.9,
    dividendYield: 0.82,
    beta: 0.98,
    about:
      "One of India's leading private-sector banks with a diversified franchise across retail, SME, and corporate lending.",
    tags: ["Large cap", "Banking"],
  },
  {
    symbol: "ITC",
    name: "ITC Ltd",
    type: "stock",
    category: "FMCG",
    monogram: "IT",
    accent: "#fb923c",
    currentPrice: 468.35,
    prevClose: 471.1,
    open: 470.0,
    dayHigh: 474.2,
    dayLow: 465.9,
    week52High: 528.5,
    week52Low: 401.2,
    marketCapCr: 585000,
    peRatio: 28.6,
    pbRatio: 7.2,
    debtToEquity: 0.03,
    roe: 26.1,
    dividendYield: 3.1,
    beta: 0.54,
    about:
      "A diversified FMCG, hotels, paperboards, and agri-business major, best known for its cigarettes and packaged foods portfolio.",
    tags: ["Large cap", "Low debt", "Dividend payer"],
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd",
    type: "stock",
    category: "Infrastructure & Engineering",
    monogram: "LT",
    accent: "#22d3ee",
    currentPrice: 3624.8,
    prevClose: 3579.25,
    open: 3590.0,
    dayHigh: 3651.4,
    dayLow: 3568.6,
    week52High: 3948.9,
    week52Low: 3010.15,
    marketCapCr: 498000,
    peRatio: 32.4,
    pbRatio: 4.9,
    debtToEquity: 1.12,
    roe: 15.3,
    dividendYield: 0.78,
    beta: 1.18,
    about:
      "India's largest engineering & construction conglomerate, executing infrastructure, defence, and technology projects across the world.",
    tags: ["Large cap", "Higher volatility"],
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    type: "stock",
    category: "Telecom",
    monogram: "BA",
    accent: "#f472b6",
    currentPrice: 1642.15,
    prevClose: 1618.4,
    open: 1622.0,
    dayHigh: 1656.9,
    dayLow: 1610.5,
    week52High: 1779.0,
    week52Low: 1234.65,
    marketCapCr: 986000,
    peRatio: 41.2,
    pbRatio: 9.8,
    debtToEquity: 1.64,
    roe: 24.7,
    dividendYield: 0.49,
    beta: 0.76,
    about:
      "India's second-largest telecom operator by subscribers, with a growing digital services and enterprise business.",
    tags: ["Large cap", "Telecom"],
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    type: "stock",
    category: "Public Sector Banking",
    monogram: "SB",
    accent: "#60a5fa",
    currentPrice: 826.4,
    prevClose: 819.75,
    open: 821.0,
    dayHigh: 832.9,
    dayLow: 815.2,
    week52High: 912.1,
    week52Low: 680.3,
    marketCapCr: 737000,
    peRatio: 10.1,
    pbRatio: 1.6,
    debtToEquity: 1.21,
    roe: 18.2,
    dividendYield: 1.62,
    beta: 1.04,
    about:
      "India's largest public-sector bank, with the widest branch and ATM network in the country and a leading position in retail credit.",
    tags: ["Large cap", "Banking", "PSU"],
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    type: "stock",
    category: "Automobile",
    monogram: "TM",
    accent: "#ef4444",
    currentPrice: 782.6,
    prevClose: 805.9,
    open: 800.0,
    dayHigh: 808.4,
    dayLow: 771.15,
    week52High: 1065.7,
    week52Low: 606.35,
    marketCapCr: 288000,
    peRatio: 8.9,
    pbRatio: 3.1,
    debtToEquity: 0.71,
    roe: 34.6,
    dividendYield: 0.0,
    beta: 1.42,
    about:
      "India's leading commercial and passenger vehicle maker, and parent of Jaguar Land Rover's global luxury car business.",
    tags: ["Mid-large cap", "Higher volatility", "Automobile"],
  },
];

export const mutualFunds: MutualFundInstrument[] = [
  {
    symbol: "BAJAJ-FLEXICAP",
    name: "Bajaj Finserv Flexi Cap Fund",
    type: "mutual_fund",
    category: "Equity · Flexi Cap",
    monogram: "BF",
    accent: "#5b8def",
    currentPrice: 18.94,
    prevClose: 18.72,
    open: 18.75,
    dayHigh: 19.02,
    dayLow: 18.68,
    week52High: 20.15,
    week52Low: 15.4,
    aumCr: 6120,
    expenseRatio: 0.62,
    cagr1y: 14.8,
    cagr3y: 0,
    cagr5y: 0,
    riskLevel: "Moderately High",
    exitLoad: "1% if redeemed within 12 months",
    fundManager: "Nimesh Chandan",
    benchmark: "Nifty 500 TRI",
    about:
      "Invests across large, mid, and small-cap companies with flexibility to shift allocation as opportunities change across market cycles.",
    tags: ["Bajaj Finserv AMC", "Flexi cap"],
  },
  {
    symbol: "BAJAJ-LARGEMID",
    name: "Bajaj Finserv Large and Mid Cap Fund",
    type: "mutual_fund",
    category: "Equity · Large & Mid Cap",
    monogram: "BL",
    accent: "#34d399",
    currentPrice: 16.28,
    prevClose: 16.05,
    open: 16.1,
    dayHigh: 16.36,
    dayLow: 16.0,
    week52High: 17.9,
    week52Low: 13.2,
    aumCr: 4380,
    expenseRatio: 0.58,
    cagr1y: 13.2,
    cagr3y: 0,
    cagr5y: 0,
    riskLevel: "Moderately High",
    exitLoad: "1% if redeemed within 12 months",
    fundManager: "Sorbh Gupta",
    benchmark: "Nifty LargeMidcap 250 TRI",
    about:
      "A blend of established large-cap leaders and higher-growth mid-cap businesses, aiming to balance stability with growth potential.",
    tags: ["Bajaj Finserv AMC", "Large & mid cap"],
  },
  {
    symbol: "PPFAS-FLEXICAP",
    name: "Parag Parikh Flexi Cap Fund",
    type: "mutual_fund",
    category: "Equity · Flexi Cap",
    monogram: "PP",
    accent: "#a78bfa",
    currentPrice: 84.62,
    prevClose: 83.9,
    open: 84.0,
    dayHigh: 85.1,
    dayLow: 83.75,
    week52High: 91.4,
    week52Low: 68.9,
    aumCr: 94500,
    expenseRatio: 0.63,
    cagr1y: 16.4,
    cagr3y: 19.8,
    cagr5y: 22.1,
    riskLevel: "Moderately High",
    exitLoad: "2% if redeemed within 365 days",
    fundManager: "Rajeev Thakkar",
    benchmark: "Nifty 500 TRI",
    about:
      "A flexi-cap fund with meaningful exposure to global equities alongside Indian holdings, known for a value-oriented, low-churn style.",
    tags: ["Flexi cap", "Global exposure"],
  },
  {
    symbol: "MIRAE-LARGECAP",
    name: "Mirae Asset Large Cap Fund",
    type: "mutual_fund",
    category: "Equity · Large Cap",
    monogram: "MA",
    accent: "#38bdf8",
    currentPrice: 106.85,
    prevClose: 105.9,
    open: 106.1,
    dayHigh: 107.4,
    dayLow: 105.6,
    week52High: 114.2,
    week52Low: 92.3,
    aumCr: 42800,
    expenseRatio: 0.52,
    cagr1y: 12.6,
    cagr3y: 15.2,
    cagr5y: 17.4,
    riskLevel: "Moderate",
    exitLoad: "1% if redeemed within 365 days",
    fundManager: "Gaurav Misra",
    benchmark: "Nifty 100 TRI",
    about:
      "Focuses on the top 100 companies by market capitalisation, prioritising quality and consistency over aggressive sector bets.",
    tags: ["Large cap", "Lower volatility"],
  },
  {
    symbol: "SBI-SMALLCAP",
    name: "SBI Small Cap Fund",
    type: "mutual_fund",
    category: "Equity · Small Cap",
    monogram: "SS",
    accent: "#f59e0b",
    currentPrice: 172.4,
    prevClose: 169.8,
    open: 170.2,
    dayHigh: 174.1,
    dayLow: 168.9,
    week52High: 198.6,
    week52Low: 138.2,
    aumCr: 34600,
    expenseRatio: 0.68,
    cagr1y: 18.9,
    cagr3y: 24.6,
    cagr5y: 28.3,
    riskLevel: "Very High",
    exitLoad: "1% if redeemed within 12 months",
    fundManager: "R. Srinivasan",
    benchmark: "Nifty Smallcap 250 TRI",
    about:
      "Invests predominantly in small-cap companies, offering higher long-term growth potential alongside significantly higher volatility.",
    tags: ["Small cap", "Higher volatility"],
  },
  {
    symbol: "HDFC-BALANCED",
    name: "HDFC Balanced Advantage Fund",
    type: "mutual_fund",
    category: "Hybrid · Dynamic Asset Allocation",
    monogram: "HD",
    accent: "#fb923c",
    currentPrice: 428.9,
    prevClose: 426.2,
    open: 426.8,
    dayHigh: 430.5,
    dayLow: 425.6,
    week52High: 452.1,
    week52Low: 372.4,
    aumCr: 98700,
    expenseRatio: 0.89,
    cagr1y: 11.4,
    cagr3y: 14.1,
    cagr5y: 15.8,
    riskLevel: "Moderate",
    exitLoad: "1% if redeemed within 1 year",
    fundManager: "Srinivasan Ramamurthy",
    benchmark: "CRISIL Hybrid 50+50 Moderate Index",
    about:
      "Dynamically shifts between equity and debt based on market valuation signals, aiming to cushion downside while staying invested.",
    tags: ["Hybrid", "Lower volatility"],
  },
];

export const instruments: Instrument[] = [...stocks, ...mutualFunds];

export function getInstrument(symbol: string): Instrument | undefined {
  return instruments.find((i) => i.symbol === symbol);
}

export function getVolatility(instrument: Instrument): number {
  if (instrument.type === "stock") return 0.012 + instrument.beta * 0.006;
  const riskFactor: Record<RiskLevel, number> = {
    Low: 0.003,
    Moderate: 0.006,
    "Moderately High": 0.009,
    High: 0.013,
    "Very High": 0.017,
  };
  return riskFactor[instrument.riskLevel];
}

// ---------------- Investor holdings (Ananya Sharma's direct stocks & funds) ----------------

export const holdings: Holding[] = [
  { symbol: "RELIANCE", quantity: 12, avgCost: 2510.4, firstBuyDate: "2023-11-08" },
  { symbol: "TCS", quantity: 5, avgCost: 3889.6, firstBuyDate: "2024-02-14" },
  { symbol: "HDFCBANK", quantity: 20, avgCost: 1579.25, firstBuyDate: "2023-06-02" },
  { symbol: "BAJAJ-FLEXICAP", quantity: 452.3, avgCost: 15.2, firstBuyDate: "2023-09-01" },
  { symbol: "BAJAJ-LARGEMID", quantity: 301.7, avgCost: 13.78, firstBuyDate: "2024-01-20" },
];

export function getHolding(symbol: string): Holding | undefined {
  return holdings.find((h) => h.symbol === symbol);
}
