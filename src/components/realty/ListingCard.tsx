import { Link } from 'react-router';
import type { Listing } from '@/lib/types';
import { formatCurrency } from '@/lib/format';
import { listingStatusStyles } from '@/lib/colors';
import StatusBadge from '@/components/shared/StatusBadge';

export default function ListingCard({ listing }: { listing: Listing }) {
  const styles = listingStatusStyles[listing.status];

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="block bg-white rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-7xl relative">
        <div className="absolute top-3 right-3">
          <StatusBadge bg={styles.bg} text={styles.text} label={styles.label} size="sm" />
        </div>
        {listing.photoEmoji}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-base font-extrabold text-text-primary truncate">{formatCurrency(listing.listPrice, { compact: true })}</h3>
          {listing.daysOnMarket > 0 && (
            <span className="text-[11px] text-text-muted shrink-0">{listing.daysOnMarket} DOM</span>
          )}
        </div>
        <p className="text-sm font-semibold text-text-primary truncate">{listing.address.line1}</p>
        <p className="text-xs text-text-muted truncate mb-3">{listing.address.neighborhood} · {listing.address.city}</p>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span><strong className="text-text-primary">{listing.beds}</strong> BR</span>
          <span><strong className="text-text-primary">{listing.baths}</strong> BA</span>
          <span><strong className="text-text-primary">{listing.sqft.toLocaleString()}</strong> sqft</span>
        </div>
      </div>
    </Link>
  );
}
