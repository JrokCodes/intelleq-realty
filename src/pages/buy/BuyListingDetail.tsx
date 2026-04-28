import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  Heart,
  Share2,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Car,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { listings, me, compsByListing } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';

export default function BuyListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const listing = listings.find((l) => l.id === id);
  const initiallySaved = listing ? me.savedListingIds.includes(listing.id) : false;
  const [saved, setSaved] = useState(initiallySaved);

  if (!listing) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Home not found.</p>
        <Link to="/buy/feed" className="text-primary text-sm font-bold">← Back to homes</Link>
      </div>
    );
  }

  const photos = ['🏙️', '🛋️', '🍳', '🛏️', '🛁', '🌅'];
  const comps = compsByListing[listing.id] || [];
  const compMedian = comps.length
    ? Math.round([...comps].sort((a, b) => a.adjustedPrice - b.adjustedPrice)[Math.floor(comps.length / 2)]!.adjustedPrice)
    : listing.listPrice;
  const vsMedian = listing.listPrice - compMedian;
  const inBudget = listing.listPrice <= (me.preApproval.maxPrice || Infinity);

  return (
    <div className="pb-32">
      {/* Hero photo */}
      <div className="aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-9xl md:text-[12rem] relative">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-white/90 text-text-primary text-[11px] font-extrabold uppercase tracking-wider">
            {listing.daysOnMarket}d on market
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSaved(!saved);
                toast(saved ? 'Removed from saved' : 'Saved to your list', 'success');
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                saved ? 'bg-warning text-white' : 'bg-white/90 text-text-primary hover:bg-white'
              }`}
              aria-label="Save"
            >
              <Heart size={16} className={saved ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => toast('Listing link copied.', 'success')}
              className="w-10 h-10 rounded-full bg-white/90 text-text-primary hover:bg-white transition-colors flex items-center justify-center"
              aria-label="Share"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
        {listing.photoEmoji}
      </div>

      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        {/* Photo strip */}
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1 mb-5">
          {photos.map((e, i) => (
            <div
              key={i}
              className="aspect-square w-20 flex-shrink-0 bg-gradient-to-br from-sidebar/85 to-primary/35 rounded-xl flex items-center justify-center text-3xl"
            >
              {e}
            </div>
          ))}
        </div>

        {/* Price + address */}
        <div className="mb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-1">
            {formatCurrency(listing.listPrice, { compact: true })}
          </h1>
          <p className="text-base font-semibold text-text-primary">{listing.address.line1}</p>
          <p className="text-sm text-text-muted">{listing.address.neighborhood} · {listing.address.city}, HI {listing.address.zip}</p>
        </div>

        {/* AI Insight card */}
        <div className={`rounded-2xl border-2 p-5 mb-5 ${
          vsMedian < -10_000 ? 'bg-emerald-50 border-emerald-200'
          : vsMedian > 10_000 ? 'bg-amber-50 border-amber-200'
          : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className={vsMedian < -10_000 ? 'text-emerald-600' : vsMedian > 10_000 ? 'text-amber-700' : 'text-blue-600'} />
            <span className="text-[11px] font-bold uppercase tracking-wider">AI insights</span>
          </div>
          <div className="space-y-2">
            <Insight
              icon={vsMedian < 0 ? TrendingDown : TrendingUp}
              label={vsMedian < 0 ? 'Below comp median' : vsMedian > 10_000 ? 'Above comp median' : 'At comp median'}
              detail={`Comparable sales suggest a fair price around ${formatCurrency(compMedian, { compact: true })}. This home is ${vsMedian >= 0 ? '+' : '−'}${formatCurrency(Math.abs(vsMedian), { compact: true })}.`}
            />
            <Insight
              icon={inBudget ? CheckCircle2 : TrendingUp}
              label={inBudget ? 'Within your pre-approval' : 'Above your pre-approval'}
              detail={`Your max budget is ${formatCurrency(me.preApproval.maxPrice || 0, { compact: true })} (${me.preApproval.lender}).`}
            />
            <Insight
              icon={Calendar}
              label="Market activity"
              detail={`${listing.daysOnMarket} days on market. Anaha condos average 14 days at this price point.`}
            />
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
          <Spec icon={Bed} label="Beds" value={String(listing.beds)} />
          <Spec icon={Bath} label="Baths" value={String(listing.baths)} />
          <Spec icon={Ruler} label="Sqft" value={listing.sqft.toLocaleString()} />
          <Spec icon={Car} label="Parking" value={String(listing.parking)} />
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-sm font-bold text-text-primary mb-2">About this home</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">{listing.description}</p>
          {listing.hoa && (
            <p className="text-xs text-text-muted">
              HOA: <span className="font-bold text-text-primary">${listing.hoa.toLocaleString()}/mo</span> · Built {listing.yearBuilt}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h3 className="text-sm font-bold text-text-primary mb-3">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {listing.aiTags.map((tag) => (
              <div key={tag} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Map preview */}
        <div className="bg-white rounded-2xl border border-border p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-text-muted" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Location</span>
          </div>
          <div className="aspect-[16/9] bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 rounded-xl border border-border relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225" preserveAspectRatio="none">
              <path d="M 0 80 L 400 90" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 0 140 L 400 130" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 100 0 L 110 225" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 220 0 L 230 225" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
            <div className="absolute top-[42%] left-[45%]">
              <div className="w-9 h-9 rounded-full bg-warning border-3 border-white shadow-xl flex items-center justify-center">
                <MapPin size={16} className="text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-extrabold text-emerald-900">Title verified · Disclosures available</p>
            <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
              IntelleQ confirmed clear title. Seller property disclosure and HOA documents are pre-approved for review when you make an offer.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky offer CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border px-4 py-3 md:py-4"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-muted">Make an offer</p>
            <p className="text-base font-extrabold text-text-primary">{formatCurrency(listing.listPrice, { compact: true })}</p>
          </div>
          <Link
            to={`/buy/listings/${listing.id}/offer`}
            className="bg-primary text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
          >
            Make an offer <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Insight({ icon: Icon, label, detail }: { icon: typeof Sparkles; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={14} className="flex-shrink-0 mt-0.5 opacity-70" />
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-xs leading-snug opacity-80">{detail}</p>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: typeof Bed; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-3 text-center">
      <Icon size={16} className="text-text-muted mx-auto mb-1.5" />
      <p className="text-base md:text-lg font-extrabold text-text-primary">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
    </div>
  );
}
