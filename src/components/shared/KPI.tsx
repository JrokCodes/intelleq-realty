import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: LucideIcon;
  accent?: 'primary' | 'gold' | 'sidebar';
}

export default function KPI({ label, value, delta, icon: Icon, accent = 'primary' }: Props) {
  const accentMap = {
    primary: 'bg-primary/10 text-primary',
    gold: 'bg-accent-gold/15 text-amber-700',
    sidebar: 'bg-sidebar/10 text-sidebar',
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-2xl font-extrabold text-text-primary mb-1 tracking-tight">{value}</div>
      {delta && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${delta.positive ? 'text-emerald-600' : 'text-red-600'}`}>
          {delta.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta.value}
        </div>
      )}
    </div>
  );
}
