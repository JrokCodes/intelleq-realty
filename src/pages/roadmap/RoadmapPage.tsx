import { CheckCircle2, Sparkles, Smartphone, Globe, ArrowRight, ShieldCheck, Database, FileSignature, Bell, Users } from 'lucide-react';

interface Phase {
  num: 1 | 2 | 3 | 4;
  title: string;
  tagline: string;
  status: 'live' | 'next' | 'later';
  icon: typeof Sparkles;
  bullets: { icon: typeof Sparkles; label: string; description: string }[];
}

const phases: Phase[] = [
  {
    num: 1,
    title: 'Realtor Assistant',
    tagline: "What you're looking at right now",
    status: 'live',
    icon: Sparkles,
    bullets: [
      { icon: Sparkles, label: 'AI CMA engine', description: 'Sub-minute comp pulls with adjustments and confidence band.' },
      { icon: FileSignature, label: 'Form auto-fill', description: 'Listing, buyer rep, disclosures pre-filled from intake.' },
      { icon: Bell, label: 'Drip + alerts', description: 'Buyer drip campaigns, deal-timeline alerts, hot comp notifications.' },
      { icon: Users, label: 'Pipeline view', description: 'All deals, buyers, listings, and contacts in one mobile-first view.' },
    ],
  },
  {
    num: 2,
    title: 'Transaction Engine',
    tagline: 'AI drives the deal forward',
    status: 'next',
    icon: ShieldCheck,
    bullets: [
      { icon: ShieldCheck, label: 'Seller verification', description: 'Identity checks, legal compliance, title-report ordering.' },
      { icon: FileSignature, label: 'E-signature integration', description: 'DocuSign / Dropbox Sign with automatic tracking.' },
      { icon: Database, label: 'Title + escrow coordination', description: 'AI opens escrow, tracks docs, and routes funds.' },
      { icon: Bell, label: 'Timeline engine', description: 'Auto-generated deal timelines with milestone alerts to all parties.' },
    ],
  },
  {
    num: 3,
    title: 'Consumer App',
    tagline: 'Buy and sell from your phone',
    status: 'later',
    icon: Smartphone,
    bullets: [
      { icon: Smartphone, label: 'Seller flow', description: 'Onboard → verify → intake → photos → AI pricing → marketing → close.' },
      { icon: Smartphone, label: 'Buyer flow', description: 'Pre-approval → drip → search → offer → escrow → close.' },
      { icon: Users, label: 'Contractor marketplace', description: 'Photographers, inspectors, lenders organized by area.' },
      { icon: ShieldCheck, label: 'Realtor partnership option', description: 'Licensed agent reviews and signs off for liability.' },
    ],
  },
  {
    num: 4,
    title: 'Scale',
    tagline: 'Multi-state, then international',
    status: 'later',
    icon: Globe,
    bullets: [
      { icon: Globe, label: 'Multi-state expansion', description: 'State-specific forms and regulations.' },
      { icon: Database, label: 'Proprietary data', description: 'Built from completed transactions on the platform.' },
      { icon: Globe, label: '"Buy a house anywhere"', description: 'International expansion.' },
      { icon: Sparkles, label: 'Add-ons', description: 'Investment property analysis, rental management.' },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-24">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-accent-gold/20 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-3">
          The plan
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight mb-2">
          From realtor assistant to AI-only transactions.
        </h1>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Four phases. Build proprietary data and credibility before going consumer-direct.
          Reduce risk, prove the technology, then scale.
        </p>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => (
          <PhaseCard key={phase.num} phase={phase} />
        ))}
      </div>

      <div className="mt-8 bg-white border border-border rounded-2xl p-5">
        <h2 className="text-base font-extrabold text-text-primary mb-3">Immediate next steps</h2>
        <ol className="space-y-2 text-sm text-text-secondary list-decimal pl-5">
          <li>Continue recording video walkthroughs of daily realtor tasks (sell + buy).</li>
          <li>Send over actual forms used in real deals — listing, buyer rep, disclosures.</li>
          <li>Research MLS API access (IDX/RETS feed providers, brokerage partnerships).</li>
          <li>Map state licensing + fiduciary requirements for Hawaii first.</li>
          <li>Pick MLS partner and begin the assistant MVP build.</li>
        </ol>
      </div>
    </div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const Icon = phase.icon;

  const statusStyles =
    phase.status === 'live' ? { ring: 'ring-2 ring-primary', label: 'Live demo', labelBg: 'bg-primary text-white' }
    : phase.status === 'next' ? { ring: 'ring-1 ring-accent-gold', label: 'Up next', labelBg: 'bg-accent-gold text-sidebar' }
    : { ring: 'ring-1 ring-border', label: 'Later', labelBg: 'bg-bg text-text-secondary border border-border' };

  return (
    <div className={`bg-white rounded-2xl ${statusStyles.ring} p-5 relative`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0 ${
          phase.status === 'live' ? 'bg-primary' : phase.status === 'next' ? 'bg-sidebar' : 'bg-text-muted'
        }`}>
          {phase.num}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-lg font-extrabold text-text-primary">{phase.title}</h2>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles.labelBg}`}>
              {statusStyles.label}
            </span>
          </div>
          <p className="text-sm text-text-secondary">{phase.tagline}</p>
        </div>
        <Icon size={22} className={`flex-shrink-0 ${phase.status === 'live' ? 'text-primary' : 'text-text-muted'}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {phase.bullets.map((b) => {
          const BIcon = b.icon;
          return (
            <div key={b.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-bg border border-border">
              {phase.status === 'live' ? (
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <BIcon size={14} className="text-text-muted flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-xs font-bold text-text-primary leading-tight">{b.label}</p>
                <p className="text-[11px] text-text-secondary leading-snug mt-0.5">{b.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {phase.status === 'live' && (
        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">
          <ArrowRight size={12} /> Tap any nav item to explore
        </div>
      )}
    </div>
  );
}
