import { Link } from 'react-router';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Banknote,
  ShieldCheck,
  Eye,
  Heart,
  Mail,
  Globe,
} from 'lucide-react';
import { myListing, incomingOffersForMyHome } from '@/data/mockData';
import { formatCurrency, formatDate, relativeDate } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';

export default function MarketingPage() {
  const { toast } = useToast();
  const aiMidpoint = Math.round((myListing.aiPriceLow + myListing.aiPriceHigh) / 2);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Marketing & offers</h1>
        <p className="text-sm text-text-secondary">Where your home is being shown — and what's coming back</p>
      </div>

      {/* Offers — most important */}
      <section className="mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-extrabold text-text-primary flex items-center gap-2">
            <Banknote size={16} className="text-primary" /> Offers received
          </h2>
          <span className="text-[11px] font-bold uppercase tracking-wider text-warning bg-warning/10 px-2 py-0.5 rounded-full">
            {incomingOffersForMyHome.length} new
          </span>
        </div>

        <div className="space-y-3">
          {incomingOffersForMyHome.map((offer) => {
            const vsMidpoint = offer.offerPrice - aiMidpoint;
            const isCash = !offer.contingencies.includes('financing');
            return (
              <div key={offer.id} className="bg-white rounded-2xl border border-border overflow-hidden">
                {/* Top: offer + buyer */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">{offer.buyerLabel}</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
                        {formatCurrency(offer.offerPrice, { compact: true })}
                      </p>
                      <p className={`text-xs font-bold mt-0.5 ${vsMidpoint >= 0 ? 'text-emerald-600' : 'text-amber-700'}`}>
                        {vsMidpoint >= 0 ? '+' : '−'}{formatCurrency(Math.abs(vsMidpoint), { compact: true })} vs AI midpoint
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {isCash && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Banknote size={11} /> Cash
                        </span>
                      )}
                      {offer.preApproved && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                          Pre-approved
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-xs">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Earnest</p>
                      <p className="font-bold text-text-primary mt-0.5">{formatCurrency(offer.earnestMoney, { compact: true })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Close</p>
                      <p className="font-bold text-text-primary mt-0.5">{relativeDate(offer.closeDate)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Received</p>
                      <p className="font-bold text-text-primary mt-0.5">{formatDate(offer.receivedDate, { short: true })}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Contingencies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(['inspection', 'financing', 'appraisal'] as const).map((c) => {
                        const has = offer.contingencies.includes(c);
                        return (
                          <span
                            key={c}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider capitalize ${
                              has ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {has ? c : `No ${c}`}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* AI analysis */}
                <div className="bg-primary/5 border-t border-primary/20 p-4 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={13} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">AI analysis</p>
                    <p className="text-xs text-text-primary leading-relaxed">{offer.aiAnalysis}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-3 grid grid-cols-3 gap-2 border-t border-border">
                  <button
                    onClick={() => toast(`Offer from ${offer.buyerLabel} accepted. Opening escrow.`, 'success')}
                    className="py-2.5 px-2 rounded-lg bg-primary text-white text-xs md:text-sm font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 size={14} /> Accept
                  </button>
                  <button
                    onClick={() => toast('AI drafting counter-offer at $988k...', 'info')}
                    className="py-2.5 px-2 rounded-lg bg-bg border border-border text-xs md:text-sm font-bold text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
                  >
                    <RefreshCw size={14} /> Counter
                  </button>
                  <button
                    onClick={() => toast('Offer politely declined. AI sent rejection notice.', 'info')}
                    className="py-2.5 px-2 rounded-lg bg-bg border border-border text-xs md:text-sm font-bold text-text-secondary hover:border-red-300 hover:text-red-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle size={14} /> Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Marketing channels */}
      <section className="mb-6">
        <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
          <Globe size={16} className="text-primary" /> Where your home is listed
        </h2>
        <div className="bg-white rounded-2xl border border-border divide-y divide-border">
          {myListing.marketingChannels.map((ch) => (
            <div key={ch} className="flex items-center justify-between p-3 md:p-4">
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-bold text-text-primary truncate">{ch}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex-shrink-0">Live</span>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement */}
      <section className="mb-6">
        <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" /> Buyer interest
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <EngagementCard icon={Eye} label="Views" value="1,847" delta="+142 today" />
          <EngagementCard icon={Heart} label="Saves" value="284" delta="+38 today" />
          <EngagementCard icon={Mail} label="Drips" value="3,247" delta="18% open" />
        </div>
      </section>

      {/* Trust */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 mb-4">
        <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">All offers reviewed by your partner agent</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Cameron Leopoldino (Lic. RB-22451) reviews each offer for fiduciary alignment. AI handles the heavy lifting; your licensed agent ensures every step is protected.
          </p>
        </div>
      </div>

      <Link
        to="/sell/timeline"
        className="block bg-white border border-border rounded-2xl p-5 hover:border-primary transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Next</p>
            <p className="text-base md:text-lg font-extrabold text-text-primary">See your closing timeline</p>
          </div>
          <ArrowRight size={20} className="text-primary" />
        </div>
      </Link>
    </div>
  );
}

function EngagementCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-3 md:p-4">
      <Icon size={16} className="text-primary mb-2" />
      <p className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-0.5">{label}</p>
      <p className="text-[10px] text-emerald-600 font-bold mt-1">{delta}</p>
    </div>
  );
}
