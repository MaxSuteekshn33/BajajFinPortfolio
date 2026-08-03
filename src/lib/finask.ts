import { schemes } from "@/data/schemes";

export interface FinAskReply {
  text: string;
  referencesScheme: boolean;
}

const ADVICE_PATTERNS: RegExp[] = [
  /should i (invest|buy|sell|switch|put|move)/i,
  /which fund is best/i,
  /best fund for me/i,
  /what (fund|scheme) should i/i,
  /what should i (invest|buy|do with my money)/i,
  /recommend (a |me a |)(fund|scheme)/i,
  /will .* (go up|go down|rise|fall|outperform)/i,
  /predict/i,
  /future return/i,
  /guarantee/i,
  /is .* a good (investment|buy)/i,
  /pick (a |)fund for me/i,
];

const GUARDRAIL_REPLY: FinAskReply = {
  text: "I can't tell you what to buy, sell, or switch to, or predict future returns — that would be personalized investment advice, and I'm not licensed to give that. What I can do: explain how a scheme or concept works, or pull up factual data (NAV, expense ratio, CAGR, risk level) for any scheme on our shelf. For personal recommendations, please consult a SEBI-registered financial advisor.",
  referencesScheme: false,
};

const FALLBACK_REPLY: FinAskReply = {
  text: "I can help explain mutual fund concepts, general personal finance topics (saving, budgeting, goal planning), or answer factual questions about schemes on our fund shelf — like \"what's the expense ratio of the Flexi Cap fund\" or \"what is a Riskometer\". Try rephrasing, or check the Learn hub for deeper explainers.",
  referencesScheme: false,
};

const CONCEPT_REPLIES: { patterns: RegExp[]; reply: string }[] = [
  {
    patterns: [/what is (a |an |)sip\b/i, /how does sip work/i],
    reply:
      "A SIP (Systematic Investment Plan) lets you invest a fixed amount at regular intervals — usually monthly — into a scheme. It buys more units when the NAV is low and fewer when it's high, averaging your purchase cost over time rather than requiring you to time the market.",
  },
  {
    patterns: [/what is nav\b/i, /what does nav mean/i],
    reply:
      "NAV (Net Asset Value) is the per-unit price of a mutual fund scheme. It's calculated by dividing the total value of the fund's holdings (minus liabilities) by the number of outstanding units, and is updated once per trading day.",
  },
  {
    patterns: [/what is (an |)expense ratio/i],
    reply:
      "The expense ratio is the annual fee a fund charges to manage your money, expressed as a percentage of your investment. It covers fund management, admin, and (for Regular plans) distributor trail commission. It's deducted from the fund's returns automatically — you never pay it separately.",
  },
  {
    patterns: [/direct.*regular|regular.*direct/i],
    reply:
      "Direct and Regular plans of the same scheme hold an identical portfolio. Direct plans have a lower expense ratio because no trail commission is paid to a distributor, so Direct plan NAV and returns are typically slightly higher over time. Regular plans cost a bit more in exchange for ongoing advisor support.",
  },
  {
    patterns: [/what is cagr/i],
    reply:
      "CAGR (Compound Annual Growth Rate) shows the smoothed annual growth rate of an investment over a period, accounting for compounding. It's a cleaner way to compare returns across different time frames than simple average returns.",
  },
  {
    patterns: [/riskometer/i],
    reply:
      "The Riskometer is a SEBI-mandated 6-level risk indicator (Low, Low to Moderate, Moderate, Moderately High, High, Very High) calculated from a scheme's actual portfolio holdings and recalculated monthly. It tells you how much a fund's value is likely to swing — not whether it's a 'good' or 'bad' fund.",
  },
  {
    patterns: [/ltcg|stcg|capital gains tax|how.*taxed/i],
    reply:
      "Equity-oriented funds (65%+ equity) are taxed as LTCG if held over 12 months, or STCG if held 12 months or less. Debt-oriented funds are taxed at your income slab rate regardless of holding period under current rules. This is general information, not tax advice — rules can change and depend on your situation, so consult a tax advisor for specifics.",
  },
  {
    patterns: [/what is (an |)amc\b/i],
    reply:
      "An AMC (Asset Management Company) is the entity that pools investor money and manages mutual fund schemes on their behalf — in this case, Bajaj Finserv Asset Management Ltd. The AMC employs fund managers, handles compliance, and is regulated by SEBI.",
  },
  {
    patterns: [/exit load/i],
    reply:
      "An exit load is a small fee charged if you redeem your units before a specified period (often 12 months for equity funds), expressed as a percentage of the redemption value. It discourages short-term in-and-out trading and is disclosed upfront on every scheme page.",
  },
  {
    patterns: [/lumpsum.*sip|sip.*lumpsum/i],
    reply:
      "A lumpsum investment puts your full amount in on day one, so its outcome depends heavily on the entry point. A SIP spreads the same total across many entry points over time, averaging your cost. Neither is inherently better — it depends on whether you have the money upfront and how comfortable you are with entry-point risk.",
  },
  {
    patterns: [/emergency fund/i],
    reply:
      "An emergency fund is 3-6 months of essential expenses kept in a highly liquid, low-risk instrument — so you're not forced to redeem longer-horizon investments at a bad time if something unexpected comes up. Liquid or Overnight fund categories are commonly used for this.",
  },
  {
    patterns: [/step.?up sip/i],
    reply:
      "A step-up SIP automatically increases your monthly contribution by a fixed amount or percentage each year — for example, +10% annually — so your investing pace keeps up with rising income without needing to manually adjust it.",
  },
  {
    patterns: [/what is (a |)benchmark/i],
    reply:
      "A benchmark is an index (like NIFTY 500 TRI or CRISIL Liquid Debt A-I Index) that a scheme is measured against to judge whether the fund manager is adding value relative to simply tracking the broader market or category.",
  },
];

