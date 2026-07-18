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
  trailCredited: "₹9",
};

export interface ChatQA {
  id: string;
  question: string;
  answer: string;
  showChart?: boolean;
  offerAdvisor?: boolean;
}

// Saathi — floating AI concierge widget script
export const saathiScript: ChatQA[] = [
  {
    id: "s1",
    question: "Why is my portfolio down?",
    answer:
      "Your portfolio dipped about 4% this month simply because markets moved down broadly — nothing specific to your holdings changed. Your allocation is untouched, and goals like your Home and Emergency Fund are still on track. Short dips like this are a normal, expected part of investing.",
  },
  {
    id: "s2",
    question: "Can I increase my SIP?",
    answer:
      "Yes — increasing your SIP by ₹500/month would bring your Europe Trip goal fully back on track for 2027. You can do this right from the goal card above, or I can point you to it. Small increases now compound meaningfully by your target year.",
  },
  {
    id: "s3",
    question: "Should I stop my SIP?",
    answer:
      "I'd gently push back on that. When markets dip, your fixed SIP amount buys more units at a lower price — that's rupee-cost averaging working in your favour, not against you. Investors with your pattern who stayed invested through past dips reached their goals 15-20% faster than those who paused. If you're feeling uneasy, a quick call with Rajesh usually helps more than pausing.",
    showChart: true,
    offerAdvisor: true,
  },
];

export const marketDipBanner = {
  title: "Markets dipped 4% this month. Your goals are built for this — see why",
  body: "Short-term dips are exactly what your goal plans are designed to absorb. Your SIPs keep buying more units at lower prices during dips like this one (rupee-cost averaging), and your target dates already build in room for volatility. Investors who stay the course through dips typically reach their goals faster, not slower — reacting is usually the only way to actually lose ground.",
};

export type Lang = "en" | "hi";

export const translations: Record<
  Lang,
  {
    nudgeMessage: string;
    topUp: string;
    increaseSip: string;
    offTrack: string;
    onTrack: string;
    complete: string;
    doneMessage: string;
    bannerTitle: string;
    bannerBody: string;
    bannerCta: string;
  }
> = {
  en: {
    nudgeMessage: finaiNudge.message,
    topUp: "Top up",
    increaseSip: "Increase SIP",
    offTrack: "Off Track",
    onTrack: "On Track",
    complete: "Complete",
    doneMessage: "Done. Your goal is back on track.",
    bannerTitle: marketDipBanner.title,
    bannerBody: marketDipBanner.body,
    bannerCta: "See why",
  },
  hi: {
    nudgeMessage:
      "इस महीने बाज़ार में 4% की गिरावट आई है। आपका यूरोप ट्रिप लक्ष्य थोड़ा पीछे है। ₹6,000 का एकमुश्त टॉप-अप या ₹500 की SIP वृद्धि इसे फिर से ट्रैक पर ला देगी।",
    topUp: "टॉप-अप करें",
    increaseSip: "SIP बढ़ाएँ",
    offTrack: "लक्ष्य से पीछे",
    onTrack: "ट्रैक पर",
    complete: "पूर्ण",
    doneMessage: "हो गया। आपका लक्ष्य फिर से ट्रैक पर है।",
    bannerTitle: "इस महीने बाज़ार में 4% की गिरावट आई — आपके लक्ष्य इसी के लिए बनाए गए हैं, वजह जानें",
    bannerBody:
      "इस तरह की छोटी गिरावटें आपके लक्ष्य-आधारित योजना के लिए सामान्य हैं। गिरावट के दौरान आपकी SIP कम कीमत पर ज़्यादा यूनिट खरीदती है (रुपी-कॉस्ट एवरेजिंग), और आपकी लक्ष्य तारीखों में पहले से ही उतार-चढ़ाव के लिए जगह रखी गई है। जो निवेशक ऐसी गिरावटों के दौरान निवेशित रहते हैं, वे आमतौर पर अपने लक्ष्यों तक तेज़ी से पहुँचते हैं।",
    bannerCta: "वजह जानें",
  },
};

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

// ---------------- Landing page ----------------

export const problemStats = [
  {
    stat: "84%",
    label: "of flows still distributor-led",
  },
  {
    stat: "21% → ~30%",
    label: "Direct equity AUM share, 2020 → 2025",
  },
  {
    stat: "2-3x",
    label: "AUM/yr growth rate of fintech challengers",
  },
];

export const problemLine = "The industry is forcing a choice. FinOS refuses to choose.";

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
    feature: "Human advisor attached",
    bajajFinos: "yes",
    growwZerodha: "no",
    traditionalAmc: "yes",
    bankRm: "yes",
  },
  {
    feature: "Distributor earns on digital transactions",
    bajajFinos: "yes",
    growwZerodha: "no",
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
    feature: "Bajaj ecosystem distribution",
    bajajFinos: "yes",
    growwZerodha: "no",
    traditionalAmc: "no",
    bankRm: "no",
  },
];

export interface RolloutPhase {
  phase: string;
  window: string;
  title: string;
  description: string;
}

export const rolloutPhases: RolloutPhase[] = [
  {
    phase: "Phase 1",
    window: "0–6 mo",
    title: "Arm the channel",
    description: "Distributor Co-Pilot + Data Spine — give every distributor an AI edge first.",
  },
  {
    phase: "Phase 2",
    window: "6–12 mo",
    title: "Open the direct door",
    description: "Investor app with attribution built in — direct never means disintermediated.",
  },
  {
    phase: "Phase 3",
    window: "12+ mo",
    title: "Scale",
    description: "Vernacular AI advisory + Bajaj group cross-sell — one graph, whole ecosystem.",
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
    description: "Client relationship history, calls, and meeting notes from the distributor's own book.",
  },
  {
    name: "Bajaj group signals",
    description: "Consented cross-sell signals from other Bajaj Finserv products, where opted in.",
  },
];

export const dataSpineConsentLine = "All signals consent-gated under DPDP Act 2023.";
