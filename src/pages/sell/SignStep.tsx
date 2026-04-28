import { useState } from 'react';
import { FileText, CheckCircle2, ShieldCheck, Pen, Loader2 } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import { myListing } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

const documents = [
  { name: 'Listing Agreement', desc: '1% flat platform fee · 90-day exclusive', required: true },
  { name: 'Seller Property Disclosure', desc: "What you're disclosing about the home", required: true },
  { name: 'Lead-Based Paint Disclosure', desc: 'Federal requirement (pre-1978 buildings)', required: false },
  { name: 'Agency Acknowledgement', desc: 'Confirms Cameron Leopoldino as your partner agent', required: true },
];

export default function SignStep() {
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);
  const [signing, setSigning] = useState(false);

  const handleSign = () => {
    setSigning(true);
    setTimeout(() => {
      setSigning(false);
      setSigned(true);
    }, 1500);
  };

  return (
    <WizardLayout
      step={8}
      stepName="Sign"
      aiMessage="One signature and we go live everywhere."
      aiHint="MLS, Zillow, Realtor.com, our buyer network — all activated within 30 minutes of signing."
      backTo="/sell/preview"
      continueTo={signed ? '/sell/live' : undefined}
      continueDisabled={!signed}
      continueLabel={signed ? 'See your listing go live' : 'Sign first to continue'}
    >
      {/* Summary */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">You're agreeing to</p>
        <div className="space-y-2">
          <Row label="Property" value={myListing.address.line1} />
          <Row label="List price" value={formatCurrency(myListing.listPrice)} />
          <Row label="Listing term" value="90 days · exclusive" />
          <Row label="Platform fee" value="1% of sale price" />
          <Row label="Partner agent fee" value="$4,500 flat" />
          <Row label="Total at close (est.)" value={formatCurrency(Math.round(myListing.listPrice * 0.01) + 4500)} bold />
        </div>
      </div>

      {/* Documents to sign */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-text-primary">Documents</p>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{documents.length} included</span>
        </div>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.name} className="flex items-start gap-3 p-3 rounded-xl border border-border">
              <div className="w-9 h-9 rounded-lg bg-bg flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary">{doc.name}</p>
                <p className="text-[11px] text-text-muted leading-snug">{doc.desc}</p>
              </div>
              {signed && <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Agreement checkbox */}
      {!signed && (
        <label className="flex items-start gap-3 p-4 bg-white border border-border rounded-2xl cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-primary flex-shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-text-primary">I've reviewed all documents</p>
            <p className="text-[11px] text-text-secondary leading-snug mt-0.5">
              I authorize IntelleQ Realty and Cameron Leopoldino to list my property at the agreed terms.
              I understand this is binding for the listing term.
            </p>
          </div>
        </label>
      )}

      {/* Sign button */}
      {!signed && (
        <button
          onClick={handleSign}
          disabled={!agreed || signing}
          className="w-full py-4 rounded-xl bg-sidebar text-white font-extrabold text-base hover:bg-sidebar-deep transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {signing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Recording your signature...
            </>
          ) : (
            <>
              <Pen size={18} />
              Sign with one tap
            </>
          )}
        </button>
      )}

      {signed && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3 mb-4 animate-fade-in">
          <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-base font-extrabold text-emerald-900">Signed and recorded ✓</p>
            <p className="text-xs text-emerald-800 leading-snug mt-1">
              Cameron Leopoldino countersigned at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}.
              Cleared by partner agent · documents stored in your dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Trust */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-900">Backed by Hawaii Realtor Code 467-13</p>
          <p className="text-xs text-blue-800 leading-snug mt-0.5">
            Same legal protections as a traditional agent. Cancel anytime in the first 7 days, no questions asked.
          </p>
        </div>
      </div>
    </WizardLayout>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 text-sm ${bold ? 'pt-3 border-t border-border' : ''}`}>
      <span className={bold ? 'font-bold text-text-primary' : 'text-text-secondary'}>{label}</span>
      <span className={`${bold ? 'text-base font-extrabold text-text-primary' : 'font-bold text-text-primary'}`}>{value}</span>
    </div>
  );
}
