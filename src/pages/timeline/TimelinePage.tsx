import { useLocation, Link } from 'react-router';
import {
  Bell,
  Send,
  FileText,
  ShieldCheck,
  Calendar,
  Trophy,
} from 'lucide-react';
import {
  myListing,
  listings,
  contacts,
  sellTimeline,
  buyTimeline,
  sellDocuments,
  buyDocuments,
  alexOutgoingOffer,
  sellTeam,
  buyTeam,
} from '@/data/mockData';
import { sellPersona, buyPersona } from '@/stores/personaStore';
import { formatCurrency, formatDate, relativeDate } from '@/lib/format';
import { documentStatusStyles } from '@/lib/colors';
import MilestoneRow from '@/components/realty/MilestoneRow';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/shared/Toast';

export default function TimelinePage() {
  const location = useLocation();
  const inSell = location.pathname.startsWith('/sell');
  const { toast } = useToast();

  const persona = inSell ? sellPersona : buyPersona;
  const milestones = inSell ? sellTimeline : buyTimeline;
  const documents = inSell ? sellDocuments : buyDocuments;
  const teamIds = inSell ? sellTeam : buyTeam;
  const team = teamIds.map((id) => contacts.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const subjectListing = inSell ? myListing : listings.find((l) => l.id === alexOutgoingOffer.listingId);
  const dealPrice = inSell ? myListing.listPrice : alexOutgoingOffer.offerPrice;

  const doneCount = milestones.filter((m) => m.status === 'done').length;
  const closeMilestone = milestones[milestones.length - 1]!;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-3xl p-5 md:p-7 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/15 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 mb-2">
            {inSell ? 'Selling' : 'Buying'}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Closing in {relativeDate(closeMilestone.dueDate).toLowerCase()}
          </h1>
          {subjectListing && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl flex-shrink-0">
                {subjectListing.photoEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-white truncate">{subjectListing.address.line1}</p>
                <p className="text-[11px] text-white/60 truncate">{subjectListing.address.neighborhood}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-extrabold text-accent-gold">{formatCurrency(dealPrice, { compact: true })}</p>
                <p className="text-[10px] text-white/50">{inSell ? 'List price' : 'Your offer'}</p>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-white/60 font-bold uppercase tracking-wider">Progress</span>
              <span className="text-white font-bold">{doneCount} of {milestones.length}</span>
            </div>
            <div className="h-2 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-gold to-primary"
                style={{ width: `${(doneCount / milestones.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <Bell size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-amber-900">
            {inSell ? 'You have 2 offers waiting for review' : 'Awaiting seller response'}
          </p>
          <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
            {inSell
              ? 'AI recommends accepting the cash offer at $945k OR countering Jordan W.\'s offer at $988k.'
              : 'Your offer was sent yesterday. Most sellers respond within 48 hours. AI is monitoring.'}
          </p>
        </div>
      </div>

      {/* Milestones */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-extrabold text-text-primary flex items-center gap-2">
            <Calendar size={16} className="text-primary" /> Timeline
          </h2>
          <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">
            Closing {formatDate(closeMilestone.dueDate, { short: true })}
          </span>
        </div>
        <div className="space-y-2">
          {milestones.map((m) => (
            <MilestoneRow key={m.id} milestone={m} />
          ))}
        </div>
      </section>

      {/* Closing celebration card */}
      <div className="bg-gradient-to-br from-accent-gold/30 via-primary/10 to-accent-gold/15 border border-accent-gold/40 rounded-2xl p-5 mb-5 flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-accent-gold flex items-center justify-center flex-shrink-0">
          <Trophy size={20} className="text-sidebar" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-text-primary">
            {inSell ? '🎉 Estimated closing day' : '🎉 Move-in day'}: {formatDate(closeMilestone.dueDate)}
          </p>
          <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
            {inSell
              ? `Net proceeds estimate: ~${formatCurrency(Math.round(dealPrice * 0.92), { compact: true })} after partner fees, escrow, and HOA.`
              : `Closing costs estimate: ~${formatCurrency(Math.round(dealPrice * 0.025), { compact: true })}. Bring your moving crew.`}
          </p>
        </div>
      </div>

      {/* Documents */}
      {documents.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-extrabold text-text-primary flex items-center gap-2">
              <FileText size={16} className="text-primary" /> Documents
            </h2>
            <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">{documents.length}</span>
          </div>
          <div className="bg-white rounded-2xl border border-border divide-y divide-border">
            {documents.map((doc) => {
              const styles = documentStatusStyles[doc.status];
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 md:p-4">
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
        </section>
      )}

      {/* Your team */}
      <section className="mb-5">
        <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary" /> Your team
        </h2>
        <div className="bg-white rounded-2xl border border-border divide-y divide-border">
          {team.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 md:p-4">
              <div className="w-10 h-10 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">{c.firstName} {c.lastName}</p>
                {c.company && <p className="text-[11px] text-text-muted truncate">{c.company}</p>}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted capitalize flex-shrink-0">
                {c.role === 'inspector' && c.id === 'c-306' ? 'Partner Agent' : c.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Action bar */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => toast(`Notification sent to all parties.`, 'success')}
          className="py-3 px-4 rounded-xl bg-white border border-border text-sm font-bold text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} /> Notify team
        </button>
        <Link
          to={inSell ? '/sell/marketing' : '/buy/feed'}
          className="py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
        >
          {inSell ? 'Review offers' : 'Browse more'}
        </Link>
      </div>

      <p className="text-[10px] text-text-muted/70 text-center mt-5">
        Persona: {persona.firstName} {persona.lastName} · Demo data
      </p>
    </div>
  );
}
