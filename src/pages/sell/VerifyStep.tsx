import { useState } from 'react';
import { ShieldCheck, IdCard, FileText, CheckCircle2, Camera } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import VerificationFlow from '@/components/realty/VerificationFlow';

export default function VerifyStep() {
  const [verified, setVerified] = useState(false);
  const [flowOpen, setFlowOpen] = useState(false);

  return (
    <>
      <WizardLayout
        step={2}
        stepName="Verify"
        aiMessage="Now let's confirm you're the owner. Takes 30 seconds."
        aiHint="We use Plaid Identity to scan your ID, match it to a quick selfie, and cross-check the title record. Same standards as a mortgage application."
        backTo="/sell/address"
        continueTo="/sell/about"
        continueDisabled={!verified}
        continueLabel={verified ? 'Continue' : 'Verify identity first'}
      >
        {/* Privacy callout */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
          <ShieldCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-900">Your data stays encrypted</p>
            <p className="text-xs text-blue-800 leading-snug mt-0.5">
              Bank-grade 256-bit encryption. Used only for this transaction. Deleted after closing.
            </p>
          </div>
        </div>

        {/* Verification cards */}
        <div className="space-y-3 mb-5">
          <VerifyCard
            icon={IdCard}
            title="Government ID"
            subtitle="Driver's license, passport, or state ID"
            status={verified ? 'done' : 'pending'}
            detail={verified ? 'Maya Kahale verified via Plaid' : null}
          />
          <VerifyCard
            icon={Camera}
            title="Face match"
            subtitle="Selfie compared to your ID photo"
            status={verified ? 'done' : 'pending'}
            detail={verified ? 'Match confidence: 98%' : null}
          />
          <VerifyCard
            icon={FileText}
            title="Ownership match"
            subtitle="Cross-checked with Hawaii title records"
            status={verified ? 'done' : 'pending'}
            detail={verified ? '1108 Auahi St #2204 owned by M. Kahale since 2018' : null}
          />
          <VerifyCard
            icon={ShieldCheck}
            title="Title pre-check"
            subtitle="Hawaii Title Co. quick scan"
            status={verified ? 'done' : 'pending'}
            detail={verified ? 'No liens. No encumbrances. Clean title.' : null}
          />
        </div>

        {!verified && (
          <button
            onClick={() => setFlowOpen(true)}
            className="w-full py-4 rounded-xl bg-sidebar text-white font-extrabold text-base hover:bg-sidebar-deep transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sidebar/25"
          >
            <ShieldCheck size={18} />
            Start verification
          </button>
        )}

        {verified && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-extrabold text-emerald-900">Verified — you're good to go</p>
              <p className="text-xs text-emerald-800 leading-snug mt-0.5">
                Reviewed and signed off by Cameron Leopoldino, Lic. RB-22451.
              </p>
            </div>
          </div>
        )}
      </WizardLayout>

      <VerificationFlow
        open={flowOpen}
        onClose={() => setFlowOpen(false)}
        onComplete={() => setVerified(true)}
      />
    </>
  );
}

function VerifyCard({
  icon: Icon,
  title,
  subtitle,
  status,
  detail,
}: {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
  status: 'pending' | 'done';
  detail: string | null;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 transition-all ${
        status === 'done' ? 'border-emerald-200' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-bg text-text-muted'
          }`}
        >
          {status === 'done' ? <CheckCircle2 size={18} /> : <Icon size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary">{title}</p>
          <p className="text-xs text-text-muted">{subtitle}</p>
        </div>
      </div>
      {detail && (
        <p className="mt-3 pt-3 border-t border-border text-xs text-text-secondary leading-snug">
          {detail}
        </p>
      )}
    </div>
  );
}
