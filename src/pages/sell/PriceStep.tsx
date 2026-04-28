import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Sparkles, Banknote } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import { myListing } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

export default function PriceStep() {
  const aiMid = Math.round((myListing.aiPriceLow + myListing.aiPriceHigh) / 2);
  const aiRecommended = myListing.listPrice; // 985k
  const [price, setPrice] = useState(aiRecommended);

  const min = Math.round(myListing.aiPriceLow * 0.92);
  const max = Math.round(myListing.aiPriceHigh * 1.08);
  const positionPct = (price - aiMid) / aiMid;

  let strategy: { icon: typeof TrendingUp; color: string; bg: string; title: string; body: string };
  if (positionPct < -0.02) {
    strategy = {
      icon: TrendingDown,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      title: 'Aggressive — likely multiple offers',
      body: `Below market triggers competitive bidding. Expected to sell ~9 days, often above asking.`,
    };
  } else if (positionPct < 0.02) {
    strategy = {
      icon: Minus,
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      title: 'At market — balanced approach',
      body: `Aligned with comp midpoint. Expected to sell ~14 days at or near asking.`,
    };
  } else {
    strategy = {
      icon: TrendingUp,
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      title: 'Above market — testing the ceiling',
      body: `Higher list price extends time on market. Expected ~28 days, possible price reduction needed.`,
    };
  }
  const StratIcon = strategy.icon;

  // Estimated proceeds
  const partnerFee = 4_500;
  const ourFee = Math.round(price * 0.01);
  const titleFee = 1_800;
  const proceeds = price - partnerFee - ourFee - titleFee;

  return (
    <WizardLayout
      step={6}
      stepName="Set price"
      aiMessage="Pick your list price — I'll show you what each strategy means."
      aiHint={`AI recommends ${formatCurrency(aiRecommended, { compact: true })} — a touch below midpoint to drive multiple offers.`}
      backTo="/sell/valuation"
      continueTo="/sell/preview"
    >
      {/* Big price display */}
      <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-3xl p-6 mb-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl -translate-y-12 translate-x-12" />
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">Your list price</p>
          <p className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">{formatCurrency(price, { compact: true })}</p>
          <p className="text-sm text-white/60">{formatCurrency(price)}</p>
        </div>
      </div>

      {/* Slider */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full accent-primary mb-3"
        />
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted mb-3">
          <span>{formatCurrency(min, { compact: true })}</span>
          <span className="text-primary">AI band</span>
          <span>{formatCurrency(max, { compact: true })}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Preset label="Aggressive" value={Math.round(myListing.aiPriceLow)} onClick={setPrice} active={Math.abs(price - Math.round(myListing.aiPriceLow)) < 5000} />
          <Preset label="AI Pick" value={aiRecommended} onClick={setPrice} active={Math.abs(price - aiRecommended) < 5000} starred />
          <Preset label="Top of band" value={Math.round(myListing.aiPriceHigh)} onClick={setPrice} active={Math.abs(price - Math.round(myListing.aiPriceHigh)) < 5000} />
        </div>
      </div>

      {/* Strategy callout */}
      <div className={`rounded-2xl border-2 p-5 mb-4 ${strategy.bg}`}>
        <div className="flex items-center gap-2 mb-2">
          <StratIcon size={16} className={strategy.color} />
          <span className={`text-[11px] font-bold uppercase tracking-wider ${strategy.color}`}>Pricing strategy</span>
        </div>
        <p className="text-base font-extrabold text-text-primary mb-1">{strategy.title}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{strategy.body}</p>
      </div>

      {/* Estimated proceeds */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Banknote size={14} className="text-primary" />
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Estimated proceeds at this price</p>
        </div>
        <Row label="Sale price" value={formatCurrency(price)} />
        <Row label="IntelleQ platform fee (1%)" value={`−${formatCurrency(ourFee)}`} muted />
        <Row label="Partner agent flat fee" value={`−${formatCurrency(partnerFee)}`} muted />
        <Row label="Title + escrow" value={`−${formatCurrency(titleFee)}`} muted />
        <div className="pt-3 mt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-text-primary">Net to you (est.)</span>
            <span className="text-2xl font-extrabold text-primary tracking-tight">{formatCurrency(proceeds, { compact: true })}</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Excludes mortgage payoff, HOA, and property tax adjustments.</p>
        </div>
      </div>

      {/* Compare to traditional */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <Sparkles size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">
            Save {formatCurrency(Math.round(price * 0.04), { compact: true })} vs. a traditional 5% commission
          </p>
          <p className="text-xs text-emerald-800 leading-snug mt-0.5">
            Reviewed by Cameron Leopoldino, Lic. RB-22451 — full agent representation included.
          </p>
        </div>
      </div>
    </WizardLayout>
  );
}

function Preset({ label, value, onClick, active, starred }: { label: string; value: number; onClick: (v: number) => void; active: boolean; starred?: boolean }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`py-2.5 px-2 rounded-xl border text-center transition-all ${
        active ? 'border-primary bg-primary-soft' : 'border-border bg-bg hover:border-primary/40'
      }`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${active ? 'text-primary' : 'text-text-muted'}`}>
        {starred ? '★ ' : ''}{label}
      </p>
      <p className="text-xs font-extrabold text-text-primary">{formatCurrency(value, { compact: true })}</p>
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className={muted ? 'text-text-muted' : 'text-text-secondary'}>{label}</span>
      <span className={`font-bold ${muted ? 'text-text-secondary' : 'text-text-primary'}`}>{value}</span>
    </div>
  );
}
