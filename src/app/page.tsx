import Link from "next/link";
import { ArrowRight, Building2, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const DISTRIBUTOR_STEPS = [
  { title: "Acquire", body: "Enter a prospect's profile, get AI-generated talking points and objection handling." },
  { title: "Retain", body: "A suggested contact priority order for your existing client book — never a mandatory task list." },
  { title: "Learn", body: "Short lessons on market updates and product training, in English or Hindi." },
];

const INVESTOR_STEPS = [
  { title: "Choose your path", body: "Link to your distributor's code, or invest fully independently." },
  { title: "Explore & invest", body: "Compare Direct vs Regular plans, take a suitability quiz, and invest with clarity." },
  { title: "Get help on demand", body: "A descriptive AI assistant and, if linked, a relationship manager a video call away." },
];

export default function GatewayPage() {
  return (
    <div className="flex flex-col">
      <section className="dot-surface bg-surface-muted px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="gold">Bajaj FinOS</Badge>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-primary-dark sm:text-5xl">
            One platform. Two doors.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 sm:text-base">
            Built for distributors to acquire and retain clients, and for investors to invest with full
            transparency — self-served or with a distributor at their side.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Link href="/distributor">
            <Card className="group h-full p-6 transition-shadow hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <Building2 size={20} />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-primary-dark">Distributor Cockpit</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                Acquisition, retention, and learning — one workspace for your whole book.
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-primary">
                Open cockpit
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </p>
            </Card>
          </Link>
          <Link href="/invest">
            <Card className="group h-full p-6 transition-shadow hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary-dark">
                <Sparkles size={20} />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-primary-dark">Start Investing</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                Invest independently, or link your distributor code for a guided experience.
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-primary">
                Start investing
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </p>
            </Card>
          </Link>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">For distributors</h3>
              </div>
              <div className="mt-4 space-y-4">
                {DISTRIBUTOR_STEPS.map((s, i) => (
                  <div key={s.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-[11px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-primary-dark">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">For investors</h3>
              </div>
              <div className="mt-4 space-y-4">
                {INVESTOR_STEPS.map((s, i) => (
                  <div key={s.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-[11px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-primary-dark">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="gold">Why Bajaj</Badge>
          <h3 className="mt-3 text-xl font-extrabold sm:text-2xl">
            We don&rsquo;t just distribute funds. We manufacture them.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            Zerodha and Groww are execution-only platforms — they have no stake in a fund&rsquo;s future.
            Bajaj Finserv AMC owns the roadmap, which means distributors and investors on this platform
            get a credible line into what&rsquo;s coming next.
          </p>
        </div>
      </section>
    </div>
  );
}
