import { useState } from 'react';
import type { Comp } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/format';
import { ChevronDown } from 'lucide-react';

export default function CompCard({ comp }: { comp: Comp }) {
  const [open, setOpen] = useState(false);
  const totalAdj = comp.adjustments.sqft + comp.adjustments.time + comp.adjustments.condition + comp.adjustments.lot;

  const scoreColor =
    comp.matchScore >= 90 ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
    : comp.matchScore >= 80 ? 'text-blue-600 border-blue-200 bg-blue-50'
    : comp.matchScore >= 70 ? 'text-amber-700 border-amber-200 bg-amber-50'
    : 'text-slate-600 border-slate-200 bg-slate-50';

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-3 hover:bg-bg transition-colors text-left"
      >
        <div className="w-14 h-14 rounded-lg bg-bg flex items-center justify-center text-2xl flex-shrink-0">
          {comp.photoEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary truncate">{comp.address.line1}</p>
          <p className="text-xs text-text-muted truncate">
            {comp.beds}BR · {comp.baths}BA · {comp.sqft.toLocaleString()} sqft · {comp.distanceMi.toFixed(1)}mi · {formatDate(comp.soldDate, { short: true })}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xs text-text-muted line-through">{formatCurrency(comp.soldPrice, { compact: true })}</span>
            <span className="text-sm font-extrabold text-text-primary">{formatCurrency(comp.adjustedPrice, { compact: true })}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm ${scoreColor}`}>
            {comp.matchScore}
          </div>
          <ChevronDown
            size={14}
            className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-3 pb-4 pt-1 border-t border-border bg-bg/50 animate-fade-in">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3 mt-2">Adjustments</p>
          <div className="space-y-2 text-xs">
            <AdjRow label="Square footage" value={comp.adjustments.sqft} />
            <AdjRow label="Time of sale" value={comp.adjustments.time} />
            <AdjRow label="Condition" value={comp.adjustments.condition} />
            <AdjRow label="Lot size" value={comp.adjustments.lot} />
            <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
              <span className="font-bold text-text-primary">Total adjustment</span>
              <span className={`font-extrabold ${totalAdj >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {totalAdj >= 0 ? '+' : ''}{formatCurrency(totalAdj)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="text-text-muted">Year built</span>
            <span className="font-semibold text-text-primary">{comp.yearBuilt}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AdjRow({ label, value }: { label: string; value: number }) {
  const sign = value >= 0 ? '+' : '';
  const color = value > 0 ? 'text-emerald-600' : value < 0 ? 'text-red-600' : 'text-text-muted';
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary">{label}</span>
      <span className={`font-semibold ${color}`}>
        {value === 0 ? '—' : `${sign}${formatCurrency(value)}`}
      </span>
    </div>
  );
}
