// All data below is hardcoded mock data for demo purposes only.

export const investorProfile = {
  name: "Ananya Sharma",
  age: 29,
  city: "Pune",
  persona: "Steady Accumulator",
  personaExplainer:
    "Derived from her transaction behaviour: consistent monthly SIPs, rare panic withdrawals, and a history of increasing contributions after salary hikes. Ananya rarely reacts to short-term volatility — she accumulates steadily.",
  portfolioValue: 482300,
  xirr: 12.4,
  activeGoals: 3,
};

// ---------------- Distributor Co-Pilot ----------------

export const distributorProfile = {
  name: "Rajesh Mehta",
  city: "Mumbai",
  advisingSince: 2022,
  clients: 214,
  aum: "₹38.6 Cr",
  aumValue: 386000000,
  monthlySipBook: "₹42.8 L",
  clientRetention: 94,
  revenueThisQuarter: "₹18.6 L",
  annualTrailIncomeBase: 7440000, // ₹74.4L/yr at current adoption
};

export type RiskLevel = "High" | "Medium";

export interface ChurnClient {
  id: string;
  name: string;
  aum: string;
  riskScore: RiskLevel;
  reason: string;
  talkingPoints: string[];
}

export const churnClients: ChurnClient[] = [
  {
    id: "c1",
    name: "Vikram Desai",
    aum: "₹42.1 L",
    riskScore: "High",
    reason: "SIP paused twice",
    talkingPoints: [
      "Acknowledge the SIP pauses without judgment — ask what changed in his cash flow the last two months.",
      "Show him the goal-linked view: pausing the SIP pushes his child's education goal back by ~14 months.",
      "Offer a temporary SIP amount reduction instead of a full pause — keeps compounding alive.",
      "Mention the recent market dip is exactly when disciplined investors historically gained the most ground.",
    ],
  },
  {
    id: "c2",
    name: "Priya Nair",
    aum: "₹68.4 L",
    riskScore: "High",
    reason: "Logged in 8x during market dip",
    talkingPoints: [
      "High app activity during the dip usually signals anxiety, not intent to redeem — open with reassurance.",
      "Walk her through her portfolio's past recovery pattern after the 2024 correction.",
      "Offer a portfolio review call this week — clients who get a proactive call during volatility redeem 3x less often.",
      "Highlight her large-cap allocation is defensively positioned relative to her risk profile.",
    ],
  },
  {
    id: "c3",
    name: "Suresh Iyer",
    aum: "₹1.2 Cr",
    riskScore: "High",
    reason: "Large idle balance in savings",
    talkingPoints: [
      "₹18L has sat idle in his linked savings account for 40+ days — good opening for a top-up conversation.",
      "Position a liquid-to-hybrid STP rather than a lump sum — lower psychological barrier.",
      "Reference his stated goal of early retirement at 55 — idle cash is the biggest drag on that timeline.",
      "Suggest reviewing his asset allocation given the balance growth since last rebalancing.",
    ],
  },
  {
    id: "c4",
    name: "Meera Kulkarni",
    aum: "₹29.7 L",
    riskScore: "Medium",
    reason: "SIP paused once",
    talkingPoints: [
      "Single pause is often a temporary cash-flow issue — a light-touch check-in works better than a hard pitch.",
      "Ask if the pause was planned (e.g. a large expense) or reactive to market news.",
      "Offer to resume at a lower amount if cash flow is tight, rather than losing the SIP entirely.",
    ],
  },
  {
    id: "c5",
    name: "Arjun Rao",
    aum: "₹55.9 L",
    riskScore: "Medium",
    reason: "Logged in 6x during market dip",
    talkingPoints: [
      "Moderate anxiety signal — a short reassurance message may be enough before a full call.",
      "Share his portfolio's 3-year rolling return chart to contextualize the recent dip.",
      "Flag that his goal timeline (retirement 2041) has ample room to absorb short-term volatility.",
    ],
  },
  {
    id: "c6",
    name: "Kavita Joshi",
    aum: "₹34.2 L",
    riskScore: "Medium",
    reason: "Large idle balance in savings",
    talkingPoints: [
      "₹6.5L idle for 30+ days — smaller opportunity than Suresh's but still worth a nudge.",
      "Suggest a top-up to her existing Emergency Fund goal, which is currently under-funded.",
      "Low-pressure conversation — frame as 'put idle cash to work', not a hard sell.",
    ],
  },
];

