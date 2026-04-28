import { useState } from 'react';
import { Plus } from 'lucide-react';
import { listings } from '@/data/mockData';
import ListingCard from '@/components/realty/ListingCard';
import type { ListingStatus } from '@/lib/types';
import { useToast } from '@/components/shared/Toast';

const statusFilters: Array<ListingStatus | 'all'> = ['all', 'active', 'pending', 'pre_market', 'draft', 'sold'];

export default function ListingsPage() {
  const [filter, setFilter] = useState<ListingStatus | 'all'>('all');
  const { toast } = useToast();

  const filtered = listings.filter((l) => filter === 'all' || l.status === filter);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-5 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Listings</h1>
          <p className="text-sm text-text-muted">{listings.length} total · {listings.filter((l) => l.status === 'active').length} active</p>
        </div>
        <button
          onClick={() => toast('Listing intake form opening...', 'info')}
          className="bg-primary text-white px-3 md:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New listing</span>
        </button>
      </div>

      {/* Status pills */}
      <div className="flex gap-2 mb-5 overflow-x-auto -mx-1 px-1">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors capitalize ${
              filter === s ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:border-primary/40'
            }`}
          >
            {s === 'all' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
