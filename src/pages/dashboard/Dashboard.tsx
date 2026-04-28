import { Link } from 'react-router';
import {
  Briefcase,
  DollarSign,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  MapPin,
  Plus,
  UserPlus,
  FileText,
} from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import KPI from '@/components/shared/KPI';
import { deals, listings, alerts } from '@/data/mockData';
import { useAuthStore } from '@/stores/authStore';
import { formatCurrency } from '@/lib/format';

export default function Dashboard() {
  const { user } = useAuthStore();

  const activeDeals = deals.length;
  const pipelineValue = deals.reduce((sum, d) => sum + d.price, 0);
  const sellListings = listings.filter((l) => l.status === 'active' || l.status === 'pending');
  const avgDom = Math.round(
    sellListings.reduce((sum, l) => sum + l.daysOnMarket, 0) / Math.max(sellListings.length, 1),
  );
  const totalCommission = deals.reduce((sum, d) => sum + d.commissionEst, 0);

  const stageData = [
    { stage: 'Lead', count: deals.filter((d) => d.stage === 'lead').length },
    { stage: 'CMA', count: deals.filter((d) => d.stage === 'cma' || d.stage === 'verified').length },
    { stage: 'Listed', count: deals.filter((d) => d.stage === 'listed' || d.stage === 'searching' || d.stage === 'rep_signed').length },
    { stage: 'Offer', count: deals.filter((d) => d.stage === 'offer').length },
    { stage: 'Contract', count: deals.filter((d) => d.stage === 'under_contract').length },
    { stage: 'Closing', count: deals.filter((d) => d.stage === 'closing').length },
  ];

  const hotListings = listings.filter((l) => l.status === 'active' || l.status === 'pre_market').slice(0, 4);
  const recentAlerts = alerts.slice(0, 4);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Hero greeting */}
      <div className="bg-gradient-to-br from-sidebar to-[#1c3540] text-white rounded-2xl p-5 md:p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-y-12 -translate-x-12" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-gold flex items-center justify-center text-sidebar text-base font-extrabold flex-shrink-0">
            {user?.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 mb-1">Sunday morning</p>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">Aloha, {user?.firstName} ☀️</h1>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              <span className="font-bold text-white">2 deals</span> need attention today,
              {' '}<span className="font-bold text-accent-gold">1 new comp alert</span>,
              {' '}and <span className="font-bold text-white">3 buyer drips</span> running.
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <KPI label="Active deals" value={String(activeDeals)} icon={Briefcase} delta={{ value: '+1 this week', positive: true }} accent="primary" />
        <KPI label="Pipeline value" value={formatCurrency(pipelineValue, { compact: true })} icon={DollarSign} delta={{ value: '+8.4%', positive: true }} accent="gold" />
        <KPI label="Est. commission" value={formatCurrency(totalCommission, { compact: true })} icon={Sparkles} accent="primary" />
        <KPI label="Avg DOM" value={String(avgDom)} icon={Calendar} delta={{ value: '-3 days', positive: true }} accent="sidebar" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Today's alerts */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-text-primary">Today's alerts</h2>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{alerts.filter(a => a.unread).length} new</span>
          </div>
          <div className="space-y-2">
            {recentAlerts.map((alert) => {
              const sev =
                alert.severity === 'danger' ? { bg: 'bg-red-50 border-red-200', icon: AlertCircle, color: 'text-red-600' }
                : alert.severity === 'warning' ? { bg: 'bg-amber-50 border-amber-200', icon: Clock, color: 'text-amber-700' }
                : alert.severity === 'success' ? { bg: 'bg-emerald-50 border-emerald-200', icon: Sparkles, color: 'text-emerald-600' }
                : { bg: 'bg-blue-50 border-blue-200', icon: Sparkles, color: 'text-blue-600' };
              const Icon = sev.icon;
              const linkTo = alert.dealId ? `/deals/${alert.dealId}` : alert.listingId ? `/listings/${alert.listingId}` : alert.buyerId ? `/buyers/${alert.buyerId}` : '#';
              return (
                <Link
                  key={alert.id}
                  to={linkTo}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${sev.bg} hover:border-primary/40 transition-colors`}
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
        </div>

        {/* Pipeline by stage */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-base font-extrabold text-text-primary mb-4">Pipeline by stage</h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}
                  cursor={{ fill: '#F1F5F9' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {stageData.map((_, i) => (
                    <Cell key={i} fill={i === 4 ? '#E9C46A' : '#2A9D8F'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Link
            to="/pipeline"
            className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-primary hover:text-primary-hover"
          >
            View pipeline <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Hot listings */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-text-primary">Hot listings</h2>
          <Link to="/listings" className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1">
            All listings <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hotListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listings/${listing.id}`}
              className="group block bg-bg rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-sidebar/85 to-primary/40 flex items-center justify-center text-5xl">
                {listing.photoEmoji}
              </div>
              <div className="p-3">
                <p className="text-sm font-extrabold text-text-primary truncate">{formatCurrency(listing.listPrice, { compact: true })}</p>
                <p className="text-[11px] text-text-muted truncate">{listing.address.neighborhood}</p>
                <p className="text-[10px] text-text-muted/70 mt-0.5">{listing.beds}BR · {listing.baths}BA · {listing.sqft.toLocaleString()} sqft</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <QuickAction to="/listings" icon={Plus} label="New CMA" desc="Pull comps and price a listing" />
        <QuickAction to="/buyers" icon={UserPlus} label="Add buyer" desc="Capture a new buyer lead" />
        <QuickAction to="/tools" icon={FileText} label="New listing intake" desc="Seller verification + intake form" />
      </div>

      {/* Story footer */}
      <div className="mt-6 bg-gradient-to-r from-primary/10 via-accent-gold/10 to-primary/10 border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center flex-shrink-0">
          <MapPin size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-text-primary mb-1">This is Phase 1 — the assistant.</p>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Phase 2 takes over the full transaction (verification, title, escrow, e-sign).
            Phase 3 is the consumer-facing app — buyers and sellers transacting end-to-end with AI.
          </p>
          <Link to="/roadmap" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover">
            See the roadmap <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, desc }: { to: string; icon: typeof Plus; label: string; desc: string }) {
  return (
    <Link
      to={to}
      className="group bg-white border border-border rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-colors flex-shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-primary">{label}</p>
        <p className="text-xs text-text-muted truncate">{desc}</p>
      </div>
      <ArrowRight size={14} className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
    </Link>
  );
}
