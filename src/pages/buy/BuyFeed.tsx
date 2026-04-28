import { useState } from 'react';
import { Link } from 'react-router';
import { Filter, Sparkles, Heart } from 'lucide-react';
import { listings, me } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

type FilterMode = 'curated' | 'saved' | 'all';

export default function BuyFeed() {
  const [mode, setMode] = useState<FilterMode>('curated');

  // Filter listings to show only those that match Alex's criteria for "curated"
  const matchedForAlex = listings.filter(
    (l) =>
      l.listPrice >= me.searchCriteria.priceMin &&
      l.listPrice <= me.searchCriteria.priceMax &&
      l.beds >= me.searchCriteria.minBeds &&
      me.searchCriteria.cities.includes(l.address.city),
  );
  const saved = listings.filter((l) => me.savedListingIds.includes(l.id));

  const visible = mode === 'curated' ? matchedForAlex : mode === 'saved' ? saved : listings;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto pb-32">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Homes for you</h1>
        <p className="text-sm text-text-secondary">{matchedForAlex.length} match your criteria · curated by AI daily</p>
      </div>

      {/* Search criteria summary */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Filter size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Searching</p>
          <p className="text-sm font-bold text-text-primary truncate">
            {me.searchCriteria.minBeds}+ BR · {formatCurrency(me.searchCriteria.priceMin, { compact: true })}–{formatCurrency(me.searchCriteria.priceMax, { compact: true })} · {me.searchCriteria.cities.join(', ')}
          </p>
        </div>
        <button className="text-xs font-bold text-primary hover:text-primary-hover flex-shrink-0">Edit</button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-5 overflow-x-auto -mx-1 px-1">
        <FilterPill label="✨ AI picks" count={matchedForAlex.length} active={mode === 'curated'} onClick={() => setMode('curated')} />
        <FilterPill label="❤️ Saved" count={saved.length} active={mode === 'saved'} onClick={() => setMode('saved')} />
        <FilterPill label="All" count={listings.length} active={mode === 'all'} onClick={() => setMode('all')} />
      </div>

      {/* Why these homes */}
      {mode === 'curated' && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-4 flex items-start gap-3">
          <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-extrabold text-text-primary">Why these picks?</p>
            <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
              Filtered to your price range, criteria, and cities. Sorted by AI confidence — the homes most likely to match your taste based on what you've saved.
            </p>
          </div>
        </div>
      )}

      {/* Listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {visible.map((l) => (
          <Link
            key={l.id}
            to={`/buy/listings/${l.id}`}
            className="group block bg-white rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-sidebar/90 to-primary/30 flex items-center justify-center text-7xl relative">
              {me.savedListingIds.includes(l.id) && (
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <Heart size={16} className="text-warning fill-warning" />
                </div>
              )}
              {matchedForAlex.includes(l) && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> Match
                </div>
              )}
              {l.photoEmoji}
            </div>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-lg font-extrabold text-text-primary truncate">{formatCurrency(l.listPrice, { compact: true })}</h3>
                <span className="text-[11px] text-text-muted shrink-0">{l.daysOnMarket}d</span>
              </div>
              <p className="text-sm font-semibold text-text-primary truncate">{l.address.line1}</p>
              <p className="text-xs text-text-muted truncate mb-3">{l.address.neighborhood} · {l.address.city}</p>
              <div className="flex items-center gap-3 text-xs text-text-secondary pb-2 border-b border-border">
                <span><strong className="text-text-primary">{l.beds}</strong> BR</span>
                <span><strong className="text-text-primary">{l.baths}</strong> BA</span>
                <span><strong className="text-text-primary">{l.sqft.toLocaleString()}</strong> sqft</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {l.aiTags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded-full bg-bg text-[10px] text-text-secondary truncate max-w-[120px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-8 text-center text-sm text-text-muted">
          {mode === 'saved' ? "You haven't saved any homes yet — tap the heart on listings you like." : 'No homes match these filters.'}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
        active ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:border-primary/40'
      }`}
    >
      {label}
      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-bg'}`}>
        {count}
      </span>
    </button>
  );
}
