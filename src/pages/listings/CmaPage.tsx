import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, FileText, MapPin, Sparkles, Filter } from 'lucide-react';
import { listings, compsByListing } from '@/data/mockData';
import { formatCurrency, formatSqft } from '@/lib/format';
import PriceBand from '@/components/realty/PriceBand';
import CompCard from '@/components/realty/CompCard';
import { useToast } from '@/components/shared/Toast';

export default function CmaPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const listing = listings.find((l) => l.id === id);
  const allComps = id ? compsByListing[id] || [] : [];

  const [radius, setRadius] = useState(1.0);
  const [maxAgeMonths, setMaxAgeMonths] = useState(6);

  if (!listing) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Listing not found.</p>
        <Link to="/listings" className="text-primary text-sm font-bold">← Back to listings</Link>
      </div>
    );
  }

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - maxAgeMonths);

  const filteredComps = allComps
    .filter((c) => c.distanceMi <= radius)
    .filter((c) => new Date(c.soldDate) >= cutoffDate)
    .sort((a, b) => b.matchScore - a.matchScore);

  const strongComps = filteredComps.filter((c) => c.matchScore >= 80).length;
  const caption =
    strongComps >= 6
      ? `High confidence — ${strongComps} strong comps within ${radius.toFixed(1)}mi, sold within the last ${maxAgeMonths} months.`
      : strongComps >= 3
      ? `Medium confidence — ${strongComps} strong comps. Consider widening radius or time window.`
      : `Low confidence — only ${strongComps} strong comp${strongComps === 1 ? '' : 's'}. Recommend manual review.`;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <Link
        to={`/listings/${listing.id}`}
        className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-hover mb-4"
      >
        <ArrowLeft size={16} /> Back to listing
      </Link>

      {/* Subject property */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
          Subject property
        </span>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-4xl flex-shrink-0">
            {listing.photoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-text-primary leading-tight">{listing.address.line1}</h1>
            <p className="text-sm text-text-muted truncate">{listing.address.neighborhood} · {listing.address.city}, HI {listing.address.zip}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-text-secondary">
              <span><strong className="text-text-primary">{listing.beds}</strong> BR</span>
              <span><strong className="text-text-primary">{listing.baths}</strong> BA</span>
              <span><strong className="text-text-primary">{formatSqft(listing.sqft)}</strong></span>
              <span><strong className="text-text-primary">{listing.yearBuilt}</strong> built</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Price Band */}
      <PriceBand
        low={listing.aiPriceLow}
        high={listing.aiPriceHigh}
        confidence={listing.aiConfidence}
        caption={caption}
      />

      {/* Filters */}
      <div className="mt-4 bg-white rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-text-muted" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Comp filters</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-text-secondary mb-1 block">Radius: {radius.toFixed(1)} mi</label>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary mb-1 block">Sold within: {maxAgeMonths} mo</label>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={maxAgeMonths}
              onChange={(e) => setMaxAgeMonths(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Map preview */}
      <div className="mt-4 bg-white rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={14} className="text-text-muted" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Map view</span>
        </div>
        <div className="aspect-[16/9] bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 rounded-xl border border-border relative overflow-hidden">
          {/* Fake map streets */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225" preserveAspectRatio="none">
            <path d="M 0 80 L 400 90" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 0 140 L 400 130" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 100 0 L 110 225" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 220 0 L 230 225" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 320 0 L 315 225" stroke="#CBD5E1" strokeWidth="1" />
          </svg>
          {/* Subject pin */}
          <div className="absolute top-[42%] left-[45%]">
            <div className="w-7 h-7 rounded-full bg-accent-gold border-2 border-white shadow-lg flex items-center justify-center text-sidebar text-xs font-extrabold">
              S
            </div>
          </div>
          {/* Comp pins */}
          {filteredComps.slice(0, 6).map((_, i) => (
            <div
              key={i}
              className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow flex items-center justify-center text-white text-[10px] font-extrabold"
              style={{
                top: `${20 + ((i * 53) % 70)}%`,
                left: `${15 + ((i * 73) % 70)}%`,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-text-muted mt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-gold mr-1" /> Subject
          <span className="inline-block w-2 h-2 rounded-full bg-primary mx-1 ml-3" /> Comparable sales
        </p>
      </div>

      {/* Comp list */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-extrabold text-text-primary">Comparable sales ({filteredComps.length})</h2>
          <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">Sorted by match</span>
        </div>
        <div className="space-y-2">
          {filteredComps.map((comp) => (
            <CompCard key={comp.id} comp={comp} />
          ))}
          {filteredComps.length === 0 && (
            <div className="bg-white rounded-xl border border-border p-6 text-center text-sm text-text-muted">
              No comps match these filters. Try widening the radius or time window.
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => toast('CMA report queued — Cam will receive PDF in email shortly.', 'success')}
        className="w-full mt-5 py-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 hover:shadow-xl flex items-center justify-center gap-2"
      >
        <FileText size={18} />
        Generate CMA report PDF
      </button>

      <div className="mt-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
        <Sparkles size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-800 leading-snug">
          Generated by IntelleQ AI from {allComps.length} MLS records (Honolulu MLS)
          on {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.
          Adjustments based on sold-price regression model. Recommendations are advisory — always exercise fiduciary judgment.
        </p>
      </div>

      <div className="text-[10px] text-text-muted/70 text-center mt-3">
        Subject: {formatCurrency(listing.listPrice)} listed · AI band {formatCurrency(listing.aiPriceLow)}–{formatCurrency(listing.aiPriceHigh)}
      </div>
    </div>
  );
}
