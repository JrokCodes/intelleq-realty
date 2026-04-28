import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  Send,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Banknote,
  ArrowRight,
} from 'lucide-react';
import { listings, me, compsByListing } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';

export default function BuyOfferBuilder() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const listing = listings.find((l) => l.id === id);

  const initialOffer = listing ? Math.round((listing.listPrice * 0.97) / 1000) * 1000 : 0;
  const [offerPrice, setOfferPrice] = useState(initialOffer);
  const [earnestMoney, setEarnestMoney] = useState(listing ? Math.round((listing.listPrice * 0.025) / 1000) * 1000 : 0);
  const [closeDate, setCloseDate] = useState('2026-06-30');
  const [contingencies, setContingencies] = useState({
    inspection: true,
    financing: true,
    appraisal: true,
  });

  if (!listing) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Home not found.</p>
        <Link to="/buy/feed" className="text-primary text-sm font-bold">← Back to homes</Link>
      </div>
    );
  }

  const comps = compsByListing[listing.id] || [];
  const recommendedLow = listing.aiPriceLow;
  const recommendedHigh = listing.aiPriceHigh;
  const positionPct = (offerPrice - recommendedLow) / Math.max(recommendedHigh - recommendedLow, 1);
  const position = positionPct < 0.33 ? 'below' : positionPct < 0.67 ? 'at' : 'above';
  const positionStyles =
    position === 'below'
      ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: TrendingDown, label: 'Below median', tone: 'Lower-risk for you. Acceptance probability: ~45%.' }
      : position === 'at'
      ? { bg: 'bg-blue-50 border-blue-200 text-blue-700', icon: Minus, label: 'At median', tone: 'Aligned with comps. Acceptance probability: ~75%.' }
      : { bg: 'bg-amber-50 border-amber-200 text-amber-800', icon: TrendingUp, label: 'Above median', tone: 'Strong offer — useful in multi-offer scenarios. Acceptance probability: ~90%.' };
  const PosIcon = positionStyles.icon;

  const overBudget = offerPrice > (me.preApproval.maxPrice || 0);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Make an offer</h1>
        <p className="text-sm text-text-secondary">AI guides you through each decision</p>
      </div>

      {/* Listing strip */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-4 flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-3xl flex-shrink-0">
          {listing.photoEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-text-primary truncate">{listing.address.line1}</p>
          <p className="text-[11px] text-text-muted truncate">{listing.address.neighborhood}</p>
          <p className="text-sm font-extrabold text-text-primary mt-0.5">List {formatCurrency(listing.listPrice, { compact: true })}</p>
        </div>
      </div>

      {/* AI position card */}
      <div className={`rounded-2xl border-2 ${positionStyles.bg} p-5 mb-4`}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
              <PosIcon size={16} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider">{positionStyles.label}</span>
          </div>
          <span className="text-xs font-bold opacity-70">vs comps</span>
        </div>
        <p className="text-sm leading-relaxed mb-2">{positionStyles.tone}</p>
        <p className="text-xs opacity-90 leading-relaxed">
          AI recommended range: <strong>{formatCurrency(recommendedLow, { compact: true })}–{formatCurrency(recommendedHigh, { compact: true })}</strong>.
        </p>
      </div>

      {/* Comps anchor */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Anchor comps nearby</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {comps.slice(0, 5).map((comp) => (
            <div key={comp.id} className="flex-shrink-0 w-32 bg-bg rounded-xl p-3 border border-border">
              <div className="text-2xl mb-1">{comp.photoEmoji}</div>
              <p className="text-xs font-bold text-text-primary truncate">{formatCurrency(comp.soldPrice, { compact: true })}</p>
              <p className="text-[10px] text-text-muted">{formatDate(comp.soldDate, { short: true })}</p>
              <p className="text-[10px] text-text-muted">{comp.distanceMi.toFixed(1)}mi</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer fields */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-base font-extrabold text-text-primary mb-4">Your offer</h2>

        <div className="space-y-4">
          <Field label="Offer price">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(parseInt(e.target.value || '0'))}
                className="w-full pl-9 pr-4 py-3 border border-border rounded-xl text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            {overBudget && (
              <p className="text-xs text-red-600 mt-1 font-bold">⚠ Over your pre-approval max of {formatCurrency(me.preApproval.maxPrice || 0, { compact: true })}</p>
            )}
          </Field>

          <Field label="Earnest money">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
              <input
                type="number"
                value={earnestMoney}
                onChange={(e) => setEarnestMoney(parseInt(e.target.value || '0'))}
                className="w-full pl-9 pr-4 py-3 border border-border rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <p className="text-[11px] text-text-muted mt-1">
              {((earnestMoney / Math.max(offerPrice, 1)) * 100).toFixed(1)}% of offer · escrow holds this until close
            </p>
          </Field>

          <Field label="Close date">
            <input
              type="date"
              value={closeDate}
              onChange={(e) => setCloseDate(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </Field>

          <Field label="Contingencies">
            <p className="text-[11px] text-text-muted mb-2">Conditions that protect your offer</p>
            <div className="space-y-2">
              {(['inspection', 'financing', 'appraisal'] as const).map((c) => (
                <label key={c} className="flex items-start gap-3 px-3 py-2.5 border border-border rounded-xl cursor-pointer hover:bg-bg">
                  <input
                    type="checkbox"
                    checked={contingencies[c]}
                    onChange={(e) => setContingencies((prev) => ({ ...prev, [c]: e.target.checked }))}
                    className="w-4 h-4 accent-primary mt-0.5"
                  />
                  <span className="text-sm font-medium text-text-primary capitalize flex-1">{c}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {c === 'inspection' ? '15 days' : c === 'financing' ? '21 days' : '17 days'}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* AI recommendation */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <Banknote size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-text-primary">AI recommendation</p>
          <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
            Open at {formatCurrency(Math.round(listing.listPrice * 0.96 / 1000) * 1000)} with 2.5% earnest money and all 3 contingencies.
            If countered, escalate up to {formatCurrency(listing.aiPriceHigh, { compact: true })}.
          </p>
        </div>
      </div>

      {/* Fiduciary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">Reviewed by your partner agent</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Dana Tanaka (Lic. RB-22451) reviews your offer for legal compliance before it's sent. You always have a licensed agent on your side.
          </p>
        </div>
      </div>

      <button
        onClick={() => toast('Offer sent to seller. Tracking in your timeline.', 'success')}
        disabled={overBudget}
        className="w-full py-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={18} />
        Send offer
      </button>

      <Link
        to="/buy/timeline"
        className="mt-3 flex items-center justify-center gap-1.5 text-xs text-text-secondary font-bold hover:text-primary"
      >
        Or see your active offer in the timeline <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );
}
