import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, Bot, Sparkles } from 'lucide-react';

const TOTAL_STEPS = 8;

interface Props {
  step: number; // 1-indexed (1..TOTAL_STEPS)
  stepName: string;
  aiMessage: string;
  aiHint?: string;
  children: React.ReactNode;
  backTo?: string;
  continueTo?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
  onContinue?: () => void;
}

export default function WizardLayout({
  step,
  stepName,
  aiMessage,
  aiHint,
  children,
  backTo,
  continueTo,
  continueLabel = 'Continue',
  continueDisabled = false,
  onContinue,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Progress + step header */}
      <div className="px-4 md:px-6 pt-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {backTo ? (
              <Link
                to={backTo}
                className="flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-primary"
              >
                <ChevronLeft size={14} /> Back
              </Link>
            ) : (
              <span />
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Step {step} of {TOTAL_STEPS} · {stepName}
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
              const isPast = i < step - 1;
              const isCurrent = i === step - 1;
              return (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    isCurrent ? 'bg-primary' : isPast ? 'bg-primary/60' : 'bg-border'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* AI assistant message */}
      <div className="px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sidebar flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <Bot size={18} className="text-accent-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Your AI agent</span>
                <Sparkles size={11} className="text-accent-gold" />
              </div>
              <p className="text-base md:text-lg font-bold text-text-primary leading-snug">{aiMessage}</p>
              {aiHint && <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{aiHint}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-6 pb-32">
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>

      {/* Sticky bottom Continue button */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border px-4 py-3 md:py-4"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
      >
        <div className="max-w-2xl mx-auto">
          {continueTo ? (
            <Link
              to={continueDisabled ? '#' : continueTo}
              className={`block w-full py-4 rounded-xl text-base font-extrabold text-center transition-all flex items-center justify-center gap-2 ${
                continueDisabled
                  ? 'bg-border text-text-muted cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl active:scale-[0.99]'
              }`}
            >
              {continueLabel} <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              onClick={onContinue}
              disabled={continueDisabled}
              className={`block w-full py-4 rounded-xl text-base font-extrabold text-center transition-all flex items-center justify-center gap-2 ${
                continueDisabled
                  ? 'bg-border text-text-muted cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl active:scale-[0.99]'
              }`}
            >
              {continueLabel} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