export const totalChurnRiskCount = 12;

export interface CallScript {
  clientId: string;
  title: string;
  opener: string;
  lines: string[];
  closer: string;
}

export const callScripts: CallScript[] = [
  {
    clientId: "c1",
    title: "SIP paused twice — reactivation call",
    opener:
      "\"Hi Vikram, this is Rajesh from Bajaj Finserv. Noticed your SIP paused the last two months — wanted to check in, not to sell anything.\"",
    lines: [
      "Ask what changed in his cash flow — listen without judgment before pitching anything.",
      "Show the goal-linked view: pausing pushes his child's education goal back by ~14 months.",
      "Offer a temporary SIP reduction instead of a full pause — keeps compounding alive.",
      "Note that this exact dip is historically when disciplined investors gain the most ground.",
    ],
    closer:
      "\"Even a smaller amount restarted today keeps you on track — shall I set that up while we're on the call?\"",
  },
  {
    clientId: "c2",
    title: "8x dip logins — reassurance call",
    opener:
      "\"Hi Priya, saw you've been checking your portfolio quite a bit this week — totally normal with markets moving. Wanted to walk you through what's actually happening.\"",
    lines: [
      "Open with reassurance — high app activity during a dip usually signals anxiety, not intent to redeem.",
      "Walk through her portfolio's recovery pattern after the 2024 correction using her own numbers.",
      "Offer a proactive portfolio review this week — clients who get a call during volatility redeem 3x less.",
      "Highlight that her large-cap allocation is already defensively positioned for her risk profile.",
    ],
    closer:
      "\"Nothing about your plan has changed — want me to send a short summary you can keep for reference?\"",
  },
  {
    clientId: "c3",
    title: "Idle savings balance — top-up call",
    opener:
      "\"Hi Suresh, noticed about ₹18L has been sitting in your linked savings account for a while — thought I'd flag it since it's not doing much there.\"",
    lines: [
      "Frame it as an opportunity, not a sales pitch — idle cash earning near-zero is the opener.",
      "Position a liquid-to-hybrid STP rather than a lump sum — lower psychological barrier to start.",
      "Reference his stated goal of early retirement at 55 — idle cash is the biggest drag on that timeline.",
      "Suggest a quick asset allocation review given how much the balance has grown since last rebalancing.",
    ],
    closer:
      "\"Even moving half of it into a staggered plan this week would make a real difference by 55 — want me to draft that?\"",
  },
];

export interface Lead {
  id: string;
  name: string;
  city: string;
  investmentIntent: string;
  distance: string;
  projectedTrailPerYear: number;
  aumValue: number;
}

export const leads: Lead[] = [
  {
    id: "l1",
    name: "Neha Kapoor",
    city: "Andheri, Mumbai",
    investmentIntent: "₹15,000/mo SIP — Tax saving (ELSS)",
    distance: "3.1 km away",
    projectedTrailPerYear: 2700,
    aumValue: 1800000,
  },
  {
    id: "l2",
    name: "Rohan Bhatt",
    city: "Bandra, Mumbai",
    investmentIntent: "₹5,00,000 lumpsum — Retirement planning",
    distance: "4.8 km away",
    projectedTrailPerYear: 7500,
    aumValue: 500000,
  },
  {
    id: "l3",
    name: "Sanjana Pillai",
    city: "Powai, Mumbai",
    investmentIntent: "₹8,000/mo SIP — Child education goal",
    distance: "6.2 km away",
    projectedTrailPerYear: 1440,
    aumValue: 960000,
  },
];

export type Channel = "App" | "Assisted" | "Branch";

export interface LedgerEntry {
  id: string;
  client: string;
  transaction: string;
  channel: Channel;
  attributionStatus: string;
  trailEarned: string;
}

