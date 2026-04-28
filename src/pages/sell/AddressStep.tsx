import { useState } from 'react';
import { MapPin, Sparkles, TrendingUp } from 'lucide-react';
import WizardLayout from '@/components/realty/WizardLayout';
import { myListing } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';

export default function AddressStep() {
  const [address, setAddress] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleAddressChange = (val: string) => {
    setAddress(val);
    if (val.toLowerCase().includes('auahi') || val.length > 12) {
      setRevealed(true);
    }
  };

  const usePrefilled = () => {
    setAddress(`${myListing.address.line1}, ${myListing.address.city}, HI ${myListing.address.zip}`);
    setRevealed(true);
  };

  return (
    <WizardLayout
      step={1}
      stepName="Address"
      aiMessage="Hi! I'm your AI agent. Let's start with where your home is."
      aiHint="Type your address and I'll pull instant data — prior sales, comps, square footage, year built."
      backTo="/sell"
      continueTo="/sell/verify"
      continueDisabled={!revealed}
    >
      {/* Address input */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">Property address</label>
        <div className="relative">
          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="1108 Auahi St #2204, Honolulu, HI"
            className="w-full pl-10 pr-4 py-3.5 border border-border rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        {!revealed && (
          <button
            onClick={usePrefilled}
            className="mt-3 text-xs font-bold text-primary hover:text-primary-hover"
          >
            Or use the demo address →
          </button>
        )}
      </div>

      {/* Instant valuation reveal */}
      {revealed && (
        <div className="animate-fade-in">
          <div className="bg-gradient-to-br from-sidebar to-sidebar-deep text-white rounded-2xl p-5 mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-gold/15 rounded-full blur-3xl -translate-y-12 translate-x-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-accent-gold" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">Quick estimate</span>
              </div>
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
                {formatCurrency(myListing.aiPriceLow, { compact: true })}–{formatCurrency(myListing.aiPriceHigh, { compact: true })}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Based on 8 recent sales near you. We'll run the full comp analysis after a few more questions.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-3">What we found from public records</p>
            <div className="space-y-2.5">
              <Row label="Beds / Baths" value={`${myListing.beds} BR · ${myListing.baths} BA`} />
              <Row label="Square feet" value={myListing.sqft.toLocaleString()} />
              <Row label="Year built" value={String(myListing.yearBuilt)} />
              <Row label="Property type" value="Condo / High-rise" />
              <Row label="Last sold" value="2018" />
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-start gap-2">
              <TrendingUp size={14} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-snug">
                Confirm or correct these in the next step.
              </p>
            </div>
          </div>
        </div>
      )}
    </WizardLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold text-text-primary">{value}</span>
    </div>
  );
}
