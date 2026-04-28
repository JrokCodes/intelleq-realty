import { Link, useParams } from 'react-router';
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Megaphone,
  Camera,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Edit,
} from 'lucide-react';
import { listings, contacts, compsByListing } from '@/data/mockData';
import { formatCurrency, formatSqft } from '@/lib/format';
import { listingStatusStyles } from '@/lib/colors';
import StatusBadge from '@/components/shared/StatusBadge';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Listing not found.</p>
        <Link to="/listings" className="text-primary text-sm font-bold">← Back to listings</Link>
      </div>
    );
  }

  const seller = contacts.find((c) => c.id === listing.sellerId);
  const compsCount = (compsByListing[listing.id] || []).length;
  const styles = listingStatusStyles[listing.status];

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Link
        to="/listings"
        className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-hover mb-4"
      >
        <ArrowLeft size={16} /> Listings
      </Link>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-4">
        <div className="aspect-[16/9] bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-9xl relative">
          <div className="absolute top-4 left-4">
            <StatusBadge bg={styles.bg} text={styles.text} label={styles.label} />
          </div>
          {listing.photoEmoji}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold text-text-primary leading-tight">{listing.address.line1}</h1>
              <p className="text-sm text-text-muted">{listing.address.neighborhood} · {listing.address.city}, HI {listing.address.zip}</p>
            </div>
            <button className="p-2 rounded-lg bg-bg hover:bg-primary hover:text-white text-text-secondary transition-colors flex-shrink-0">
              <Edit size={16} />
            </button>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">{formatCurrency(listing.listPrice, { compact: true })}</span>
            {listing.daysOnMarket > 0 && <span className="text-sm text-text-muted">· {listing.daysOnMarket} DOM</span>}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span><strong className="text-text-primary">{listing.beds}</strong> BR</span>
            <span><strong className="text-text-primary">{listing.baths}</strong> BA</span>
            <span><strong className="text-text-primary">{formatSqft(listing.sqft)}</strong></span>
            {listing.lotSqft > 0 && <span><strong className="text-text-primary">{listing.lotSqft.toLocaleString()}</strong> lot</span>}
            <span><strong className="text-text-primary">{listing.yearBuilt}</strong> built</span>
          </div>
        </div>
      </div>

      {/* AI pricing card */}
      <div className="bg-gradient-to-br from-sidebar to-[#1c3540] text-white rounded-2xl p-5 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl -translate-y-12 translate-x-12" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-accent-gold/20 flex items-center justify-center">
              <TrendingUp size={14} className="text-accent-gold" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">AI pricing</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Recommended range</p>
              <p className="text-lg font-extrabold mt-1">{formatCurrency(listing.aiPriceLow, { compact: true })}–{formatCurrency(listing.aiPriceHigh, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Confidence</p>
              <p className="text-lg font-extrabold mt-1">{(listing.aiConfidence * 100).toFixed(0)}%</p>
            </div>
          </div>
          <Link
            to={`/listings/${listing.id}/cma`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-gold text-sidebar rounded-lg text-xs font-extrabold hover:bg-accent-gold-soft transition-colors"
          >
            Open CMA <ArrowLeft size={12} className="rotate-180" />
          </Link>
        </div>
      </div>

      {/* Tabs as cards (no real tabs to keep mobile simple) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* AI image tags */}
        <SectionCard
          icon={Camera}
          title="AI photo tags"
          subtitle={`${listing.aiTags.length} features detected`}
        >
          <div className="flex flex-wrap gap-1.5">
            {listing.aiTags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-bg border border-border text-xs font-medium text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Marketing */}
        <SectionCard
          icon={Megaphone}
          title="Marketing"
          subtitle={`${listing.marketingChannels.length} channels active`}
        >
          {listing.marketingChannels.length === 0 ? (
            <p className="text-sm text-text-muted">Not yet marketed.</p>
          ) : (
            <ul className="space-y-1.5">
              {listing.marketingChannels.map((ch) => (
                <li key={ch} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                  {ch}
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* Forms */}
        <SectionCard
          icon={FileText}
          title="Forms & contracts"
          subtitle="Signed and pending"
        >
          <ul className="space-y-2 text-sm">
            <ChecklistRow done label="Listing agreement" />
            <ChecklistRow done label="Seller property disclosure" />
            <ChecklistRow done label="Lead-based paint disclosure" />
            <ChecklistRow label="Open house agreement" />
          </ul>
        </SectionCard>

        {/* Intake & verification */}
        <SectionCard
          icon={ShieldCheck}
          title="Verification"
          subtitle="Seller and title"
        >
          <ul className="space-y-2 text-sm">
            <ChecklistRow done label="Seller identity verified" />
            <ChecklistRow
              done={listing.titleStatus === 'clear'}
              label={listing.titleStatus === 'clear' ? 'Title clear' : 'Title report pending'}
            />
            <ChecklistRow done={listing.intakeComplete} label="Intake form complete" />
            <ChecklistRow done label="Comp set verified" extra={`${compsCount} comps`} />
          </ul>
        </SectionCard>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h3 className="text-sm font-bold text-text-primary mb-2">Description</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{listing.description}</p>
      </div>

      {/* Seller */}
      {seller && (
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">Seller</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-xs font-extrabold">
              {seller.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary">{seller.firstName} {seller.lastName}</p>
              <p className="text-xs text-text-muted">{seller.email} · {seller.phone}</p>
            </div>
          </div>
          {seller.notes && (
            <p className="mt-3 text-xs text-text-secondary leading-relaxed border-t border-border pt-3">{seller.notes}</p>
          )}
        </div>
      )}

      {/* Sticky CTA */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          to={`/listings/${listing.id}/cma`}
          className="py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold text-center hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Run CMA
        </Link>
        <button className="py-3 px-4 rounded-xl bg-white border border-border text-sm font-bold text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Clock size={16} /> Schedule open
        </button>
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof Camera;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary leading-tight">{title}</h3>
          <p className="text-[11px] text-text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ChecklistRow({ done, label, extra }: { done?: boolean; label: string; extra?: string }) {
  return (
    <li className="flex items-center gap-2">
      {done ? (
        <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
      ) : (
        <Clock size={15} className="text-amber-500 flex-shrink-0" />
      )}
      <span className={done ? 'text-text-primary font-medium' : 'text-text-secondary'}>{label}</span>
      {extra && <span className="ml-auto text-[11px] text-text-muted">{extra}</span>}
    </li>
  );
}
