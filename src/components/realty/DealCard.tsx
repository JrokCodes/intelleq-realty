import { Link } from 'react-router';
import type { Deal } from '@/lib/types';
import { formatCurrency, relativeDate } from '@/lib/format';
import { stageLabels } from '@/lib/colors';
import { listings, buyers, contacts } from '@/data/mockData';
import { Home, User, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function DealCard({ deal }: { deal: Deal }) {
  const listing = deal.listingId ? listings.find((l) => l.id === deal.listingId) : null;
  const buyer = deal.buyerId ? buyers.find((b) => b.id === deal.buyerId) : null;
  const buyerContact = buyer ? contacts.find((c) => c.id === buyer.contactId) : null;

  const trackStyles =
    deal.onTrack === 'yes' ? { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'On track' }
    : deal.onTrack === 'at_risk' ? { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Clock, label: 'At risk' }
    : { bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle, label: 'Overdue' };

  const TrackIcon = trackStyles.icon;
  const sideStyles =
    deal.side === 'sell'
      ? 'bg-primary/10 text-primary'
      : 'bg-accent-gold/20 text-amber-800';

  return (
    <Link
      to={`/deals/${deal.id}`}
      className="block bg-white rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${sideStyles}`}>
            {deal.side === 'sell' ? 'Listing' : 'Buyer'}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            {stageLabels[deal.stage]}
          </span>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${trackStyles.bg}`}>
          <TrackIcon size={11} />
          {trackStyles.label}
        </div>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center flex-shrink-0">
          {listing ? (
            <span className="text-2xl">{listing.photoEmoji}</span>
          ) : (
            <User size={20} className="text-text-muted" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {listing ? (
            <>
              <p className="text-sm font-bold text-text-primary truncate">{listing.address.line1}</p>
              <p className="text-xs text-text-muted truncate">{listing.address.neighborhood} · {listing.address.city}</p>
            </>
          ) : buyerContact ? (
            <>
              <p className="text-sm font-bold text-text-primary truncate">{buyerContact.firstName} {buyerContact.lastName}</p>
              <p className="text-xs text-text-muted truncate">Buyer search · {buyer?.searchCriteria.cities.join(', ')}</p>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
        <div className="min-w-0">
          <p className="text-base font-extrabold text-text-primary tracking-tight">{formatCurrency(deal.price, { compact: true })}</p>
          <p className="text-[11px] text-text-muted">Est. comm. {formatCurrency(deal.commissionEst, { compact: true })}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-text-secondary justify-end">
            <Home size={11} />
            <span>Close {relativeDate(deal.expectedCloseDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
