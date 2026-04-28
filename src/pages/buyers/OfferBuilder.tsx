import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Send, Sparkles, ShieldCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { buyers, listings, contacts, compsByListing } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';

export default function OfferBuilder() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const buyer = buyers.find((b) => b.id === id);
  const buyerContact = buyer ? contacts.find((c) => c.id === buyer.contactId) : null;

  // Pick first matching listing in buyer's price range
  const matchingListing = buyer
    ? listings.find(
        (l) =>
          l.listPrice >= buyer.searchCriteria.priceMin &&
          l.listPrice <= buyer.searchCriteria.priceMax &&
          l.beds >= buyer.searchCriteria.minBeds &&
          buyer.searchCriteria.cities.includes(l.address.city),
      )
    : null;

  const initialOffer = matchingListing ? Math.round(matchingListing.listPrice * 0.97 / 1000) * 1000 : 0;
  const [offerPrice, setOfferPrice] = useState(initialOffer);
  const [earnestMoney, setEarnestMoney] = useState(matchingListing ? Math.round(matchingListing.listPrice * 0.025 / 1000) * 1000 : 0);
  const [closeDate, setCloseDate] = useState('2026-06-30');
  const [contingencies, setContingencies] = useState({
    inspection: true,
    financing: buyer?.preApproval.lender !== 'Cash',
    appraisal: buyer?.preApproval.lender !== 'Cash',
  });

  if (!buyer || !buyerContact || !matchingListing) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Buyer or matching listing not found.</p>
        <Link to="/buyers" className="text-primary text-sm font-bold">← Back to buyers</Link>
      </div>
    );
  }

  const comps = compsByListing[matchingListing.id] || [];
  const recommendedLow = matchingListing.aiPriceLow;
  const recommendedHigh = matchingListing.aiPriceHigh;
  const positionPct = (offerPrice - recommendedLow) / (recommendedHigh - recommendedLow);
  const position = positionPct < 0.33 ? 'below' : positionPct < 0.67 ? 'at' : 'above';
  const positionStyles =
    position === 'below' ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: TrendingDown, label: 'Below median', tone: 'Competitive — likely to be accepted in a soft market.' }
    : position === 'at' ? { bg: 'bg-blue-50 border-blue-200 text-blue-700', icon: Minus, label: 'At median', tone: 'Aligned with comps. Reasonable opening offer.' }
    : { bg: 'bg-amber-50 border-amber-200 text-amber-800', icon: TrendingUp, label: 'Above median', tone: 'Strong offer — useful in multi-offer scenarios.' };
  const PosIcon = positionStyles.icon;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <Link
        to={`/buyers/${buyer.id}`}
        className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-hover mb-4"
      >
        <ArrowLeft size={16} /> Back to buyer
      </Link>

      {/* Listing header */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <span className="inline-block px-2 py-0.5 rounded-full bg-accent-gold/20 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-2">
          Offer for {buyerContact.firstName} {buyerContact.lastName}
        </span>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-4xl flex-shrink-0">
            {matchingListing.photoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-extrabold text-text-primary leading-tight">{matchingListing.address.line1}</h1>
            <p className="text-sm text-text-muted truncate">{matchingListing.address.neighborhood} · {matchingListing.address.city}</p>
            <p className="text-base font-extrabold text-text-primary mt-1">List {formatCurrency(matchingListing.listPrice, { compact: true })}</p>
          </div>
        </div>
      </div>

      {/* Comp ribbon */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Recent comps for anchor</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {comps.slice(0, 5).map((comp) => (
            <div key={comp.id} className="flex-shrink-0 w-32 bg-bg rounded-xl p-3 border border-border">
              <div className="text-2xl mb-1">{comp.photoEmoji}</div>
              <p className="text-xs font-bold text-text-primary truncate">{formatCurrency(comp.soldPrice, { compact: true })}</p>
              <p className="text-[10px] text-text-muted">{formatDate(comp.soldDate, { short: true })}</p>
              <p className="text-[10px] text-text-muted">{comp.distanceMi.toFixed(1)}mi away</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendation */}
      <div className={`rounded-2xl border-2 ${positionStyles.bg} p-5 mb-4`}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
              <PosIcon size={16} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider">{positionStyles.label}</span>
          </div>
          <span className="text-xs font-bold opacity-70">vs comps</span>
        </div>
        <p className="text-sm leading-relaxed mb-3">{positionStyles.tone}</p>
        <div className="text-xs opacity-90 leading-relaxed">
          AI recommended range: <strong>{formatCurrency(recommendedLow, { compact: true })}–{formatCurrency(recommendedHigh, { compact: true })}</strong>.
          Your offer of <strong>{formatCurrency(offerPrice, { compact: true })}</strong> is {Math.abs(((offerPrice - matchingListing.listPrice) / matchingListing.listPrice) * 100).toFixed(1)}% {offerPrice > matchingListing.listPrice ? 'above' : 'below'} list.
        </div>
      </div>

      {/* Offer fields */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-base font-extrabold text-text-primary mb-4">Offer terms</h2>

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
              {((earnestMoney / offerPrice) * 100).toFixed(1)}% of offer
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
            <div className="space-y-2">
              {(['inspection', 'financing', 'appraisal'] as const).map((c) => (
                <label key={c} className="flex items-center gap-3 px-3 py-2.5 border border-border rounded-xl cursor-pointer hover:bg-bg">
                  <input
                    type="checkbox"
                    checked={contingencies[c]}
                    onChange={(e) => setContingencies((prev) => ({ ...prev, [c]: e.target.checked }))}
                    className="w-4 h-4 accent-primary"
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

      {/* Fiduciary card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-emerald-900">Fiduciary check</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Offer remains within {buyerContact.firstName}'s pre-approval cap of {formatCurrency(buyer.preApproval.maxPrice || 0, { compact: true })}.
            Recommended counter-strategy if rejected: re-offer at $2.135M with seller credit.
          </p>
        </div>
      </div>

      <button
        onClick={() => toast('Offer sent to listing agent. Tracking response in deal timeline.', 'success')}
        className="w-full py-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 hover:shadow-xl flex items-center justify-center gap-2"
      >
        <Send size={18} />
        Send to seller's agent
      </button>
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
