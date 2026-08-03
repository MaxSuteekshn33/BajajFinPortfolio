import { PersonaId } from "./quiz";
import { SchemeCategory } from "./schemes";

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  date: string;
  category: SchemeCategory | "macro" | "regulatory";
  relevantPersonas: PersonaId[];
  relevantSchemeIds: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    headline: "RBI holds repo rate steady at 6.5% for fourth straight review",
    summary:
      "The Monetary Policy Committee kept the repo rate unchanged, citing balanced inflation and growth outlook. Debt fund yields expected to stay range-bound in the near term.",
    source: "Economic Times",
    date: "2026-07-30",
    category: "debt",
    relevantPersonas: ["capital-preserver", "income-focused"],
    relevantSchemeIds: ["bf-liquid", "bf-money-market", "bf-overnight"],
  },
  {
    id: "n2",
    headline: "Mid and small cap indices see healthy inflows in July",
    summary:
      "Domestic mutual funds recorded net inflows of over ₹18,000 crore into mid and small cap categories last month, continuing a multi-quarter trend of retail participation.",
    source: "Mint",
    date: "2026-07-29",
    category: "equity",
    relevantPersonas: ["growth-seeker"],
    relevantSchemeIds: ["bf-small-cap", "bf-large-mid-cap"],
  },
  {
    id: "n3",
    headline: "SEBI proposes tighter disclosure norms for expense ratios",
    summary:
      "The regulator's consultation paper suggests standardizing how AMCs disclose direct vs regular plan expense differentials, aiming to improve investor transparency.",
    source: "Business Standard",
    date: "2026-07-28",
    category: "regulatory",
    relevantPersonas: [
      "growth-seeker",
      "steady-accumulator",
      "capital-preserver",
      "income-focused",
    ],
    relevantSchemeIds: [],
  },
  {
    id: "n4",
    headline: "Flexi cap funds outperform category peers on 3-year rolling returns",
    summary:
      "A study of flexi cap schemes shows the category has delivered more consistent rolling 3-year returns than pure large cap funds over the last five years, aided by market-cap flexibility.",
    source: "Moneycontrol",
    date: "2026-07-26",
    category: "equity",
    relevantPersonas: ["growth-seeker", "steady-accumulator"],
    relevantSchemeIds: ["bf-flexi-cap"],
  },
  {
    id: "n5",
    headline: "Arbitrage funds gain traction as a tax-efficient parking option",
    summary:
      "With equity taxation applying to arbitrage funds despite debt-like risk, advisors are increasingly recommending the category for short-term corporate and HNI cash parking.",
    source: "Livemint",
    date: "2026-07-24",
    category: "hybrid",
    relevantPersonas: ["capital-preserver", "income-focused"],
    relevantSchemeIds: ["bf-arbitrage"],
  },
  {
    id: "n6",
    headline: "Balanced advantage category AUM crosses ₹3 lakh crore nationally",
    summary:
      "Dynamic asset allocation funds continue to attract conservative equity investors looking for downside cushioning without exiting markets entirely.",
    source: "Financial Express",
    date: "2026-07-22",
    category: "hybrid",
    relevantPersonas: ["steady-accumulator", "income-focused"],
    relevantSchemeIds: ["bf-balanced-advantage"],
  },
  {
    id: "n7",
    headline: "Union Budget retains LTCG structure for equity mutual funds",
    summary:
      "No changes were proposed to the long-term capital gains framework for equity-oriented funds, providing continuity for investors planning multi-year SIPs.",
    source: "Economic Times",
    date: "2026-07-20",
    category: "regulatory",
    relevantPersonas: [
      "growth-seeker",
      "steady-accumulator",
      "capital-preserver",
      "income-focused",
    ],
    relevantSchemeIds: [],
  },
  {
    id: "n8",
    headline: "Liquid fund category sees short-term outflows ahead of advance tax dates",
    summary:
      "Corporates and HNIs typically redeem liquid fund units around advance tax deadlines — a seasonal pattern rather than a shift in category outlook.",
    source: "CNBC-TV18",
    date: "2026-07-18",
    category: "debt",
    relevantPersonas: ["capital-preserver"],
    relevantSchemeIds: ["bf-liquid"],
  },
  {
    id: "n9",
    headline: "Large cap funds see renewed interest as valuations normalize",
    summary:
      "After a mid-cap-heavy rally, some fund managers are rotating back toward large caps citing more reasonable valuations relative to earnings growth.",
    source: "Moneycontrol",
    date: "2026-07-16",
    category: "equity",
    relevantPersonas: ["steady-accumulator", "capital-preserver"],
    relevantSchemeIds: ["bf-large-cap"],
  },
  {
    id: "n10",
    headline: "SIP contributions hit fresh all-time high nationally",
    summary:
      "Monthly SIP inflows across the industry crossed a new record, with over 8 crore active SIP accounts — reflecting sustained retail participation in equity markets.",
    source: "Economic Times",
    date: "2026-07-14",
    category: "equity",
    relevantPersonas: [
      "growth-seeker",
      "steady-accumulator",
      "capital-preserver",
      "income-focused",
    ],
    relevantSchemeIds: [],
  },
];
