import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
                BF
              </span>
              <span className="text-sm font-bold text-primary-dark">
                Bajaj Finserv AMC
              </span>
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-gray-500">
              Hackathon prototype built for ATOM Season 9, PS5 — a
              distributor-led AMC transforming into a FinAI-driven,
              customer-centric organization. Not a real product; no real
              money moves here.
            </p>
          </div>
          <div className="flex gap-8 text-xs text-gray-500">
            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-gray-700">Investors</span>
              <Link href="/invest" className="hover:text-primary">
                Start Investing
              </Link>
              <Link href="/explore" className="hover:text-primary">
                Explore Schemes
              </Link>
              <Link href="/news" className="hover:text-primary">
                News Tracker
              </Link>
              <Link href="/learn" className="hover:text-primary">
                Bajaj Finserv Learn
              </Link>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-gray-700">Distributors</span>
              <Link href="/distributor" className="hover:text-primary">
                Cockpit
              </Link>
              <Link href="/distributor/acquisition" className="hover:text-primary">
                Acquisition
              </Link>
              <Link href="/distributor/retention" className="hover:text-primary">
                Retention
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-black/5 bg-surface p-3.5">
          <p className="text-[11px] font-semibold leading-relaxed text-gray-600">
            Mutual Fund investments are subject to market risks, read all
            scheme related documents carefully.
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400">
            AI-assisted content on this platform (fund shortlists, FinAsk
            responses, persona explanations) is descriptive and analytical
            only — it does not constitute investment advice, and is not a
            recommendation to buy, hold, or redeem any scheme. Please
            consult your financial advisor and read the Scheme Information
            Document / Key Information Memorandum before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}
