import type { Side, AnyStage } from '@/lib/types';
import { stagesForSide, stageLabels } from '@/lib/colors';
import { Check } from 'lucide-react';

export default function StageRail({ side, current }: { side: Side; current: AnyStage }) {
  const stages = stagesForSide(side);
  const currentIdx = stages.indexOf(current);

  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Stage</span>
        <span className="text-xs font-bold text-primary">
          {currentIdx + 1} of {stages.length}
        </span>
      </div>
      <div className="relative">
        <div className="absolute top-3 left-3 right-3 h-0.5 bg-border" />
        <div
          className="absolute top-3 left-3 h-0.5 bg-primary transition-all"
          style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {stages.map((stage, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <div key={stage} className="flex flex-col items-center" style={{ width: `${100 / stages.length}%` }}>
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-extrabold relative z-10 ${
                    isPast
                      ? 'bg-primary border-primary text-white'
                      : isCurrent
                      ? 'bg-white border-primary text-primary'
                      : 'bg-white border-border text-text-muted'
                  }`}
                >
                  {isPast ? <Check size={12} /> : i + 1}
                </div>
                <span
                  className={`mt-2 text-[9px] font-bold uppercase tracking-wider text-center leading-tight ${
                    isCurrent ? 'text-primary' : isPast ? 'text-text-secondary' : 'text-text-muted'
                  }`}
                >
                  {stageLabels[stage]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
