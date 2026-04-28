import { Link } from 'react-router';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileSignature,
  Banknote,
  Megaphone,
  Camera,
  Globe,
  Check,
  ArrowRight,
} from 'lucide-react';

interface Step {
  num: number;
  title: string;
  desc: string;
  icon: typeof Sparkles;
}

const sellSteps: Step[] = [
  { num: 1, title: 'Verify your identity & ownership', desc: 'AI confirms you own the property through Plaid + title search.', icon: ShieldCheck },
  { num: 2, title: 'Pull a clean title report', desc: 'Title company partner orders the report in minutes.', icon: FileSignature },
  { num: 3, title: 'AI valuation', desc: 'AI pulls every comp within your area, adjusts for sqft/time/condition, and gives you a defensible price.', icon: TrendingUp },
  { num: 4, title: 'Auto-generate listing', desc: 'AI writes the description, organizes photos, tags features.', icon: Camera },
  { num: 5, title: 'Sign with one tap', desc: 'All disclosures and listing agreements pre-filled and ready to sign.', icon: FileSignature },
  { num: 6, title: 'AI markets your home', desc: 'MLS, Zillow, Realtor.com, social media, and personalized drips to thousands of matched buyers.', icon: Megaphone },
  { num: 7, title: 'Review offers with AI', desc: 'Each offer comes with an AI breakdown — price vs comps, financing strength, recommended response.', icon: Banknote },
  { num: 8, title: 'Close with escrow', desc: 'AI tracks every milestone. You sign closing docs in the app. Funds wired to you.', icon: Check },
];

const buySteps: Step[] = [
  { num: 1, title: 'Get pre-approved', desc: 'AI connects you to a partner lender. Most buyers are approved in 24 hours.', icon: Banknote },
  { num: 2, title: 'Tell AI what you want', desc: 'Beds, baths, neighborhoods, must-haves. AI builds your search.', icon: Sparkles },
  { num: 3, title: 'AI-curated drip', desc: 'New listings that match arrive in your feed daily. No noise.', icon: Megaphone },
  { num: 4, title: 'Tour or virtual walkthrough', desc: 'Schedule in-person or 360° tours through the app.', icon: Camera },
  { num: 5, title: 'Build your offer', desc: 'AI guides price, earnest money, and contingencies based on real-time comps.', icon: FileSignature },
  { num: 6, title: 'Negotiate with AI', desc: 'Counters, escalations, and multi-offer strategy — handled.', icon: TrendingUp },
  { num: 7, title: 'Close & move in', desc: 'Inspection, appraisal, walk-through, closing — all tracked. You get the keys.', icon: Check },
];

export default function HowItWorks() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto pb-24">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-accent-gold/20 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-3">
          How it works
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight mb-2">
          Buy or sell your home — entirely with AI.
        </h1>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          A licensed partner agent reviews and signs off on every transaction for legal liability.
          You save tens of thousands compared to traditional 5–6% commission.
        </p>
      </div>

      {/* Selling */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold">
            S
          </div>
          <h2 className="text-xl font-extrabold text-text-primary">Selling your home</h2>
        </div>
        <div className="space-y-2">
          {sellSteps.map((s) => (
            <StepCard key={s.num} step={s} />
          ))}
        </div>
        <Link
          to="/sell"
          className="mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
        >
          Try the sell flow <ArrowRight size={16} />
        </Link>
      </section>

      {/* Buying */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-gold text-sidebar flex items-center justify-center font-extrabold">
            B
          </div>
          <h2 className="text-xl font-extrabold text-text-primary">Buying a home</h2>
        </div>
        <div className="space-y-2">
          {buySteps.map((s) => (
            <StepCard key={s.num} step={s} />
          ))}
        </div>
        <Link
          to="/buy"
          className="mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sidebar text-accent-gold text-sm font-bold hover:bg-[#1c3540] transition-colors"
        >
          Try the buy flow <ArrowRight size={16} />
        </Link>
      </section>

      {/* Pricing */}
      <section className="mb-8">
        <h2 className="text-xl font-extrabold text-text-primary mb-4">What it costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border-2 border-primary rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">Sellers</p>
            <p className="text-3xl font-extrabold text-text-primary tracking-tight mb-1">1% flat</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Plus a small partner-agent fee (typically $2,000–$5,000) for legal sign-off.
            </p>
            <p className="text-xs text-emerald-700 font-bold">
              On a $985k Anaha condo, you save ~$40,000 vs. a traditional 5% commission.
            </p>
          </div>
          <div className="bg-white border-2 border-accent-gold rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">Buyers</p>
            <p className="text-3xl font-extrabold text-text-primary tracking-tight mb-1">$0</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Sellers cover the partner-agent fee through escrow. You get full representation at no cost.
            </p>
            <p className="text-xs text-emerald-700 font-bold">
              All AI guidance, contract review, and timeline management included.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mb-8">
        <h2 className="text-xl font-extrabold text-text-primary mb-4">Why this is safe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TrustCard
            icon={ShieldCheck}
            title="Licensed partner agent"
            body="Every transaction reviewed and signed off by a Hawaii-licensed real estate agent for legal compliance."
          />
          <TrustCard
            icon={Banknote}
            title="Funds via licensed escrow"
            body="All earnest money and closing funds are held by a licensed escrow company. AI never touches your money."
          />
          <TrustCard
            icon={Sparkles}
            title="Fiduciary safeguards"
            body="AI is constrained by fiduciary duty rules at every step — it always acts in your best interest."
          />
          <TrustCard
            icon={Globe}
            title="Full audit trail"
            body="Every AI decision and human sign-off is recorded. Full transparency from intake to closing."
          />
        </div>
      </section>

      <Link
        to="/"
        className="block text-center text-xs font-bold text-text-secondary hover:text-primary"
      >
        Back to start
      </Link>
    </div>
  );
}

function StepCard({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div className="bg-white rounded-2xl border border-border p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center flex-shrink-0 relative">
        <Icon size={16} className="text-text-secondary" />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center justify-center">
          {step.num}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-text-primary">{step.title}</p>
        <p className="text-xs text-text-secondary leading-snug mt-0.5">{step.desc}</p>
      </div>
    </div>
  );
}

function TrustCard({ icon: Icon, title, body }: { icon: typeof ShieldCheck; title: string; body: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-extrabold text-text-primary">{title}</p>
        <p className="text-xs text-text-secondary leading-snug mt-0.5">{body}</p>
      </div>
    </div>
  );
}
