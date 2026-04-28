import { FileText, Mail, ShieldCheck, FileSignature, Sparkles, Megaphone } from 'lucide-react';

interface Tool {
  icon: typeof FileText;
  title: string;
  description: string;
  count?: string;
  badge?: 'Phase 1' | 'Phase 2' | 'Phase 3';
}

const formsLibrary: Tool[] = [
  { icon: FileSignature, title: 'Listing agreement', description: 'Auto-fill from intake. Hawaii-state compliant.', count: '12 templates', badge: 'Phase 1' },
  { icon: FileSignature, title: 'Buyer representation', description: 'Exclusive right to buy with referral terms.', count: '4 templates', badge: 'Phase 1' },
  { icon: FileText, title: 'Seller property disclosure', description: 'AI-prefilled from intake answers.', count: '1 form', badge: 'Phase 1' },
  { icon: FileText, title: 'Lead-based paint disclosure', description: 'Required for pre-1978 properties.', count: '1 form', badge: 'Phase 1' },
  { icon: FileSignature, title: 'Purchase contract', description: 'AI-generated offer from buyer terms.', count: '3 templates', badge: 'Phase 2' },
  { icon: FileText, title: 'Inspection response addendum', description: 'Generates from inspection report.', count: '2 templates', badge: 'Phase 2' },
];

const dripTemplates: Tool[] = [
  { icon: Mail, title: 'New listing match', description: '"This just hit the market — fits your criteria"', count: '4.2k sent · 18% open', badge: 'Phase 1' },
  { icon: Mail, title: 'Price reduction alert', description: 'Saved listing dropped in price', count: '380 sent · 31% open', badge: 'Phase 1' },
  { icon: Mail, title: 'Pre-approval check-in', description: 'Approval renewal reminder', count: '52 sent · 24% open', badge: 'Phase 1' },
  { icon: Megaphone, title: 'Open house announcement', description: 'Auto-posted to social + drip', count: '6 active', badge: 'Phase 1' },
];

const fiduciaryChecks: { label: string; description: string }[] = [
  { label: 'Disclosure required', description: 'Triggered when material defect detected in inspection report.' },
  { label: 'Conflict of interest', description: 'Flags when agent represents both sides of a transaction.' },
  { label: 'Price reduction discussion', description: 'Mandatory check-in when DOM exceeds threshold.' },
  { label: 'Multiple offer disclosure', description: 'Required notification to all buyers in multi-offer scenarios.' },
  { label: 'Counter-offer safety', description: 'Verifies counter remains within buyer pre-approval cap.' },
  { label: 'Earnest money handling', description: 'Verifies funds routed only to licensed escrow.' },
];

export default function ToolsPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Tools</h1>
        <p className="text-sm text-text-muted">Forms library, drip templates, and fiduciary safeguards</p>
      </div>

      {/* Forms */}
      <Section icon={FileText} title="Forms & contracts" subtitle={`${formsLibrary.length} ready · auto-fills from deal context`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formsLibrary.map((t) => (
            <ToolCard key={t.title} tool={t} />
          ))}
        </div>
      </Section>

      {/* Drip templates */}
      <Section icon={Mail} title="Drip templates" subtitle={`${dripTemplates.length} campaigns · auto-personalized`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dripTemplates.map((t) => (
            <ToolCard key={t.title} tool={t} />
          ))}
        </div>
      </Section>

      {/* Fiduciary checklist */}
      <Section icon={ShieldCheck} title="Fiduciary safeguards" subtitle="System-level rules embedded in every AI decision">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-3">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-extrabold text-emerald-900 mb-1">Always acts in client's best interest</p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Every AI recommendation passes through {fiduciaryChecks.length} fiduciary checks before reaching you.
                Full audit trail preserved per transaction.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {fiduciaryChecks.map((c) => (
            <div key={c.label} className="bg-white rounded-xl border border-border p-3 flex items-start gap-2.5">
              <Sparkles size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-text-primary">{c.label}</p>
                <p className="text-[11px] text-text-secondary leading-snug">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof FileText;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-text-primary">{title}</h2>
          <p className="text-xs text-text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const phaseStyles =
    tool.badge === 'Phase 1' ? 'bg-emerald-100 text-emerald-700'
    : tool.badge === 'Phase 2' ? 'bg-blue-100 text-blue-700'
    : 'bg-amber-100 text-amber-700';

  return (
    <div className="bg-white rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-bg flex items-center justify-center text-text-secondary flex-shrink-0">
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-text-primary leading-tight">{tool.title}</p>
            {tool.badge && (
              <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${phaseStyles}`}>
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-text-secondary leading-snug mt-1">{tool.description}</p>
          {tool.count && <p className="text-[10px] text-text-muted mt-1.5 font-bold uppercase tracking-wider">{tool.count}</p>}
        </div>
      </div>
    </div>
  );
}
