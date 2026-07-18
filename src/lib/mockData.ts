// All data below is hardcoded mock data for demo purposes only.

export type GoalStatus = "on-track" | "complete" | "off-track";

export interface Goal {
  id: string;
  name: string;
  progress: number; // current %
  targetProgress: number; // where it should be by now
  status: GoalStatus;
  targetAmount: number;
  currentAmount: number;
  targetYear: number;
}

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

export const initialGoals: Goal[] = [
  {
    id: "home",
    name: "Home Down Payment 2029",
    progress: 72,
    targetProgress: 72,
    status: "on-track",
    targetAmount: 2000000,
    currentAmount: 1440000,
    targetYear: 2029,
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    progress: 100,
    targetProgress: 100,
    status: "complete",
    targetAmount: 300000,
    currentAmount: 300000,
    targetYear: 2026,
  },
  {
    id: "europe",
    name: "Europe Trip 2027",
    progress: 37,
    targetProgress: 45,
    status: "off-track",
    targetAmount: 400000,
    currentAmount: 148000,
    targetYear: 2027,
  },
];

export const finaiNudge = {
  message:
    "Markets dipped 4% this month. Your Europe goal is slightly behind. A one-time top-up of ₹6,000 or increasing your SIP by ₹500 gets you back on track.",
  topUpAmount: 6000,
  sipIncreaseAmount: 500,
};

export interface ChatQA {
  id: string;
  question: string;
  answer: string;
  showChart?: boolean;
}

export const chatScript: ChatQA[] = [
  {
    id: "q1",
    question: "Should I stop my SIP since markets are falling?",
    answer:
      "Totally understandable to feel that way — but pausing now usually works against you. When markets dip, your fixed SIP amount buys more units at a lower price. This is called rupee cost averaging, and it's one of the most reliable ways long-term investors benefit from volatility instead of fearing it. Your Home and Emergency goals are already on track because you stayed consistent through past dips too. Staying invested is the steady-accumulator move.",
    showChart: true,
  },
  {
    id: "q2",
    question: "How is my Europe Trip goal doing?",
    answer:
      "It's currently 8% behind where it should be, mainly due to this month's market dip. A one-time top-up of ₹6,000 or a ₹500 increase to your monthly SIP will bring it fully back on track for your 2027 target. I can set either of these up for you right from this dashboard.",
  },
  {
    id: "q3",
    question: "What kind of investor am I?",
    answer:
      "You're tagged as a 'Steady Accumulator' — based on 18 months of transaction history, you've never skipped a SIP, you increased contributions twice after salary hikes, and you didn't redeem during the two market corrections last year. Investors with this pattern who stay invested through dips typically reach their goals 15-20% faster than those who pause.",
  },
];

export const rupeeCostAveragingData = [
  { month: "Feb", nav: 42, unitsBought: 11.9 },
  { month: "Mar", nav: 38, unitsBought: 13.2 },
  { month: "Apr", nav: 35, unitsBought: 14.3 },
  { month: "May", nav: 39, unitsBought: 12.8 },
  { month: "Jun", nav: 44, unitsBought: 11.4 },
  { month: "Jul", nav: 47, unitsBought: 10.6 },
];

// ---------------- Distributor Co-Pilot ----------------

export const distributorProfile = {
  name: "Rajesh Mehta",
  city: "Mumbai",
  clients: 214,
  aum: "₹38.6 Cr",
  monthlySipBook: "₹42.8 L",
  clientRetention: 94,
  revenueThisQuarter: "₹18.6 L",
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

export interface Lead {
  id: string;
  name: string;
  city: string;
  investmentIntent: string;
  distance: string;
}

export const leads: Lead[] = [
  {
    id: "l1",
    name: "Neha Kapoor",
    city: "Andheri, Mumbai",
    investmentIntent: "₹15,000/mo SIP — Tax saving (ELSS)",
    distance: "3.1 km away",
  },
  {
    id: "l2",
    name: "Rohan Bhatt",
    city: "Bandra, Mumbai",
    investmentIntent: "₹5,00,000 lumpsum — Retirement planning",
    distance: "4.8 km away",
  },
  {
    id: "l3",
    name: "Sanjana Pillai",
    city: "Powai, Mumbai",
    investmentIntent: "₹8,000/mo SIP — Child education goal",
    distance: "6.2 km away",
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
      "Transactions, SIP behaviour, app activity, market events, and consented Bajaj group signals flow into a single customer graph.",
  },
  {
    title: "FinAI models",
    description:
      "Behavioural models score goal risk, churn risk, and life-stage signals — the same models power both faces of the platform.",
  },
  {
    title: "Personalization out",
    description:
      "Nudges, next-best-actions, and talking points are generated per person, per moment — not generic segments.",
  },
  {
    title: "Both faces",
    description:
      "The investor sees a calm, personal nudge. Their distributor sees the same signal as a conversation opener — never a conflict.",
  },
];
