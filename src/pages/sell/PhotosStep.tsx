import { useState } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, Calendar, ImageIcon } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import { myListing } from '@/data/mockData';

export default function PhotosStep() {
  const [mode, setMode] = useState<'upload' | 'pro' | null>('upload');
  const photos = ['🏙️', '🛋️', '🍳', '🛏️', '🛁', '🌅', '🏊', '💪', '🌃', '🛁', '🛏️'];

  return (
    <WizardLayout
      step={4}
      stepName="Photos"
      aiMessage="Great photos = faster sale and higher price."
      aiHint="Upload what you have, or schedule a free pro shoot. We've already detected key features in your existing photos."
      backTo="/sell/about"
      continueTo="/sell/valuation"
    >
      {/* Mode picker */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <ModeBtn
          icon={Upload}
          label="Upload my own"
          active={mode === 'upload'}
          onClick={() => setMode('upload')}
        />
        <ModeBtn
          icon={Camera}
          label="Pro shoot · Free"
          active={mode === 'pro'}
          onClick={() => setMode('pro')}
        />
      </div>

      {mode === 'upload' && (
        <>
          {/* Drop zone */}
          <div className="bg-white border-2 border-dashed border-primary/30 rounded-2xl p-6 mb-5 text-center hover:border-primary/60 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto mb-2">
              <Upload size={20} />
            </div>
            <p className="text-sm font-bold text-text-primary">Drag photos here or tap to upload</p>
            <p className="text-xs text-text-muted mt-1">JPEG or HEIC · up to 50 MB each</p>
          </div>

          {/* Existing photos preview */}
          <div className="bg-white rounded-2xl border border-border p-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                <ImageIcon size={14} className="text-primary" />
                {photos.length} photos uploaded
              </p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                AI tagged
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {photos.map((emoji, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-sidebar/85 to-primary/40 rounded-lg flex items-center justify-center text-2xl"
                >
                  {emoji}
                </div>
              ))}
            </div>

            {/* AI features */}
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={12} className="text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">AI detected {myListing.aiTags.length} features</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {myListing.aiTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-bg border border-border text-[11px] text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pro option upsell */}
          <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-2xl p-4 flex items-start gap-3">
            <Camera size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-extrabold text-text-primary">Want pro photos? It's free.</p>
              <p className="text-xs text-text-secondary leading-snug mt-0.5">
                Pro-shot listings sell <span className="font-bold text-text-primary">23% faster</span> on average.
                Schedule a 1-hour shoot at no cost — paid through closing.
              </p>
              <button
                onClick={() => setMode('pro')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 mt-2"
              >
                Schedule a shoot →
              </button>
            </div>
          </div>
        </>
      )}

      {mode === 'pro' && (
        <>
          <div className="bg-white rounded-2xl border border-border p-5 mb-4">
            <h3 className="text-base font-extrabold text-text-primary mb-1">Schedule your shoot</h3>
            <p className="text-xs text-text-muted mb-4">Oahu Real Estate Photo · 1-hour session · drone + interior</p>

            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Pick a date</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Tomorrow', 'Wed Apr 30', 'Thu May 1'].map((d, i) => (
                <button
                  key={d}
                  className={`py-3 px-2 rounded-xl text-sm font-bold border transition-colors ${
                    i === 1 ? 'bg-primary text-white border-primary' : 'bg-bg border-border text-text-secondary hover:border-primary/40'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Pick a time</p>
            <div className="grid grid-cols-3 gap-2">
              {['10 AM', '12 PM', '3 PM'].map((t, i) => (
                <button
                  key={t}
                  className={`py-3 px-2 rounded-xl text-sm font-bold border transition-colors ${
                    i === 2 ? 'bg-primary text-white border-primary' : 'bg-bg border-border text-text-secondary hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-extrabold text-emerald-900">Shoot scheduled — Thu May 1, 3 PM</p>
              <p className="text-xs text-emerald-800 leading-snug mt-0.5">
                Confirmation sent. Ryo will text you the morning of. No payment due — fee paid through closing.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMode('upload')}
            className="mt-3 w-full text-xs font-bold text-text-secondary hover:text-primary flex items-center justify-center gap-1"
          >
            <Calendar size={12} /> Or upload your own photos instead
          </button>
        </>
      )}
    </WizardLayout>
  );
}

function ModeBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Camera;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 text-left transition-all ${
        active ? 'border-primary bg-primary-soft' : 'border-border bg-white hover:border-primary/40'
      }`}
    >
      <Icon size={18} className={active ? 'text-primary' : 'text-text-muted'} />
      <p className={`text-sm font-extrabold mt-2 ${active ? 'text-primary' : 'text-text-primary'}`}>{label}</p>
    </button>
  );
}
