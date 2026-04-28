import { useState, useEffect } from 'react';
import {
  ArrowRight,
  X,
  CheckCircle2,
  IdCard,
  Globe,
  ShieldCheck,
  Camera,
  Loader2,
  ChevronLeft,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

type SubStep =
  | 'intro'
  | 'pick-id'
  | 'permission'
  | 'front'
  | 'back'
  | 'selfie-intro'
  | 'selfie'
  | 'verifying'
  | 'success';

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ID_OPTIONS = [
  { id: 'license', label: "Driver's license", icon: IdCard, common: true },
  { id: 'state', label: 'State ID', icon: IdCard },
  { id: 'passport', label: 'Passport', icon: Globe },
];

export default function VerificationFlow({ open, onClose, onComplete }: Props) {
  const [step, setStep] = useState<SubStep>('intro');
  const [idType, setIdType] = useState('license');
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [backCaptured, setBackCaptured] = useState(false);
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [verifyStage, setVerifyStage] = useState(0);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep('intro');
      setIdType('license');
      setFrontCaptured(false);
      setBackCaptured(false);
      setSelfieCaptured(false);
      setVerifyStage(0);
    }
  }, [open]);

  // Verifying step animation
  useEffect(() => {
    if (step !== 'verifying') return;
    const stages = [800, 1300, 1100];
    let current = 0;
    const tick = () => {
      current += 1;
      setVerifyStage(current);
      if (current < stages.length) {
        setTimeout(tick, stages[current]);
      } else {
        setTimeout(() => setStep('success'), 600);
      }
    };
    setTimeout(tick, stages[0]);
  }, [step]);

  if (!open) return null;

  const idLabel = ID_OPTIONS.find((o) => o.id === idType)?.label || "Driver's license";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center md:justify-center backdrop-blur-sm animate-fade-in">
      <div className="relative w-full md:max-w-md h-[92vh] md:h-[680px] bg-white md:rounded-[28px] rounded-t-[28px] overflow-hidden flex flex-col shadow-2xl animate-slide-up">
        {step === 'intro' && (
          <IntroStep onContinue={() => setStep('pick-id')} onClose={onClose} />
        )}
        {step === 'pick-id' && (
          <PickIdStep
            value={idType}
            onChange={setIdType}
            onContinue={() => setStep('permission')}
            onBack={() => setStep('intro')}
            onClose={onClose}
          />
        )}
        {step === 'permission' && (
          <PermissionPromptStep
            onAllow={() => setStep('front')}
            onDeny={() => setStep('intro')}
            onClose={onClose}
            idLabel={idLabel}
          />
        )}
        {step === 'front' && (
          <CaptureIdStep
            side="front"
            idLabel={idLabel}
            captured={frontCaptured}
            onCapture={() => setFrontCaptured(true)}
            onRetake={() => setFrontCaptured(false)}
            onContinue={() => setStep('back')}
            onClose={onClose}
          />
        )}
        {step === 'back' && (
          <CaptureIdStep
            side="back"
            idLabel={idLabel}
            captured={backCaptured}
            onCapture={() => setBackCaptured(true)}
            onRetake={() => setBackCaptured(false)}
            onContinue={() => setStep('selfie-intro')}
            onBack={() => setStep('front')}
            onClose={onClose}
          />
        )}
        {step === 'selfie-intro' && (
          <SelfieIntroStep onContinue={() => setStep('selfie')} onClose={onClose} />
        )}
        {step === 'selfie' && (
          <SelfieCaptureStep
            captured={selfieCaptured}
            onCapture={() => setSelfieCaptured(true)}
            onContinue={() => setStep('verifying')}
            onClose={onClose}
          />
        )}
        {step === 'verifying' && <VerifyingStep stage={verifyStage} />}
        {step === 'success' && (
          <SuccessStep
            onContinue={() => {
              onComplete();
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Sub-step components
// =============================================================================

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg flex items-center justify-center text-text-secondary hover:text-text-primary z-10"
      aria-label="Close"
    >
      <X size={18} />
    </button>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="absolute top-4 left-4 w-9 h-9 rounded-full bg-bg flex items-center justify-center text-text-secondary hover:text-text-primary z-10"
      aria-label="Back"
    >
      <ChevronLeft size={20} />
    </button>
  );
}

function IntroStep({ onContinue, onClose }: { onContinue: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full p-6 relative">
      <CloseButton onClose={onClose} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-sidebar flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
          <ShieldCheck size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Verify your identity</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-8">
          We use bank-grade verification to confirm it's really you. Takes 30 seconds.
        </p>

        <div className="w-full space-y-2.5 mb-6">
          <Bullet icon={IdCard} text="Government ID — front and back" />
          <Bullet icon={Camera} text="A quick selfie to match your face" />
          <Bullet icon={ShieldCheck} text="Cross-checked with title records" />
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-base hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
      >
        Get started <ArrowRight size={18} />
      </button>
      <p className="text-center text-[10px] text-text-muted mt-3 flex items-center justify-center gap-1.5">
        <Sparkles size={10} className="text-text-muted" />
        Powered by Plaid Identity · 256-bit encryption
      </p>
    </div>
  );
}

function Bullet({ icon: Icon, text }: { icon: typeof IdCard; text: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg">
      <div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
        <Icon size={16} />
      </div>
      <p className="text-sm font-medium text-text-primary">{text}</p>
    </div>
  );
}

function PickIdStep({
  value,
  onChange,
  onContinue,
  onBack,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onContinue: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col h-full p-6 relative">
      <BackButton onBack={onBack} />
      <CloseButton onClose={onClose} />
      <div className="pt-12 pb-2">
        <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Choose your ID</h2>
        <p className="text-sm text-text-secondary mb-6">Pick the one you have handy.</p>
      </div>

      <div className="flex-1 space-y-2.5">
        {ID_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                active ? 'border-primary bg-primary-soft' : 'border-border bg-white hover:border-primary/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  active ? 'bg-primary text-white' : 'bg-bg text-text-secondary'
                }`}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-extrabold text-text-primary">{opt.label}</p>
                {opt.common && <p className="text-[11px] text-text-muted">Most common</p>}
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  active ? 'border-primary bg-primary' : 'border-border'
                }`}
              >
                {active && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-base hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 mt-6"
      >
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

function PermissionPromptStep({
  onAllow,
  onDeny,
  onClose,
  idLabel,
}: {
  onAllow: () => void;
  onDeny: () => void;
  onClose: () => void;
  idLabel: string;
}) {
  return (
    <div className="flex flex-col h-full p-6 relative bg-bg">
      <CloseButton onClose={onClose} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mb-5 relative">
          <Camera size={28} />
          <div className="absolute inset-0 rounded-3xl border-2 border-primary animate-pulse-ring" />
        </div>
        <p className="text-sm text-text-secondary max-w-[260px] leading-relaxed">
          Tap "Allow" when your phone asks for camera access.
        </p>
      </div>

      {/* iOS-style native permission alert */}
      <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center px-8 animate-fade-in">
        <div
          className="bg-[#F2F2F7] rounded-2xl w-full max-w-[280px] overflow-hidden"
          style={{ boxShadow: '0 12px 60px rgba(0,0,0,0.25)' }}
        >
          <div className="px-5 pt-5 pb-4 text-center">
            <p className="text-[15px] font-semibold text-black leading-snug">
              "IntelleQ Realty" Would Like to Access the Camera
            </p>
            <p className="text-[13px] text-black/60 mt-2 leading-snug">
              Used to scan your {idLabel.toLowerCase()} for identity verification.
            </p>
          </div>
          <div className="border-t border-black/[0.12] grid grid-cols-2 divide-x divide-black/[0.12]">
            <button
              onClick={onDeny}
              className="py-3 text-[#007AFF] text-[15px] font-normal active:bg-black/5"
            >
              Don't Allow
            </button>
            <button
              onClick={onAllow}
              className="py-3 text-[#007AFF] text-[15px] font-bold active:bg-black/5"
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaptureIdStep({
  side,
  idLabel,
  captured,
  onCapture,
  onRetake,
  onContinue,
  onBack,
  onClose,
}: {
  side: 'front' | 'back';
  idLabel: string;
  captured: boolean;
  onCapture: () => void;
  onRetake: () => void;
  onContinue: () => void;
  onBack?: () => void;
  onClose: () => void;
}) {
  const [flashing, setFlashing] = useState(false);

  const handleCapture = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      onCapture();
    }, 400);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {flashing && <div className="absolute inset-0 z-30 animate-flash bg-white pointer-events-none" />}

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 relative z-10">
        {onBack && !captured ? (
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <p className="text-sm font-bold capitalize">{side} of {idLabel.toLowerCase()}</p>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="aspect-[1.6/1] w-full max-w-sm relative">
          {!captured ? (
            <>
              {/* Corner brackets */}
              <Corner position="tl" />
              <Corner position="tr" />
              <Corner position="bl" />
              <Corner position="br" />
              {/* ID placeholder background */}
              <div className="absolute inset-3 rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 opacity-50" />
              {/* Scanning line */}
              <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-scan" />
            </>
          ) : (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300 border-4 border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/30 relative">
              <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-600/80" />
                <div className="flex-1">
                  <div className="h-1.5 w-20 rounded bg-blue-600/40 mb-1" />
                  <div className="h-1 w-16 rounded bg-blue-600/30" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <div className="h-1.5 rounded bg-blue-600/30 w-3/4" />
                <div className="h-1.5 rounded bg-blue-600/30 w-1/2" />
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: instructions + capture */}
      <div className="px-5 pt-3 pb-8" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)' }}>
        <p className="text-center text-sm text-white/70 mb-5 min-h-[40px]">
          {captured
            ? 'Looks great — clear and readable.'
            : `Position the ${side} of your ${idLabel.toLowerCase()} inside the frame.`}
        </p>
        {!captured ? (
          <div className="flex justify-center">
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white p-1.5 active:scale-95 transition-transform"
              aria-label="Capture"
            >
              <div className="w-full h-full rounded-full border-4 border-black/80" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRetake}
              className="py-3.5 rounded-xl bg-white/10 text-white font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Retake
            </button>
            <button
              onClick={onContinue}
              className="py-3.5 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2"
            >
              Use photo <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Corner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const cls = {
    tl: 'top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
    tr: 'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
    bl: 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
    br: 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl',
  }[position];
  return <div className={`absolute w-10 h-10 border-emerald-400 ${cls}`} />;
}

function SelfieIntroStep({ onContinue, onClose }: { onContinue: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full p-6 relative">
      <CloseButton onClose={onClose} />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-sidebar flex items-center justify-center mb-6 shadow-xl shadow-primary/30 relative">
          <Camera size={36} className="text-white" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
            <CheckCircle2 size={14} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Now a quick selfie</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
          Just hold your phone in front of your face. We'll match it to your ID — same as airport security.
        </p>
        <div className="w-full space-y-2 mb-6">
          <SelfieTip text="Look straight at the camera" />
          <SelfieTip text="Make sure your face is well-lit" />
          <SelfieTip text="No glasses or hats" />
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-base hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
      >
        Take selfie <Camera size={18} />
      </button>
    </div>
  );
}

function SelfieTip({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-bg">
      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
      <p className="text-sm text-text-secondary">{text}</p>
    </div>
  );
}

function SelfieCaptureStep({
  captured,
  onCapture,
  onContinue,
  onClose,
}: {
  captured: boolean;
  onCapture: () => void;
  onContinue: () => void;
  onClose: () => void;
}) {
  const [flashing, setFlashing] = useState(false);

  const handleCapture = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      onCapture();
    }, 400);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {flashing && <div className="absolute inset-0 z-30 animate-flash bg-white pointer-events-none" />}

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 relative z-10">
        <div className="w-9" />
        <p className="text-sm font-bold">Selfie verification</p>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      {/* Face circle viewfinder */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="aspect-square w-full max-w-[280px] relative">
          {!captured ? (
            <>
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/80 animate-pulse-ring" />
              {/* Main face circle */}
              <div className="absolute inset-3 rounded-full border-[3px] border-emerald-400" />
              {/* Inner overlay */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-40 flex items-center justify-center">
                <div className="text-6xl opacity-30">🙂</div>
              </div>
              {/* Status pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-extrabold whitespace-nowrap">
                Face detected ✓
              </div>
            </>
          ) : (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
              <div className="text-7xl">😊</div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-emerald-500 border-4 border-black flex items-center justify-center">
                <CheckCircle2 size={20} className="text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-5 pt-3 pb-8" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)' }}>
        <p className="text-center text-sm text-white/70 mb-5 min-h-[40px]">
          {captured ? 'Got it — face matched.' : 'Position your face in the circle. Hold still.'}
        </p>
        {!captured ? (
          <div className="flex justify-center">
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white p-1.5 active:scale-95 transition-transform"
              aria-label="Capture"
            >
              <div className="w-full h-full rounded-full border-4 border-black/80" />
            </button>
          </div>
        ) : (
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-xl bg-primary text-white font-extrabold flex items-center justify-center gap-2"
          >
            Verify <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function VerifyingStep({ stage }: { stage: number }) {
  const stages = [
    { label: 'Checking ID authenticity', sub: 'Scanning security features' },
    { label: 'Matching your face', sub: 'Comparing selfie to ID photo' },
    { label: 'Cross-checking ownership', sub: 'Hawaii title records · clear' },
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-bg">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary text-white flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
          <Loader2 size={36} className="animate-spin" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Verifying...</h2>
        <p className="text-sm text-text-secondary mb-8">This usually takes about 5 seconds.</p>

        <div className="w-full space-y-2.5">
          {stages.map((s, i) => {
            const done = i < stage;
            const inProgress = i === stage;
            const pending = i > stage;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  done
                    ? 'bg-emerald-50 border-emerald-200'
                    : inProgress
                    ? 'bg-primary-soft border-primary/40'
                    : 'bg-white border-border opacity-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-emerald-500 text-white'
                    : inProgress ? 'bg-primary text-white'
                    : 'bg-bg text-text-muted'
                  }`}
                >
                  {done ? <CheckCircle2 size={16} /> : inProgress ? <Loader2 size={16} className="animate-spin" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm font-bold ${pending ? 'text-text-muted' : 'text-text-primary'}`}>{s.label}</p>
                  <p className={`text-[11px] ${pending ? 'text-text-muted' : 'text-text-secondary'}`}>{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SuccessStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-b from-bg to-emerald-50">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-pulse-ring" />
        </div>
        <h2 className="text-3xl font-extrabold text-text-primary mb-2 tracking-tight">You're verified ✓</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
          Identity confirmed. Title clear. Cleared by Cameron Leopoldino, Lic. RB-22451.
        </p>

        <div className="w-full bg-white rounded-2xl border border-border p-4 mb-2">
          <Row label="Identity" value="Maya Kahale" />
          <Row label="Property" value="1108 Auahi St #2204" />
          <Row label="Title status" value="Clear · no liens" />
          <Row label="Verified at" value={new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} />
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold text-base hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
      >
        Continue to next step <ArrowRight size={18} />
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold text-text-primary truncate max-w-[60%] text-right">{value}</span>
    </div>
  );
}
