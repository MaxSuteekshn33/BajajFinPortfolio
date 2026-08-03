export interface EducationArticle {
  slug: string;
  title: string;
  category: "Basics" | "SIP Investing" | "Taxation" | "Risk" | "Goal Planning";
  readMins: number;
  summary: string;
  sections: { heading: string; body: string }[];
}

export const educationArticles: EducationArticle[] = [
  {
    slug: "what-is-a-mutual-fund",
    title: "What is a mutual fund, really?",
    category: "Basics",
    readMins: 4,
    summary:
      "A mutual fund pools money from many investors and invests it in a diversified basket of securities, managed by a professional fund manager.",
    sections: [
      {
        heading: "The pool",
        body: "When you invest in a mutual fund, your money is combined with that of thousands of other investors into a single pool. This pool is then invested according to the fund's stated objective — say, large cap equity, or short-term debt.",
      },
      {
        heading: "Units and NAV",
        body: "Your share of the pool is represented by 'units'. Each unit has a price called the Net Asset Value (NAV), which moves up or down daily based on the value of the fund's underlying holdings.",
      },
      {
        heading: "Why diversification matters",
        body: "Because the fund holds many securities at once, the poor performance of any single stock or bond has a smaller impact on your overall investment than it would if you held that one security directly.",
      },
    ],
  },
  {
    slug: "sip-investing-explained",
    title: "SIP investing: how it actually smooths out volatility",
    category: "SIP Investing",
    readMins: 5,
    summary:
      "A Systematic Investment Plan (SIP) lets you invest a fixed amount at regular intervals, buying more units when prices are low and fewer when prices are high.",
    sections: [
      {
        heading: "Rupee cost averaging",
        body: "By investing a fixed amount every month regardless of market level, you automatically buy more units when the NAV is low and fewer when it's high. Over time, this averages out your purchase cost rather than betting on a single entry point.",
      },
      {
        heading: "Why timing the market is hard",
        body: "Consistently buying at the exact market bottom is extraordinarily difficult, even for professionals. SIPs remove that pressure by spreading your entry across market cycles.",
      },
      {
        heading: "Discipline over timing",
        body: "The biggest edge a SIP gives most investors isn't a mathematical one — it's behavioral. Automating the investment removes the temptation to pause contributions during a downturn, which is often when staying invested matters most.",
      },
    ],
  },
  {
    slug: "step-up-sip",
    title: "Step-up SIPs: growing your contribution as your income grows",
    category: "SIP Investing",
    readMins: 3,
    summary:
      "A step-up (or top-up) SIP automatically increases your monthly investment by a fixed amount or percentage each year, helping your investing pace keep up with rising income.",
    sections: [
      {
        heading: "The idea",
        body: "Instead of manually increasing your SIP amount every year, a step-up SIP does it automatically — for example, increasing your monthly contribution by 10% annually.",
      },
      {
        heading: "Why it compounds faster",
        body: "Because more money is invested earlier in the compounding period compared to waiting and increasing contributions only near your goal date, a step-up SIP can meaningfully shorten the time needed to reach a goal versus a flat SIP.",
      },
    ],
  },
  {
    slug: "ltcg-stcg-equity-debt",
    title: "LTCG and STCG: how equity and debt funds are taxed differently",
    category: "Taxation",
    readMins: 6,
    summary:
      "Equity-oriented and debt-oriented mutual funds are taxed under different rules for capital gains — understanding the holding period thresholds matters for post-tax returns.",
    sections: [
      {
        heading: "Equity-oriented funds",
        body: "Funds with 65%+ equity allocation (like the Flexi Cap, Large Cap, Large & Mid Cap, and Small Cap schemes on this platform) qualify as equity-oriented for tax purposes. Gains on units held for more than 12 months are Long-Term Capital Gains (LTCG); units held 12 months or less are Short-Term Capital Gains (STCG).",
      },
      {
        heading: "Debt-oriented funds",
        body: "Funds primarily invested in debt and money market instruments (like Liquid, Overnight, and Money Market schemes) are taxed as per your income tax slab rate, regardless of holding period, under current rules.",
      },
      {
        heading: "This is general information, not tax advice",
        body: "Tax rules change with each Union Budget and depend on your individual circumstances. This article explains the general framework only — please consult a qualified tax advisor for guidance specific to your situation.",
      },
    ],
  },
  {
    slug: "understanding-the-riskometer",
    title: "Reading the Riskometer: what the 6 levels actually mean",
    category: "Risk",
    readMins: 4,
    summary:
      "SEBI mandates a standardized 6-level Riskometer on every scheme, from Low to Very High, based on the fund's underlying portfolio composition.",
    sections: [
      {
        heading: "Why it exists",
        body: "Before the Riskometer, investors often judged a fund's risk purely by its name or past returns. SEBI introduced a standardized, portfolio-based risk calculation so every scheme in India is measured the same way.",
      },
      {
        heading: "The six levels",
        body: "Low, Low to Moderate, Moderate, Moderately High, High, and Very High. A Liquid fund typically sits at Low; a Small Cap equity fund typically sits at Very High. The level is recalculated monthly based on the fund's actual holdings, not just its category label.",
      },
      {
        heading: "It's about volatility, not 'goodness'",
        body: "A higher Riskometer level doesn't mean a fund is worse — it means its value is likely to swing more in the short term. Matching the Riskometer level to your own time horizon and comfort with volatility is the goal, not avoiding high levels entirely.",
      },
    ],
  },
  {
    slug: "direct-vs-regular-plans",
    title: "Direct vs Regular plans: where does the expense ratio difference go?",
    category: "Basics",
    readMins: 4,
    summary:
      "Every scheme is available in a Direct plan and a Regular plan. The NAV and returns differ because Regular plans carry a trail commission paid to the distributor who facilitated the investment.",
    sections: [
      {
        heading: "Same portfolio, different cost",
        body: "A Direct and Regular plan of the same scheme hold the identical underlying portfolio. The only difference is the expense ratio — Regular plans charge a higher expense ratio, part of which is paid out as trail commission to the distributor or advisor who helped you invest.",
      },
      {
        heading: "What you get for the difference",
        body: "In exchange for the higher cost, Regular plan investors typically receive ongoing guidance, portfolio reviews, and service support from their distributor. Direct plan investors manage the relationship themselves in exchange for a lower cost and correspondingly higher NAV over time.",
      },
      {
        heading: "Neither is universally 'better'",
        body: "The right choice depends on whether you value the advisory relationship enough to pay for it. This platform shows both options transparently on every scheme so you can decide for yourself.",
      },
    ],
  },
  {
    slug: "budgeting-fundamentals",
    title: "Budgeting fundamentals before you start investing",
    category: "Goal Planning",
    readMins: 5,
    summary:
      "A simple framework — track, allocate, automate — for getting your budget in order before committing to regular investments.",
    sections: [
      {
        heading: "Track first",
        body: "Before setting an investment amount, spend one month tracking where your money actually goes. Most budgeting plans fail not because of bad math, but because they're based on assumptions rather than actual spending data.",
      },
      {
        heading: "Build an emergency fund first",
        body: "A common rule of thumb is 3-6 months of essential expenses in a highly liquid instrument before committing to longer-horizon investments. This prevents you from having to redeem growth investments at a bad time due to an emergency.",
      },
      {
        heading: "Automate what's left",
        body: "Once essentials, an emergency buffer, and debt payments are accounted for, automating a fixed SIP amount from what remains removes the monthly decision-making that often leads to under-investing.",
      },
    ],
  },
  {
    slug: "goal-based-investing",
    title: "Goal-based investing: working backward from what you need",
    category: "Goal Planning",
    readMins: 4,
    summary:
      "Instead of picking an investment amount arbitrarily, goal-based investing starts with your target amount and date, then works backward to the required monthly contribution.",
    sections: [
      {
        heading: "Start with the number",
        body: "Define your goal in concrete terms: amount needed, and the date you need it by. A vague goal like 'save more' is hard to plan for; 'accumulate ₹15 lakh in 7 years for a down payment' is not.",
      },
      {
        heading: "Match the horizon to the instrument",
        body: "A goal 1-2 years away is generally better suited to lower-volatility debt instruments, since there's less time to recover from a downturn. A goal 7+ years away has more room for equity-oriented growth.",
      },
      {
        heading: "Use a calculator, then revisit annually",
        body: "Tools like the Goal Retriever on this platform estimate the required SIP based on an assumed rate of return. Because actual returns vary year to year, it's worth revisiting the required contribution annually rather than setting it once and forgetting it.",
      },
    ],
  },
];
