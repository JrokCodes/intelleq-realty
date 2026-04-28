import { formatCurrency } from '@/lib/format';
import { Sparkles } from 'lucide-react';

interface Props {
  low: number;
  high: number;
  confidence: number;
  caption: string;
}

export default function PriceBand({ low, high, confidence, caption }: Props) {
  const mid = Math.round((low + high) / 2);
  const confidenceLabel = confidence >= 0.85 ? 'High' : confidence >= 0.7 ? 'Medium' : 'Low';
  const confidenceBg = confidence >= 0.85 ? 'bg-emerald-500' : confidence >= 0.7 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="bg-gradient-to-br from-sidebar to-[#1c3540] text-white rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl translate-y-8 -translate-x-8" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-accent-gold/20 flex items-center justify-center">
            <Sparkles size={14} className="text-accent-gold" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">AI Price Recommendation</span>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl md:text-4xl font-extrabold tracking-tight">{formatCurrency(low, { compact: true })}</span>
          <span className="text-xl text-white/50">–</span>
          <span className="text-3xl md:text-4xl font-extrabold tracking-tight">{formatCurrency(high, { compact: true })}</span>
        </div>
        <div className="text-sm text-white/60 mb-5">
          Midpoint <span className="text-white font-semibold">{formatCurrency(mid)}</span>
        </div>

        {/* Confidence bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">Confidence</span>
            <span className="text-xs font-bold text-white">
              {confidenceLabel} · {(confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${confidenceBg}`}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-white/70 leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}
