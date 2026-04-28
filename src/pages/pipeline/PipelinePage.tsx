import { useState } from 'react';
import { deals } from '@/data/mockData';
import DealCard from '@/components/realty/DealCard';

type Filter = 'all' | 'sell' | 'buy';

export default function PipelinePage() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = deals.filter((d) => filter === 'all' || d.side === filter);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Pipeline</h1>
        <p className="text-sm text-text-muted">All active deals across both sides</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto -mx-1 px-1">
        <FilterTab label="All" count={deals.length} active={filter === 'all'} onClick={() => setFilter('all')} />
        <FilterTab label="Listings" count={deals.filter((d) => d.side === 'sell').length} active={filter === 'sell'} onClick={() => setFilter('sell')} />
        <FilterTab label="Buyers" count={deals.filter((d) => d.side === 'buy').length} active={filter === 'buy'} onClick={() => setFilter('buy')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}

function FilterTab({
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
