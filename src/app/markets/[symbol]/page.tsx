import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { PriceChart } from "@/components/markets/PriceChart";
import { RangeBar } from "@/components/markets/RangeBar";
import { StatTile } from "@/components/markets/StatTile";
import { HoldingBanner } from "@/components/markets/HoldingBanner";
import { TradeActions } from "@/components/markets/TradeActions";
import {
  getInstrument,
  getHolding,
  getVolatility,
  generatePriceHistory,
  instruments,
} from "@/lib/marketData";
import { formatPrice, formatChangePercent, formatCrore } from "@/lib/format";

export function generateStaticParams() {
  return instruments.map((i) => ({ symbol: i.symbol }));
}

export default async function InstrumentDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const instrument = getInstrument(symbol);
  if (!instrument) notFound();

  const holding = getHolding(instrument.symbol);
  const change = instrument.currentPrice - instrument.prevClose;
  const changePct = (change / instrument.prevClose) * 100;
  const positive = change >= 0;
  const history = generatePriceHistory(
    instrument.symbol,
    instrument.currentPrice,
    getVolatility(instrument)
  );

  return (
    <div className="mkt-scope relative min-h-dvh bg-mkt-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(0, 55, 159, 0.08)" }}
        />
        <div
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(91, 141, 239, 0.1)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
        <Link
          href="/markets"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-mkt-muted transition-colors hover:text-mkt-text"
        >
          <ArrowLeft size={14} />
          Back to FinBuddy
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-primary-dark"
              style={{ background: instrument.accent }}
            >
              {instrument.monogram}
            </div>
            <div>
              <h1 className="text-xl font-bold text-mkt-text sm:text-2xl">{instrument.name}</h1>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-mkt-muted">
                <span className="font-mono">{instrument.symbol}</span>
                <span aria-hidden>·</span>
                <span>{instrument.category}</span>
                <span aria-hidden>·</span>
                <span className="rounded-full bg-black/[0.04] px-2 py-0.5 uppercase tracking-wide">
                  {instrument.type === "stock" ? "Stock" : "Mutual Fund"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="tabular-nums text-2xl font-extrabold text-mkt-text sm:text-3xl">
              {formatPrice(instrument.currentPrice)}
            </p>
            <span
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                positive ? "bg-mkt-gain-soft text-mkt-gain" : "bg-mkt-loss-soft text-mkt-loss"
              }`}
            >
              {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {formatPrice(Math.abs(change))} ({formatChangePercent(changePct)})
            </span>
          </div>
        </div>

        <div className="mt-6">
          <HoldingBanner instrument={instrument} holding={holding} />
        </div>

        <TradeActions instrument={instrument} holding={holding} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="glass-panel rounded-2xl p-5 sm:p-6">
            <RangeBar
              label="Today's range"
              low={instrument.dayLow}
              high={instrument.dayHigh}
              current={instrument.currentPrice}
            />
          </div>
          <div className="glass-panel rounded-2xl p-5 sm:p-6">
            <RangeBar
              label="52-week range"
              low={instrument.week52Low}
              high={instrument.week52High}
              current={instrument.currentPrice}
            />
          </div>
        </div>

        <div className="mt-6">
          <PriceChart history={history} positive={positive} />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-mkt-text">
            {instrument.type === "stock" ? "Financials & ratios" : "Fund facts"}
          </h3>
          {instrument.type === "stock" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile
                label="Market Cap"
                value={formatCrore(instrument.marketCapCr)}
                hint="Total market value of all outstanding shares."
              />
              <StatTile
                label="P/E Ratio"
                value={instrument.peRatio.toFixed(1)}
                hint="Price-to-Earnings — price paid per rupee of annual profit. Lower can mean cheaper, but compare within the same sector."
              />
              <StatTile
                label="P/B Ratio"
                value={instrument.pbRatio.toFixed(1)}
                hint="Price-to-Book — market price relative to the company's net asset value per share."
              />
              <StatTile
                label="Debt / Equity"
                value={instrument.debtToEquity.toFixed(2)}
                hint="How much debt the company uses relative to shareholder equity. Lower generally means less financial risk."
                tone={instrument.debtToEquity > 1 ? "loss" : "gain"}
              />
              <StatTile
                label="ROE"
                value={`${instrument.roe.toFixed(1)}%`}
                hint="Return on Equity — profit generated per rupee of shareholder capital."
                tone="gain"
              />
              <StatTile
                label="Dividend Yield"
                value={`${instrument.dividendYield.toFixed(2)}%`}
                hint="Annual dividend paid, as a percentage of current share price."
              />
              <StatTile
                label="Beta"
                value={instrument.beta.toFixed(2)}
                hint="Volatility relative to the broader market. Above 1 moves more than the market; below 1 moves less."
                tone={instrument.beta > 1.1 ? "loss" : "neutral"}
              />
              <StatTile label="52W High / Low" value={`${formatPrice(instrument.week52High)}`} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile
                label="AUM"
                value={formatCrore(instrument.aumCr)}
                hint="Assets Under Management — total investor money the fund currently manages."
              />
              <StatTile
                label="Expense Ratio"
                value={`${instrument.expenseRatio.toFixed(2)}%`}
                hint="Annual fee charged by the fund, as a percentage of your investment."
              />
              <StatTile
                label="1Y CAGR"
                value={`${instrument.cagr1y.toFixed(1)}%`}
                tone="gain"
                hint="Annualised return over the last 1 year."
              />
              <StatTile
                label="3Y CAGR"
                value={instrument.cagr3y ? `${instrument.cagr3y.toFixed(1)}%` : "—"}
                tone="gain"
                hint="Annualised return over the last 3 years."
              />
              <StatTile
                label="5Y CAGR"
                value={instrument.cagr5y ? `${instrument.cagr5y.toFixed(1)}%` : "—"}
                tone="gain"
                hint="Annualised return over the last 5 years."
              />
              <StatTile
                label="Risk Level"
                value={instrument.riskLevel}
                tone={
                  instrument.riskLevel === "High" || instrument.riskLevel === "Very High"
                    ? "loss"
                    : "neutral"
                }
              />
              <StatTile label="Exit Load" value={instrument.exitLoad} />
              <StatTile label="Benchmark" value={instrument.benchmark} />
            </div>
          )}
        </div>

        <div className="mt-6 glass-panel rounded-2xl p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-mkt-text">
            About {instrument.type === "stock" ? instrument.name : "this fund"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mkt-muted">{instrument.about}</p>
          {instrument.type === "mutual_fund" && (
            <p className="mt-2 text-xs text-mkt-muted">
              Fund manager: <span className="text-mkt-text">{instrument.fundManager}</span>
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {instrument.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-mkt-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-mkt-muted">
          Data shown is illustrative mock data for this pilot, not live market data or investment
          advice. Bajaj Finserv Asset Management is registered with SEBI; mutual fund
          investments are subject to market risks. Data is handled under the RBI-regulated
          Account Aggregator framework and the DPDP Act, 2023.
        </p>
      </div>
    </div>
  );
}
