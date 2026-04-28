import { CheckCircle2, Edit, Sparkles, Eye, Heart, Share2 } from 'lucide-react';
import { myListing } from '@/data/mockData';
import { formatCurrency, formatSqft } from '@/lib/format';
import { useToast } from '@/components/shared/Toast';
import WizardLayout from '@/components/realty/WizardLayout';

export default function ListingPreview() {
  const { toast } = useToast();
  const photos = ['🏙️', '🛋️', '🍳', '🛏️', '🛁', '🌅', '🏊', '💪'];

  return (
    <WizardLayout
      step={7}
      stepName="Preview"
      aiMessage="Here's your listing. This is exactly what buyers will see."
      aiHint="I wrote the description from your photos and intake. Tap edit to tweak anything."
      backTo="/sell/price"
      continueTo="/sell/sign"
      continueLabel="Looks good — sign"
    >
      {/* Preview badge */}
      <div className="bg-accent-gold/15 border border-accent-gold/40 rounded-xl p-3 mb-4 flex items-center gap-2.5">
        <Sparkles size={16} className="text-amber-700 flex-shrink-0" />
        <p className="text-sm font-bold text-amber-900 flex-1">
          Preview mode — listing goes live after you sign
        </p>
        <button
          onClick={() => toast('Edit panel opening...', 'info')}
          className="text-xs font-bold text-amber-700 flex items-center gap-1 hover:text-amber-800 flex-shrink-0"
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

      {/* Engagement projection */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-3">
        <h3 className="text-sm font-bold text-text-primary mb-3">When you go live, expect</h3>
        <div className="grid grid-cols-3 gap-3">
          <Engagement icon={Eye} label="Day 1 views" value="~140" />
          <Engagement icon={Heart} label="Day 1 saves" value="~32" />
          <Engagement icon={Share2} label="Drips fired" value="3,247" />
        </div>
      </div>
    </WizardLayout>
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