export const ledgerEntries: LedgerEntry[] = [
  {
    id: "t1",
    client: "Ananya Sharma",
    transaction: "SIP top-up ₹6,000",
    channel: "App",
    attributionStatus: "Credited to you",
    trailEarned: "₹9",
  },
  {
    id: "t2",
    client: "Vikram Desai",
    transaction: "Lumpsum ₹1,20,000",
    channel: "Assisted",
    attributionStatus: "Credited to you",
    trailEarned: "₹180",
  },
  {
    id: "t3",
    client: "Priya Nair",
    transaction: "SIP renewal ₹25,000/mo",
    channel: "App",
    attributionStatus: "Credited to you",
    trailEarned: "₹375",
  },
  {
    id: "t4",
    client: "Suresh Iyer",
    transaction: "STP setup ₹18,00,000",
    channel: "Branch",
    attributionStatus: "Credited to you",
    trailEarned: "₹2,700",
  },
  {
    id: "t5",
    client: "Meera Kulkarni",
    transaction: "New SIP ₹10,000/mo",
    channel: "App",
    attributionStatus: "Credited to you",
    trailEarned: "₹150",
  },
  {
    id: "t6",
    client: "Arjun Rao",
    transaction: "Switch: Debt → Hybrid",
    channel: "Assisted",
    attributionStatus: "Credited to you",
    trailEarned: "₹84",
  },
];

export const howItWorksSteps = [
  {
    title: "Signals in",
    description:
      "Your transactions, SIP behaviour, app activity, market events, and consented Bajaj group signals flow into a single customer graph.",
  },
  {
    title: "FinAI models",
    description:
      "Behavioural models score your goal risk and life-stage signals — quietly, in the background, every day.",
  },
  {
    title: "Personalization out",
    description:
      "Nudges and next-best-actions are generated for you, per moment — not a generic segment or template.",
  },
  {
    title: "Always in sync",
    description:
      "Every signal updates your portfolio view in real time, across devices, the moment it happens.",
  },
];

// ---------------- Landing page ----------------

export const problemStats = [
  {
    stat: "12.4%",
    label: "average XIRR, personalized to your holdings",
  },
  {
    stat: "24/7",
    label: "live NSE/BSE market data & alerts",
  },
  {
    stat: "500+",
    label: "stocks & mutual funds, one unified app",
  },
];

export const problemLine = "Investing that adapts to your life — not the other way around.";

export type CompareValue = "yes" | "partial" | "no";

export interface CompareRow {
  feature: string;
  bajajFinos: CompareValue;
  growwZerodha: CompareValue;
  traditionalAmc: CompareValue;
  bankRm: CompareValue;
}

export const compareColumns = ["Bajaj FinOS", "Groww / Zerodha", "Traditional AMC", "Bank RM"];

export const compareRows: CompareRow[] = [
  {
    feature: "Hyper-personalized D2C",
    bajajFinos: "yes",
    growwZerodha: "yes",
    traditionalAmc: "no",
    bankRm: "partial",
  },
  {
    feature: "AI copilot for your goals",
    bajajFinos: "yes",
    growwZerodha: "partial",
    traditionalAmc: "no",
    bankRm: "no",
  },
  {
    feature: "Unified consented data",
    bajajFinos: "yes",
    growwZerodha: "partial",
    traditionalAmc: "no",
    bankRm: "partial",
  },
  {
    feature: "Direct stocks + mutual funds, one app",
    bajajFinos: "yes",
    growwZerodha: "yes",
    traditionalAmc: "no",
    bankRm: "no",
  },
];

export interface DataSpineSource {
  name: string;
  description: string;
}

export const dataSpineSources: DataSpineSource[] = [
  {
    name: "Account Aggregator framework",
    description: "Consented bank & investment account data via the RBI-regulated AA network.",
  },
  {
    name: "AMC transactions",
    description: "SIPs, lumpsums, switches, and redemptions across Bajaj Finserv AMC schemes.",
  },
  {
    name: "Distributor CRM",
    description: "Call notes and meeting history from your mutual fund distributor, kept in sync with your app.",
  },
  {
    name: "Bajaj group signals",
    description: "Consented cross-sell signals from other Bajaj Finserv products, where opted in.",
  },
];

export const dataSpineConsentLine = "All signals consent-gated under DPDP Act 2023.";
