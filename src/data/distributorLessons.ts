export interface DistributorLesson {
  slug: string;
  title: string;
  category: "Market Update" | "Product Training";
  videoMins: number;
  summary: string;
  sections: { heading: string; body: string }[];
  translations?: {
    hi: { title: string; summary: string };
  };
}

export const distributorLessons: DistributorLesson[] = [
  {
    slug: "why-bajaj-owns-its-funds",
    title: "Why \"Bajaj owns its funds\" is your strongest pitch line",
    category: "Product Training",
    videoMins: 6,
    summary:
      "Zerodha and Groww only distribute funds — Bajaj Finserv AMC manufactures them. That difference is a legitimate urgency lever in every pitch.",
    sections: [
      {
        heading: "Platform vs manufacturer",
        body: "Execution-only platforms have no visibility into a fund's future roadmap because they don't build the funds. Bajaj Finserv AMC does — so its distributors can speak credibly about upcoming launches and category expansion.",
      },
      {
        heading: "Using it without overselling",
        body: "Don't lead with hype. Use it to answer 'why not just use an app' — position early access to the AMC's roadmap as a genuine, non-repeatable advantage of the relationship.",
      },
    ],
    translations: {
      hi: {
        title: "\"बजाज अपने फंड खुद बनाता है\" — आपकी सबसे मजबूत पिच लाइन",
        summary:
          "ज़ेरोधा और ग्रो सिर्फ फंड बेचते हैं — बजाज फिनसर्व AMC खुद फंड बनाता है। यही फर्क आपकी बिक्री बातचीत में असली बढ़त है।",
      },
    },
  },
  {
    slug: "objection-handling-refresher",
    title: "Objection handling refresher: the top 4 pushbacks",
    category: "Product Training",
    videoMins: 8,
    summary:
      "A quick refresher on the four objections distributors hear most often, and how to respond without sounding scripted.",
    sections: [
      {
        heading: "\"I can do this myself on an app\"",
        body: "Acknowledge the convenience, then pivot to the AMC-ownership angle plus the value of a human relationship during volatile markets.",
      },
      {
        heading: "\"Direct plans have no fees\"",
        body: "Reframe the trail as what funds ongoing advice and priority access — not a hidden cost.",
      },
    ],
    translations: {
      hi: {
        title: "आपत्ति समाधान रिफ्रेशर: सबसे आम 4 आपत्तियां",
        summary: "जो चार आपत्तियां डिस्ट्रीब्यूटर सबसे ज्यादा सुनते हैं, उनका सहज जवाब कैसे दें।",
      },
    },
  },
  {
    slug: "flexi-cap-deep-dive",
    title: "Scheme deep-dive: Bajaj Finserv Flexi Cap Fund",
    category: "Product Training",
    videoMins: 7,
    summary:
      "What flexi cap flexibility actually means for a client's portfolio, and which persona this fund fits best.",
    sections: [
      {
        heading: "No market-cap bias",
        body: "The fund manager can rotate freely across large, mid, and small cap depending on where opportunity is, unlike category-locked funds.",
      },
      {
        heading: "Who it's for",
        body: "Best pitched to growth-seekers and steady-accumulators with a 5+ year horizon who want equity growth without picking a market-cap segment themselves.",
      },
    ],
  },
  {
    slug: "market-update-rate-cycle",
    title: "This week: what the rate cycle means for debt fund conversations",
    category: "Market Update",
    videoMins: 5,
    summary:
      "A short update on where rates stand and how to frame it for clients parked in liquid and money market funds.",
    sections: [
      {
        heading: "Talking points",
        body: "Frame short-duration debt funds as the right home for surplus cash regardless of the rate cycle direction — the pitch is liquidity and stability, not rate speculation.",
      },
    ],
    translations: {
      hi: {
        title: "इस हफ्ते: ब्याज दर चक्र का डेट फंड बातचीत पर असर",
        summary: "मौजूदा ब्याज दरों पर एक संक्षिप्त अपडेट और क्लाइंट्स से इसे कैसे समझाएं।",
      },
    },
  },
  {
    slug: "market-update-smallcap-flows",
    title: "This month: small cap flows and volatility — how to talk about it",
    category: "Market Update",
    videoMins: 6,
    summary:
      "Small cap category has seen elevated inflows recently. Here's how to set expectations with clients holding or considering the small cap fund.",
    sections: [
      {
        heading: "Setting expectations",
        body: "Volatility is the price of entry for small cap upside — reiterate horizon and SIP discipline rather than reacting to short-term flow headlines.",
      },
    ],
  },
  {
    slug: "rapport-building-basics",
    title: "Rapport building in the first 5 minutes of a call",
    category: "Product Training",
    videoMins: 5,
    summary:
      "The opening minutes set the tone for the whole conversation — a short refresher on structuring them well.",
    sections: [
      {
        heading: "Lead with their goal, not the product",
        body: "Ask about what the money is for before mentioning any scheme — it reframes the call as advisory, not sales.",
      },
    ],
    translations: {
      hi: {
        title: "कॉल के पहले 5 मिनट में रिश्ता कैसे बनाएं",
        summary: "बातचीत की शुरुआत ही पूरी कॉल का सुर तय करती है — एक संक्षिप्त रिफ्रेशर।",
      },
    },
  },
];

export function getDistributorLessonBySlug(slug: string) {
  return distributorLessons.find((l) => l.slug === slug);
}
