import type { TimelineMilestone } from '@/lib/types';
import { milestoneStatusStyles } from '@/lib/colors';
import { relativeDate, formatDate } from '@/lib/format';
import { Check, Clock, AlertTriangle, AlertCircle, Circle, ShieldAlert } from 'lucide-react';

export default function MilestoneRow({ milestone }: { milestone: TimelineMilestone }) {
  const styles = milestoneStatusStyles[milestone.status];

  const Icon =
    milestone.status === 'done' ? Check
    : milestone.status === 'in_progress' ? Clock
    : milestone.status === 'overdue' ? AlertCircle
    : milestone.status === 'at_risk' ? AlertTriangle
    : Circle;

  const iconBg =
    milestone.status === 'done' ? 'bg-emerald-100 text-emerald-600'
    : milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-600'
    : milestone.status === 'overdue' ? 'bg-red-100 text-red-600'
    : milestone.status === 'at_risk' ? 'bg-amber-100 text-amber-700'
    : 'bg-slate-100 text-slate-400';

  return (
    <div className={`bg-white border border-border rounded-xl p-4 border-l-4 ${styles.ring}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className={`text-sm font-bold ${milestone.status === 'done' ? 'text-text-muted line-through' : 'text-text-primary'}`}>
              {milestone.label}
            </p>
            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text}`}>
              {styles.label}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
            <span>
              {milestone.status === 'done' && milestone.completedDate
                ? `Completed ${formatDate(milestone.completedDate, { short: true })}`
                : `Due ${relativeDate(milestone.dueDate)}`}
            </span>
            <span className="text-text-muted">·</span>
            <span className="capitalize">{milestone.ownerRole}</span>
          </div>
          {milestone.fiduciaryFlag && (
            <div className="mt-2 flex items-start gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <ShieldAlert size={13} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <span className="text-[11px] font-medium text-amber-800 leading-snug">
                Fiduciary: {milestone.fiduciaryFlag}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
