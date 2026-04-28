import { Link } from 'react-router';
import { ArrowRight, CheckCircle2, Edit, Sparkles, Eye, Heart, Share2 } from 'lucide-react';
import { myListing } from '@/data/mockData';
import { formatCurrency, formatSqft } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';

export default function ListingPreview() {
  const { toast } = useToast();
  const photos = ['🏙️', '🛋️', '🍳', '🛏️', '🛁', '🌅', '🏊', '💪'];

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Your listing</h1>
        <p className="text-sm text-text-secondary">Live on MLS, Zillow, and Realtor.com — this is what buyers see</p>
      </div>

      {/* Live badge */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <p className="text-sm font-bold text-emerald-900 flex-1">Live · listed {myListing.daysOnMarket} days ago</p>
        <button
          onClick={() => toast('Edit window opened.', 'info')}
          className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:text-emerald-800"
        >
          <Edit size={12} /> Edit
        </button>
      </div>

      {/* Photo gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
        <div className="col-span-2 row-span-2 aspect-[4/3] bg-gradient-to-br from-sidebar/85 to-primary/40 rounded-2xl flex items-center justify-center text-9xl">
          {photos[0]}
        </div>
        {photos.slice(1, 5).map((emoji, i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-sidebar/80 to-primary/35 rounded-2xl flex items-center justify-center text-5xl md:text-6xl"
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Title + price */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-text-primary leading-tight">{myListing.address.line1}</h2>
        <p className="text-sm text-text-muted">{myListing.address.neighborhood} · {myListing.address.city}, HI {myListing.address.zip}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">{formatCurrency(myListing.listPrice, { compact: true })}</span>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-text-secondary">
          <span><strong className="text-text-primary">{myListing.beds}</strong> BR</span>
          <span><strong className="text-text-primary">{myListing.baths}</strong> BA</span>
          <span><strong className="text-text-primary">{formatSqft(myListing.sqft)}</strong></span>
          <span><strong className="text-text-primary">{myListing.yearBuilt}</strong></span>
        </div>
      </div>

      {/* AI-generated description */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Sparkles size={14} className="text-primary" /> Listing description
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI-generated</span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {myListing.description}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Floor-to-ceiling windows frame Diamond Head and the Pacific. Private 1-stall parking, full
          building amenities including infinity pool, fitness center, and 24-hour concierge.
          HOA includes water, sewer, and high-speed internet. {' '}
          <span className="font-semibold text-text-primary">A rare opportunity at this price point in Anaha.</span>
        </p>
      </div>

      {/* Features detected by AI */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {myListing.aiTags.map((tag) => (
            <div key={tag} className="flex items-center gap-2 text-sm text-text-secondary">
              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Engagement preview */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5">
        <h3 className="text-sm font-bold text-text-primary mb-3">Buyer engagement</h3>
        <div className="grid grid-cols-3 gap-3">
          <Engagement icon={Eye} label="Views (24h)" value="142" />
          <Engagement icon={Heart} label="Saves" value="38" />
          <Engagement icon={Share2} label="Shares" value="11" />
        </div>
      </div>

      <Link
        to="/sell/marketing"
        className="block bg-primary text-white rounded-2xl p-5 hover:bg-primary-hover transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Next step</p>
            <p className="text-base md:text-lg font-extrabold">Marketing & 2 new offers →</p>
          </div>
          <ArrowRight size={20} />
        </div>
      </Link>
    </div>
  );
}

function Engagement({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: string }) {
  return (
    <div className="bg-bg rounded-xl p-3 text-center">
      <Icon size={16} className="text-text-muted mx-auto mb-1.5" />
      <p className="text-lg font-extrabold text-text-primary">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
    </div>
  );
}
