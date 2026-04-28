import { Link } from 'react-router';
import { CheckCircle2, ArrowRight, Sparkles, Megaphone, Users, Eye } from 'lucide-react';
import { myListing } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

const channels = ['Hawaii MLS', 'Zillow', 'Realtor.com', 'Trulia', 'Instagram', 'Facebook', 'IntelleQ buyer network'];

export default function LivePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg pb-24">
      {/* Confetti hero */}
      <div className="bg-gradient-to-br from-primary via-primary to-sidebar text-white p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-gold/20 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-16 -translate-x-16" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="text-7xl md:text-8xl mb-4 animate-fade-in">🎉</div>
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent-gold mb-3">
            Your home is live
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
            Welcome to the market!
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-md mx-auto">
            Your listing just went live everywhere. AI is already running drips to matched buyers.
            I'll text you when offers come in.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6 max-w-2xl mx-auto w-full">
        {/* Listing card */}
        <div className="bg-white rounded-3xl border-2 border-primary p-5 mb-5 shadow-xl shadow-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Live · 0 min ago</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-4xl flex-shrink-0">
              {myListing.photoEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base md:text-lg font-extrabold text-text-primary">{myListing.address.line1}</p>
              <p className="text-xs text-text-muted mb-1">{myListing.address.neighborhood} · {myListing.address.city}</p>
              <p className="text-2xl font-extrabold text-primary tracking-tight">{formatCurrency(myListing.listPrice, { compact: true })}</p>
            </div>
          </div>
        </div>

        {/* Live everywhere */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={16} className="text-primary" />
            <p className="text-sm font-extrabold text-text-primary">Live on {channels.length} platforms</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {channels.map((ch) => (
              <span
                key={ch}
                className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1"
              >
                <CheckCircle2 size={10} />
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Live activity */}
        <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-2xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent-gold/15 rounded-full blur-3xl -translate-y-12 translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-accent-gold" />
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">First minutes activity</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Drips sent" value="3,247" icon={Users} />
              <Stat label="Views" value="14" icon={Eye} />
              <Stat label="Saves" value="2" icon={CheckCircle2} />
            </div>
          </div>
        </div>

        {/* Next */}
        <div className="space-y-2 mb-5">
          <Link
            to="/sell/marketing"
            className="block bg-primary text-white rounded-2xl p-4 hover:bg-primary-hover transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Live updates</p>
                <p className="text-base font-extrabold">Marketing dashboard</p>
                <p className="text-[11px] text-white/60">Track views, saves, and offers as they come in</p>
              </div>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link
            to="/sell/timeline"
            className="block bg-white border border-border rounded-2xl p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Once you have an offer</p>
                <p className="text-base font-extrabold text-text-primary">Closing timeline</p>
                <p className="text-[11px] text-text-muted">Every step from offer accepted to keys handed over</p>
              </div>
              <ArrowRight size={20} className="text-text-secondary" />
            </div>
          </Link>
        </div>

        <Link
          to="/"
          className="block text-center text-xs font-bold text-text-muted hover:text-primary"
        >
          Back to start
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
      <Icon size={14} className="text-accent-gold mb-1" />
      <p className="text-xl font-extrabold tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</p>
    </div>
  );
}
