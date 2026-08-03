export type PersonaId =
  | "growth-seeker"
  | "steady-accumulator"
  | "capital-preserver"
  | "income-focused";

export interface Persona {
  id: PersonaId;
  name: string;
  tagline: string;
  description: string;
}

export const personas: Record<PersonaId, Persona> = {
  "growth-seeker": {
    id: "growth-seeker",
    name: "Growth Seeker",
    tagline: "Long horizon, high risk appetite, wealth creation focus",
    description:
      "You're investing for a distant goal and comfortable riding out short-term volatility for higher long-term returns. Your answers leaned toward long time horizons, prior equity experience, and holding (or buying more) through a drawdown.",
  },
  "steady-accumulator": {
    id: "steady-accumulator",
    name: "Steady Accumulator",
    tagline: "Building wealth steadily, moderate-high risk, balanced approach",
    description:
      "You want equity-driven growth but with some ballast against big swings. Your answers pointed to a multi-year horizon, some investing experience, and a preference to hold steady rather than react sharply to drawdowns.",
  },
  "capital-preserver": {
    id: "capital-preserver",
    name: "Capital Preserver",
    tagline: "Safety first, short horizon, low risk tolerance",
    description:
      "Protecting what you've already saved matters more to you than chasing extra return. Your answers showed a shorter time horizon, limited market experience, and a low tolerance for seeing your investment value drop.",
  },
  "income-focused": {
    id: "income-focused",
    name: "Income Focused",
    tagline: "Regular payouts, moderate risk, near/at a life-stage need",
    description:
      "You're prioritizing steady, regular income over aggressive growth — often a sign of an approaching goal or life stage that needs predictable cash flow. Your answers pointed to a medium time horizon and a moderate reaction to volatility.",
  },
};

export interface QuizOption {
  id: string;
  label: string;
  scores: Partial<Record<PersonaId, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  helpText?: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    question: "What's your primary investment goal?",
    options: [
      {
        id: "wealth",
        label: "Long-term wealth creation",
        scores: { "growth-seeker": 3, "steady-accumulator": 1 },
      },
      {
        id: "retirement",
        label: "Building a retirement corpus",
        scores: { "steady-accumulator": 3, "growth-seeker": 1 },
      },
      {
        id: "safety",
        label: "Preserving what I've already saved",
        scores: { "capital-preserver": 3 },
      },
      {
        id: "income",
        label: "Generating regular income",
        scores: { "income-focused": 3 },
      },
    ],
  },
  {
    id: "horizon",
    question: "What's your investment time horizon?",
    options: [
      {
        id: "lt1",
        label: "Less than 1 year",
        scores: { "capital-preserver": 3 },
      },
      {
        id: "1to3",
        label: "1 to 3 years",
        scores: { "income-focused": 2, "capital-preserver": 1 },
      },
      {
        id: "3to7",
        label: "3 to 7 years",
        scores: { "steady-accumulator": 3, "income-focused": 1 },
      },
      {
        id: "7plus",
        label: "7+ years",
        scores: { "growth-seeker": 3, "steady-accumulator": 1 },
      },
    ],
  },
  {
    id: "income-band",
    question: "What's your approximate annual income band?",
    helpText: "Helps us understand your capacity to absorb short-term volatility — not used to rank you.",
    options: [
      {
        id: "b1",
        label: "Under ₹5 lakh",
        scores: { "capital-preserver": 1 },
      },
      {
        id: "b2",
        label: "₹5 - 15 lakh",
        scores: { "income-focused": 1, "steady-accumulator": 1 },
      },
      {
        id: "b3",
        label: "₹15 - 40 lakh",
        scores: { "steady-accumulator": 1, "growth-seeker": 1 },
      },
      {
        id: "b4",
        label: "₹40 lakh+",
        scores: { "growth-seeker": 2 },
      },
    ],
  },
  {
    id: "life-stage",
    question: "Which best describes your current life stage?",
    options: [
      {
        id: "early",
        label: "Early career / just starting out",
        scores: { "growth-seeker": 2 },
      },
      {
        id: "mid",
        label: "Mid-career, actively building wealth",
        scores: { "steady-accumulator": 2 },
      },
      {
        id: "pre-retire",
        label: "Pre-retirement, income needs approaching",
        scores: { "income-focused": 2 },
      },
      {
        id: "retired",
        label: "Retired / capital protection is the priority",
        scores: { "capital-preserver": 2 },
      },
    ],
  },
  {
    id: "experience",
    question: "How would you describe your past investing experience?",
    options: [
      {
        id: "none",
        label: "None — this would be my first market investment",
        scores: { "capital-preserver": 2 },
      },
      {
        id: "some-mf",
        label: "Some experience with mutual funds",
        scores: { "steady-accumulator": 2 },
      },
      {
        id: "active-equity",
        label: "Active equity / direct stock investor",
        scores: { "growth-seeker": 2 },
      },
      {
        id: "fd-only",
        label: "Mostly fixed deposits / recurring deposits",
        scores: { "income-focused": 1, "capital-preserver": 1 },
      },
    ],
  },
  {
    id: "drawdown",
    question:
      "Your portfolio drops 15% in a month due to market conditions. What do you do?",
    helpText: "There's no wrong answer — this tells us how much volatility you can comfortably sit through.",
    options: [
      {
        id: "sell-all",
        label: "Sell everything to stop further loss",
        scores: { "capital-preserver": 3 },
      },
      {
        id: "sell-some",
        label: "Sell a portion to reduce exposure",
        scores: { "income-focused": 2, "capital-preserver": 1 },
      },
      {
        id: "hold",
        label: "Hold and wait it out",
        scores: { "steady-accumulator": 3 },
      },
      {
        id: "buy-more",
        label: "Invest more while prices are lower",
        scores: { "growth-seeker": 3 },
      },
    ],
  },
];

export function derivePersona(
  answers: Record<string, string>
): { personaId: PersonaId; scores: Record<PersonaId, number> } {
  const scores: Record<PersonaId, number> = {
    "growth-seeker": 0,
    "steady-accumulator": 0,
    "capital-preserver": 0,
    "income-focused": 0,
  };

  for (const question of quizQuestions) {
    const chosenId = answers[question.id];
    if (!chosenId) continue;
    const option = question.options.find((o) => o.id === chosenId);
    if (!option) continue;
    for (const [personaId, pts] of Object.entries(option.scores)) {
      scores[personaId as PersonaId] += pts ?? 0;
    }
  }

  let winner: PersonaId = "steady-accumulator";
  let best = -Infinity;
  (Object.keys(scores) as PersonaId[]).forEach((id) => {
    if (scores[id] > best) {
      best = scores[id];
      winner = id;
    }
  });

  return { personaId: winner, scores };
}
