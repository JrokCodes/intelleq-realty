import { Link } from 'react-router';
import {
  Sparkles,
  CheckCircle2,
  Search,
  Banknote,
  ArrowRight,
  Clock,
  AlertCircle,
  Heart,
  TrendingUp,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { buyPersona } from '@/stores/personaStore';
import { listings, me, buyAlerts, alexOutgoingOffer } from '@/data/mockData';
import { formatCurrency, relativeDate } from '@/lib/format';

export default function BuyDashboard() {
  const savedListings = listings.filter((l) => me.savedListingIds.includes(l.id));
  const offerListing = listings.find((l) => l.id === alexOutgoingOffer.listingId);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto pb-32">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-3xl p-5 md:p-7 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 mb-2">Your search</p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">Aloha {buyPersona.firstName} 🏝️</h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
            You're <span className="font-bold text-white">pre-approved up to {formatCurrency(buyPersona.maxPrice, { compact: true })}</span> and your offer
            on Mililani is in. <span className="font-bold text-accent-gold">3 new homes</span> match your criteria today.
          </p>

          {/* Active offer card */}
          {offerListing && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3">
              <div className="flex items-start gap-3 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-accent-gold text-sidebar text-[10px] font-bold uppercase tracking-wider">
                  Your active offer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl flex-shrink-0">
                  {offerListing.photoEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-white truncate">{offerListing.address.line1}</p>
                  <p className="text-[11px] text-white/60 truncate">{offerListing.address.neighborhood} · Offered {formatCurrency(alexOutgoingOffer.offerPrice, { compact: true })}</p>
                </div>
                <Link to="/buy/timeline" className="text-[11px] font-bold text-accent-gold whitespace-nowrap flex items-center gap-1">
                  View <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pre-approval card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Banknote size={18} className="text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-emerald-900">Pre-approved up to {formatCurrency(me.preApproval.maxPrice || 0, { compact: true })}</p>
          <p className="text-[11px] text-emerald-800">
            {me.preApproval.lender} · expires {relativeDate(me.preApproval.expires!)}
          </p>
        </div>
        <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
      </div>

      {/* Today's updates */}
      <section className="mb-5">
        <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" /> Today's updates
        </h2>
        <div className="space-y-2">
          {buyAlerts.map((alert) => {
            const sev =
              alert.severity === 'success' ? { bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, color: 'text-emerald-600' }
              : alert.severity === 'warning' ? { bg: 'bg-amber-50 border-amber-200', icon: Clock, color: 'text-amber-700' }
              : alert.severity === 'danger' ? { bg: 'bg-red-50 border-red-200', icon: AlertCircle, color: 'text-red-600' }
              : { bg: 'bg-blue-50 border-blue-200', icon: Sparkles, color: 'text-blue-600' };
            const Icon = sev.icon;
            const linkTo = alert.title.toLowerCase().includes('match') ? '/buy/feed' : '/buy/timeline';
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

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mb-5">
        <Stat label="Saved homes" value={String(me.savedListingIds.length)} icon={Heart} />
        <Stat label="Active offer" value="1" icon={Banknote} highlight />
        <Stat label="Days searching" value="19" icon={Calendar} />
        <Stat label="Match score" value="91%" icon={TrendingUp} />
      </div>

      {/* Saved listings preview */}
      {savedListings.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-text-primary flex items-center gap-2">
              <Heart size={16} className="text-primary" /> Your saved homes
            </h2>
            <Link to="/buy/feed" className="text-xs font-bold text-primary flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {savedListings.slice(0, 3).map((l) => (
              <Link
                key={l.id}
                to={`/buy/listings/${l.id}`}
                className="flex items-center gap-3 bg-white border border-border rounded-2xl p-3 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sidebar/85 to-primary/40 flex items-center justify-center text-2xl flex-shrink-0">
                  {l.photoEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-text-primary truncate">{formatCurrency(l.listPrice, { compact: true })}</p>
                  <p className="text-xs text-text-muted truncate">{l.address.line1}</p>
                  <p className="text-[10px] text-text-muted">{l.beds}BR · {l.baths}BA · {l.sqft.toLocaleString()} sqft</p>
                </div>
                <ArrowRight size={14} className="text-text-muted flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link
        to="/buy/feed"
        className="block bg-primary text-white rounded-2xl p-5 hover:bg-primary-hover transition-colors mb-4"
      >
        <div className="flex items-center gap-3">
          <Search size={22} />
          <div className="flex-1 min-w-0">
            <p className="text-base md:text-lg font-extrabold">Browse AI-curated homes</p>
            <p className="text-[11px] md:text-xs text-white/70">3 new picks today, plus {savedListings.length} saved</p>
          </div>
          <ArrowRight size={18} />
        </div>
      </Link>

      {/* Trust footer */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">Buyers pay $0 with IntelleQ</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Sellers cover the small partner-agent fee through escrow. You get full agent representation, AI guidance,
            and contract review at no cost.
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
  highlight = false,
}: {
  label: string;
  value: string;
  icon: typeof Heart;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl border p-3 md:p-4 ${highlight ? 'border-warning ring-2 ring-warning/20' : 'border-border'}`}>
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
        <Icon size={14} />
      </div>
      <p className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">{value}</p>
      <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{label}</p>
    </div>
  );
}
