import { Link } from 'react-router';
import {
  ArrowRight,
  Sparkles,
  Clock,
  Banknote,
  ShieldCheck,
  TrendingUp,
  Home,
  Camera,
  FileSignature,
  Megaphone,
} from 'lucide-react';

const steps = [
  { icon: Home, label: 'Tell us about your home' },
  { icon: ShieldCheck, label: 'Quick identity check' },
  { icon: Camera, label: 'Add photos (or we\'ll arrange a shoot)' },
  { icon: TrendingUp, label: 'See AI valuation with comps' },
  { icon: Banknote, label: 'Set your list price' },
  { icon: FileSignature, label: 'Sign listing agreement' },
  { icon: Megaphone, label: 'AI publishes everywhere' },
];

export default function WelcomePage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto pb-32">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-3xl p-6 md:p-8 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/30 rounded-full blur-3xl translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-accent-gold mb-5">
            <Sparkles size={11} />
            Aloha — let's sell your home
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3">
            From your couch to closing day, we handle it.
          </h1>
          <p className="text-sm md:text-base text-white/75 leading-relaxed">
            Answer a few questions. Your AI agent does pricing, paperwork, marketing, and offer review —
            with a licensed Hawaii agent reviewing every step. No commission. No phone tag. No surprises.
          </p>
        </div>
      </div>

      {/* Three-stat strip */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <Stat label="To list live" value="~24 hr" icon={Clock} />
        <Stat label="Avg savings" value="$40k+" icon={Banknote} />
        <Stat label="Time on market" value="14 days" icon={TrendingUp} />
      </div>

      {/* Big CTA */}
      <Link
        to="/sell/address"
        className="block w-full py-5 rounded-2xl bg-primary text-white text-lg font-extrabold text-center hover:bg-primary-hover transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/40 active:scale-[0.99] mb-5 flex items-center justify-center gap-2"
      >
        Start your sale <ArrowRight size={20} />
      </Link>

      {/* What happens */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-base font-extrabold text-text-primary mb-4">What happens next</h2>
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0 relative">
                  <Icon size={14} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <span className="text-sm text-text-secondary leading-snug">{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Trust */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 mb-5">
        <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">Backed by a licensed Hawaii agent</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Cameron Leopoldino (Lic. RB-22451) reviews and signs off on every step. You always have a real
            licensed agent on your team.
          </p>
        </div>
      </div>

      <Link
        to="/how-it-works"
        className="block text-center text-xs font-bold text-primary hover:text-primary-hover"
      >
        How does this all work? →
      </Link>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Clock }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-3 text-center">
      <Icon size={14} className="text-primary mx-auto mb-1.5" />
      <p className="text-base md:text-lg font-extrabold text-text-primary">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
    </div>
  );
}
