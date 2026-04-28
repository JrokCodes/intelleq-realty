import { Link, useParams } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bell,
  Plus,
  Send,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import {
  deals,
  listings,
  buyers,
  contacts,
  milestonesByDeal,
  documentsByDeal,
  alerts,
} from '@/data/mockData';
import { formatCurrency, formatDate, relativeDate } from '@/lib/format';
import { stageLabels, documentStatusStyles } from '@/lib/colors';
import StageRail from '@/components/realty/StageRail';
import MilestoneRow from '@/components/realty/MilestoneRow';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/shared/Toast';

export default function DealTimeline() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const deal = deals.find((d) => d.id === id);

  if (!deal) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Deal not found.</p>
        <Link to="/pipeline" className="text-primary text-sm font-bold">← Back to pipeline</Link>
      </div>
    );
  }

  const listing = deal.listingId ? listings.find((l) => l.id === deal.listingId) : null;
  const buyer = deal.buyerId ? buyers.find((b) => b.id === deal.buyerId) : null;
  const buyerContact = buyer ? contacts.find((c) => c.id === buyer.contactId) : null;
  const sellerContact = deal.sellerId ? contacts.find((c) => c.id === deal.sellerId) : null;
  const milestones = milestonesByDeal[deal.id] || [];
  const documents = documentsByDeal[deal.id] || [];
  const dealAlerts = alerts.filter((a) => a.dealId === deal.id);

  const trackStyles =
    deal.onTrack === 'yes' ? { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'On track' }
    : deal.onTrack === 'at_risk' ? { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Clock, label: 'At risk' }
    : { bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle, label: 'Overdue items' };
  const TrackIcon = trackStyles.icon;

  const sideStyles =
    deal.side === 'sell'
      ? { bg: 'bg-primary text-white', label: 'Sell side' }
      : { bg: 'bg-accent-gold text-sidebar', label: 'Buy side' };

  const doneCount = milestones.filter((m) => m.status === 'done').length;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <Link
        to="/pipeline"
        className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-hover mb-4"
      >
        <ArrowLeft size={16} /> Pipeline
      </Link>

      {/* Deal summary */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${sideStyles.bg}`}>
            {sideStyles.label}
          </span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${trackStyles.bg}`}>
            <TrackIcon size={14} />
            {trackStyles.label}
          </div>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-bg flex items-center justify-center flex-shrink-0 text-3xl">
            {listing?.photoEmoji || '👤'}
          </div>
          <div className="flex-1 min-w-0">
            {listing ? (
              <>
                <h1 className="text-lg md:text-xl font-extrabold text-text-primary leading-tight">{listing.address.line1}</h1>
                <p className="text-sm text-text-muted truncate">{listing.address.neighborhood} · {listing.address.city}</p>
              </>
            ) : buyerContact ? (
              <>
                <h1 className="text-lg md:text-xl font-extrabold text-text-primary leading-tight">{buyerContact.firstName} {buyerContact.lastName}</h1>
                <p className="text-sm text-text-muted truncate">Buyer search</p>
              </>
            ) : null}
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary mt-1">{stageLabels[deal.stage]}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <SummaryStat label="Price" value={formatCurrency(deal.price, { compact: true })} />
          <SummaryStat label="Est. comm" value={formatCurrency(deal.commissionEst, { compact: true })} />
          <SummaryStat label="Close" value={relativeDate(deal.expectedCloseDate)} />
        </div>

        {(buyerContact || sellerContact) && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Parties</p>
            {sellerContact && <PartyRow contact={sellerContact} role="Seller" />}
            {buyerContact && <PartyRow contact={buyerContact} role="Buyer" />}
          </div>
        )}

        {deal.notes && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">Notes</p>
            <p className="text-sm text-text-secondary leading-relaxed">{deal.notes}</p>
          </div>
        )}
      </div>

      {/* Stage rail */}
      <StageRail side={deal.side} current={deal.stage} />

      {/* Active alerts */}
      {dealAlerts.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={14} className="text-warning" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Active alerts</span>
          </div>
          <div className="space-y-2">
            {dealAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary">{alert.title}</p>
                  <p className="text-xs text-text-secondary leading-snug mt-0.5">{alert.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-extrabold text-text-primary">Timeline</h2>
          <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">{doneCount} of {milestones.length} done</span>
        </div>
        <div className="space-y-2">
          {milestones.map((m) => (
            <MilestoneRow key={m.id} milestone={m} />
          ))}
        </div>
      </div>

      {/* Documents */}
      {documents.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-text-primary">Documents</h2>
            <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">{documents.length}</span>
          </div>
          <div className="space-y-2">
            {documents.map((doc) => {
              const styles = documentStatusStyles[doc.status];
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-bg flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{doc.name}</p>
                    {doc.signedDate && (
                      <p className="text-[11px] text-text-muted">Signed {formatDate(doc.signedDate, { short: true })}</p>
                    )}
                  </div>
                  <StatusBadge bg={styles.bg} text={styles.text} label={styles.label} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fiduciary footer */}
      <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-emerald-900">Fiduciary duty active</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            All AI recommendations on this deal are constrained by fiduciary duty rules.
            Audit trail recorded for every action.
          </p>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-20">
        <div className="bg-white border border-border rounded-2xl shadow-xl shadow-sidebar/15 p-2 flex items-center gap-1 md:gap-2 max-w-2xl mx-auto">
          <ActionButton
            icon={Plus}
            label="Add milestone"
            onClick={() => toast('Milestone added — assigned to title officer.', 'success')}
          />
          <ActionButton
            icon={Send}
            label="Notify parties"
            onClick={() => toast('Notification sent to buyer + seller via email and SMS.', 'success')}
          />
          <ActionButton
            icon={FileText}
            label="View docs"
            onClick={() => toast('Document drawer opening...', 'info')}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-0.5">{label}</p>
      <p className="text-base font-extrabold text-text-primary">{value}</p>
    </div>
  );
}

function PartyRow({ contact, role }: { contact: { firstName: string; lastName: string; initials: string; phone: string }; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-[11px] font-extrabold flex-shrink-0">
        {contact.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-primary truncate">{contact.firstName} {contact.lastName}</p>
        <p className="text-[11px] text-text-muted">{role} · {contact.phone}</p>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs md:text-sm font-bold text-text-secondary hover:bg-primary hover:text-white transition-colors"
    >
      <Icon size={14} />
      <span className="truncate">{label}</span>
    </button>
  );
}
