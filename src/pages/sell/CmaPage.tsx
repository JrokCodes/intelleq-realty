import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, FileText, MapPin, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { myListing, compsByListing } from '@/data/mockData';
import { formatCurrency, formatSqft } from '@/lib/format';
import PriceBand from '@/components/realty/PriceBand';
import CompCard from '@/components/realty/CompCard';
import { useToast } from '@/components/shared/Toast';

export default function CmaPage() {
  const { toast } = useToast();
  const allComps = compsByListing[myListing.id] || [];

  const [radius, setRadius] = useState(1.0);
  const [maxAgeMonths, setMaxAgeMonths] = useState(6);

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - maxAgeMonths);

  const filteredComps = allComps
    .filter((c) => c.distanceMi <= radius)
    .filter((c) => new Date(c.soldDate) >= cutoffDate)
    .sort((a, b) => b.matchScore - a.matchScore);

  const strongComps = filteredComps.filter((c) => c.matchScore >= 80).length;
  const caption =
    strongComps >= 6
      ? `High confidence — ${strongComps} strong comparable sales within ${radius.toFixed(1)}mi, all sold within the last ${maxAgeMonths} months.`
      : strongComps >= 3
      ? `Medium confidence — ${strongComps} strong comparable sales. Consider widening radius or time window.`
      : `Low confidence — only ${strongComps} strong comp${strongComps === 1 ? '' : 's'}. Recommend a manual review with our partner agent.`;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Your home's value</h1>
        <p className="text-sm text-text-secondary">AI valuation based on real recent sales nearby</p>
      </div>

      {/* Subject property card */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-3">
          Your property
        </span>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-4xl flex-shrink-0">
            {myListing.photoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold text-text-primary leading-tight">{myListing.address.line1}</h2>
            <p className="text-sm text-text-muted truncate">{myListing.address.neighborhood} · {myListing.address.city}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-2 text-sm text-text-secondary">
              <span><strong className="text-text-primary">{myListing.beds}</strong> BR</span>
              <span><strong className="text-text-primary">{myListing.baths}</strong> BA</span>
              <span><strong className="text-text-primary">{formatSqft(myListing.sqft)}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* The valuation */}
      <PriceBand
        low={myListing.aiPriceLow}
        high={myListing.aiPriceHigh}
        confidence={myListing.aiConfidence}
        caption={caption}
      />

      {/* Recommended list price */}
      <div className="mt-4 bg-white rounded-2xl border-2 border-primary p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">AI recommendation</p>
            <p className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">List at {formatCurrency(myListing.listPrice, { compact: true })}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-primary" />
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Slightly below the comp midpoint to drive multiple offers. Goal: net higher than the AI midpoint after a competitive bidding scenario.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-5 bg-white rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-text-muted" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Adjust comp filters</span>
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
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225" preserveAspectRatio="none">
            <path d="M 0 80 L 400 90" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 0 140 L 400 130" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 100 0 L 110 225" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 220 0 L 230 225" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 320 0 L 315 225" stroke="#CBD5E1" strokeWidth="1" />
          </svg>
          <div className="absolute top-[42%] left-[45%]">
            <div className="w-7 h-7 rounded-full bg-accent-gold border-2 border-white shadow-lg flex items-center justify-center text-sidebar text-xs font-extrabold">
              ★
            </div>
          </div>
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
          <span className="inline-block w-2 h-2 rounded-full bg-accent-gold mr-1" /> Your home
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
        </div>
      </div>

      {/* Fiduciary footer */}
      <div className="mt-5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] md:text-xs text-emerald-800 leading-snug">
          Generated by IntelleQ AI from {allComps.length} verified MLS records. Reviewed by your partner agent
          (Cameron Leopoldino, Lic. RB-22451). The recommendation is advisory — your final list price is your decision.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => toast('Valuation report PDF will be emailed in moments.', 'success')}
          className="py-3 px-4 rounded-xl bg-white border border-border text-sm font-bold text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={16} /> PDF report
        </button>
        <Link
          to="/sell/listing"
          className="py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
        >
          See listing <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