function findSchemeInQuery(query: string) {
  const q = query.toLowerCase();
  return schemes.find((s) => {
    const nameLower = s.name.toLowerCase();
    const subCatLower = s.subCategory.toLowerCase();
    return q.includes(nameLower) || q.includes(subCatLower) || q.includes(nameLower.replace("bajaj finserv ", ""));
  });
}

function findSchemeAttribute(query: string, schemeName: string): string | null {
  const q = query.toLowerCase();
  const scheme = schemes.find((s) => s.name === schemeName);
  if (!scheme) return null;

  if (/expense ratio/i.test(q)) {
    return `${scheme.name}'s expense ratio is ${scheme.expenseRatio.direct}% (Direct plan) / ${scheme.expenseRatio.regular}% (Regular plan). *AI-assisted, not investment advice.*`;
  }
  if (/\bnav\b/i.test(q)) {
    return `${scheme.name}'s current NAV is ₹${scheme.nav.direct} (Direct) / ₹${scheme.nav.regular} (Regular). *AI-assisted, not investment advice.*`;
  }
  if (/cagr|return/i.test(q)) {
    return `${scheme.name}'s trailing CAGR: 1Y ${scheme.cagr1y}%, 3Y ${scheme.cagr3y}%, 5Y ${scheme.cagr5y}%. Past performance doesn't guarantee future results. *AI-assisted, not investment advice.*`;
  }
  if (/risk|riskometer/i.test(q)) {
    return `${scheme.name} is rated "${scheme.riskLevel.replace(/-/g, " ")}" on the Riskometer. *AI-assisted, not investment advice.*`;
  }
  if (/fund manager|managed by|who manages/i.test(q)) {
    return `${scheme.name} is managed by ${scheme.fundManager}, benchmarked against ${scheme.benchmark}. *AI-assisted, not investment advice.*`;
  }
  if (/minimum sip|min sip|minimum investment/i.test(q)) {
    return `${scheme.name} has a minimum SIP of ₹${scheme.minSip}/month and a minimum lumpsum of ₹${scheme.minLumpsum}. *AI-assisted, not investment advice.*`;
  }
  if (/exit load/i.test(q)) {
    return `${scheme.name}'s exit load: ${scheme.exitLoad}. *AI-assisted, not investment advice.*`;
  }
  if (/aum|assets under management/i.test(q)) {
    return `${scheme.name} has an AUM of ₹${scheme.aumCr.toLocaleString("en-IN")} crore. *AI-assisted, not investment advice.*`;
  }

  return `${scheme.name} is a ${scheme.subCategory} fund (${scheme.category}), rated "${scheme.riskLevel.replace(/-/g, " ")}" on the Riskometer, with a ${scheme.expenseRatio.direct}% expense ratio (Direct). Ask me about its NAV, CAGR, fund manager, exit load, or minimum SIP for more detail. *AI-assisted, not investment advice.*`;
}

export function getFinAskReply(query: string): FinAskReply {
  const trimmed = query.trim();
  if (!trimmed) return FALLBACK_REPLY;

  if (ADVICE_PATTERNS.some((p) => p.test(trimmed))) {
    return GUARDRAIL_REPLY;
  }

  const scheme = findSchemeInQuery(trimmed);
  if (scheme) {
    const attrAnswer = findSchemeAttribute(trimmed, scheme.name);
    if (attrAnswer) {
      return { text: attrAnswer, referencesScheme: true };
    }
  }

  for (const concept of CONCEPT_REPLIES) {
    if (concept.patterns.some((p) => p.test(trimmed))) {
      return { text: concept.reply, referencesScheme: false };
    }
  }

  return FALLBACK_REPLY;
}
