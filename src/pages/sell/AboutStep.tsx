import { useState } from 'react';
import { Bed, Bath, Ruler, Car, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import { myListing } from '@/data/mockData';

export default function AboutStep() {
  const [beds, setBeds] = useState(myListing.beds);
  const [baths, setBaths] = useState(myListing.baths);
  const [sqft, setSqft] = useState(myListing.sqft);
  const [parking, setParking] = useState(myListing.parking);
  const [yearBuilt, setYearBuilt] = useState(myListing.yearBuilt);

  return (
    <WizardLayout
      step={3}
      stepName="About"
      aiMessage="I pulled these from public records. Confirm or fix anything."
      aiHint="The more accurate this is, the better my pricing model works. Skip the rest — I have the floor plan from county data."
      backTo="/sell/verify"
      continueTo="/sell/photos"
    >
      {/* AI prefill banner */}
      <div className="bg-primary-soft border border-primary/30 rounded-2xl p-3 mb-4 flex items-start gap-2.5">
        <Sparkles size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-text-primary">Auto-filled from public records</p>
          <p className="text-xs text-text-secondary leading-snug">Tap any field to edit.</p>
        </div>
      </div>

      {/* Counter inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Counter icon={Bed} label="Bedrooms" value={beds} onChange={setBeds} step={1} min={0} max={10} />
        <Counter icon={Bath} label="Bathrooms" value={baths} onChange={setBaths} step={0.5} min={0} max={10} />
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
          <Ruler size={12} /> Square feet
        </label>
        <input
          type="number"
          value={sqft}
          onChange={(e) => setSqft(parseInt(e.target.value || '0'))}
          className="w-full px-4 py-3 border border-border rounded-xl text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl border border-border p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
            <Car size={12} /> Parking
          </label>
          <input
            type="number"
            value={parking}
            onChange={(e) => setParking(parseInt(e.target.value || '0'))}
            min={0}
            max={10}
            className="w-full px-4 py-3 border border-border rounded-xl text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
            <Calendar size={12} /> Year built
          </label>
          <input
            type="number"
            value={yearBuilt}
            onChange={(e) => setYearBuilt(parseInt(e.target.value || '0'))}
            min={1900}
            max={2030}
            className="w-full px-4 py-3 border border-border rounded-xl text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* HOA toggle */}
      <div className="bg-white rounded-2xl border border-border p-4 mb-4">
        <p className="text-sm font-bold text-text-primary mb-1">HOA fees</p>
        <p className="text-xs text-text-muted mb-3">Buyers want to know the monthly cost.</p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
          <input
            type="number"
            defaultValue={myListing.hoa || 0}
            className="w-full pl-9 pr-16 py-3 border border-border rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-xs font-bold">/ month</span>
        </div>
      </div>

      {/* Looking good banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5">
        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-800 leading-snug">
          Looks complete. AI will use these numbers for pricing and the listing description.
        </p>
      </div>
    </WizardLayout>
  );
}

function Counter({
  icon: Icon,
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max = 99,
}: {
  icon: typeof Bed;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  const inc = () => onChange(Math.min(max, value + step));
  const dec = () => onChange(Math.max(min, value - step));
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="flex items-center gap-1.5 mb-2 text-text-muted text-xs font-bold uppercase tracking-wider">
        <Icon size={12} />
        {label}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          className="w-9 h-9 rounded-lg bg-bg border border-border text-text-secondary hover:border-primary hover:text-primary text-lg font-extrabold transition-colors flex-shrink-0"
        >
          −
        </button>
        <span className="flex-1 text-center text-2xl font-extrabold text-text-primary tabular-nums">{value}</span>
        <button
          onClick={inc}
          className="w-9 h-9 rounded-lg bg-bg border border-border text-text-secondary hover:border-primary hover:text-primary text-lg font-extrabold transition-colors flex-shrink-0"
        >
          +
        </button>
      </div>
    </div>
  );
}
