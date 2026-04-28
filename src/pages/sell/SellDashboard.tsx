import { Link } from 'react-router';
import {
  Sparkles,
  TrendingUp,
  Users,
  Home,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ArrowRight,
  ListChecks,
  ImageIcon,
  Megaphone,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { sellPersona } from '@/stores/personaStore';
import { myListing, incomingOffersForMyHome, sellAlerts } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

const steps = [
  { route: '/sell/intake', label: 'Intake & verification', icon: ListChecks, status: 'done' as const },
  { route: '/sell/valuation', label: 'AI valuation', icon: TrendingUp, status: 'done' as const },
  { route: '/sell/listing', label: 'Listing preview', icon: ImageIcon, status: 'done' as const },
  { route: '/sell/marketing', label: 'Marketing & offers', icon: Megaphone, status: 'current' as const, badge: '2 new' },
  { route: '/sell/timeline', label: 'Closing timeline', icon: Calendar, status: 'upcoming' as const },
];

export default function SellDashboard() {
  const aiMidpoint = Math.round((myListing.aiPriceLow + myListing.aiPriceHigh) / 2);
  const offersCount = incomingOffersForMyHome.length;
  const completedSteps = steps.filter((s) => s.status === 'done').length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto pb-32">
      {/* Hero greeting */}
      <div className="bg-gradient-to-br from-sidebar to-[#1c3540] text-white rounded-3xl p-5 md:p-7 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 mb-2">Your sale</p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">Aloha {sellPersona.firstName} 🌺</h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
            Your home is <span className="font-bold text-white">live and getting attention</span>.
            You have <span className="font-bold text-accent-gold">{offersCount} offers</span> to review.
          </p>

          {/* Listing card snippet */}
          <Link
            to="/sell/listing"
            className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 hover:bg-white/15 transition-colors"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/15 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
              {myListing.photoEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-extrabold text-white truncate">{myListing.address.line1}</p>
              <p className="text-[11px] md:text-xs text-white/60 truncate">{myListing.address.neighborhood} · {myListing.address.city}</p>
              <p className="text-sm md:text-base font-extrabold text-accent-gold mt-0.5">{formatCurrency(myListing.listPrice, { compact: true })}</p>
            </div>
            <ArrowRight size={18} className="text-white/60 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mb-5">
        <Stat label="Estimated value" value={formatCurrency(aiMidpoint, { compact: true })} icon={TrendingUp} accent="primary" />
        <Stat label="Listed" value={`${myListing.daysOnMarket} days`} icon={Calendar} accent="sidebar" />
        <Stat label="Offers" value={String(offersCount)} icon={Users} accent="gold" highlight={offersCount > 0} />
        <Stat label="Views today" value="142" icon={Home} accent="sidebar" />
      </div>

      {/* Today's updates */}
      <section className="mb-5">
        <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" /> Today's updates
        </h2>
        <div className="space-y-2">
          {sellAlerts.map((alert) => {
            const sev =
              alert.severity === 'success' ? { bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, color: 'text-emerald-600' }
              : alert.severity === 'warning' ? { bg: 'bg-amber-50 border-amber-200', icon: Clock, color: 'text-amber-700' }
              : alert.severity === 'danger' ? { bg: 'bg-red-50 border-red-200', icon: AlertCircle, color: 'text-red-600' }
              : { bg: 'bg-blue-50 border-blue-200', icon: Sparkles, color: 'text-blue-600' };
            const Icon = sev.icon;
            const linkTo = alert.title.toLowerCase().includes('offer') ? '/sell/marketing' : '/sell/marketing';
            return (
              <Link
                key={alert.id}
                to={linkTo}
                className={`flex items-start gap-3 p-3 md:p-4 rounded-2xl border ${sev.bg} hover:border-primary/40 transition-colors`}
              >
                <Icon size={18} className={`${sev.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary">{alert.title}</p>
                  <p className="text-xs text-text-secondary leading-snug mt-0.5">{alert.body}</p>
                </div>
                <ArrowRight size={14} className="text-text-muted flex-shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-text-primary">Your journey</h2>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{completedSteps} of {steps.length} done</span>
        </div>
        <div className="space-y-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isDone = step.status === 'done';
            const isCurrent = step.status === 'current';
            return (
              <Link
                key={step.route}
                to={step.route}
                className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border transition-all ${
                  isCurrent ? 'bg-white border-primary shadow-md shadow-primary/10' : 'bg-white border-border hover:border-primary/40'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isDone ? 'bg-emerald-100 text-emerald-600'
                  : isCurrent ? 'bg-primary text-white'
                  : 'bg-bg text-text-muted'
                }`}>
                  {isDone ? <CheckCircle2 size={18} /> : isCurrent ? <Icon size={18} /> : <Circle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base font-extrabold ${isDone ? 'text-text-secondary' : 'text-text-primary'}`}>{step.label}</p>
                  <p className="text-[11px] md:text-xs text-text-muted">
                    {isDone ? 'Completed by AI' : isCurrent ? 'Needs your input' : 'Up next'}
                  </p>
                </div>
                {step.badge && (
                  <span className="bg-warning text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {step.badge}
                  </span>
                )}
                <ArrowRight size={16} className="text-text-muted flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust footer */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">Backed by a licensed partner agent</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Every action AI takes on your behalf is reviewed by Cameron Leopoldino (RB-22451) — a Hawaii-licensed agent
            who signs off on the transaction at a small flat fee instead of 5–6% commission.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  accent,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: typeof TrendingUp;
  accent: 'primary' | 'gold' | 'sidebar';
  highlight?: boolean;
}) {
  const map = {
    primary: 'bg-primary/10 text-primary',
    gold: 'bg-accent-gold/20 text-amber-700',
    sidebar: 'bg-sidebar/10 text-sidebar',
  };
  return (
    <div className={`bg-white rounded-2xl border p-3 md:p-4 ${highlight ? 'border-warning ring-2 ring-warning/20' : 'border-border'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${map[accent]}`}>
        <Icon size={14} />
      </div>
      <p className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">{value}</p>
      <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{label}</p>
    </div>
  );
}
