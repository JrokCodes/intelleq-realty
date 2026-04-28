import { Link } from 'react-router';
import { CheckCircle2, ShieldCheck, Camera, MapPin, Bath, Bed, Ruler, ArrowRight, Sparkles } from 'lucide-react';
import { myListing, contacts } from '@/data/mockData';
import { formatSqft } from '@/lib/format';

export default function IntakePage() {
  const seller = contacts.find((c) => c.id === myListing.sellerId)!;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto pb-32">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Intake & verification</h1>
        <p className="text-sm text-text-secondary">Everything AI needed to start working on your listing</p>
      </div>

      {/* Status */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-extrabold text-emerald-900">Intake complete</p>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            Verified your identity, confirmed ownership through title, and captured 11 photos with AI tagging.
          </p>
        </div>
      </div>

      {/* Identity */}
      <Section title="Identity & ownership" icon={ShieldCheck}>
        <Row label="Seller" value={`${seller.firstName} ${seller.lastName}`} done />
        <Row label="Email" value={seller.email} done />
        <Row label="Phone" value={seller.phone} done />
        <Row label="Government ID" value="Verified via Plaid Identity" done />
        <Row label="Title check" value="Clear — Hawaii Title Co." done />
      </Section>

      {/* Property */}
      <Section title="Property details" icon={MapPin}>
        <Row label="Address" value={myListing.address.line1} done />
        <Row label="City / Zip" value={`${myListing.address.city}, HI ${myListing.address.zip}`} done />
        <Row label="Neighborhood" value={myListing.address.neighborhood} done />
        <Row label="Year built" value={String(myListing.yearBuilt)} done />
      </Section>

      {/* Specs */}
      <Section title="The basics" icon={Ruler}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SpecCard icon={Bed} label="Bedrooms" value={String(myListing.beds)} />
          <SpecCard icon={Bath} label="Bathrooms" value={String(myListing.baths)} />
          <SpecCard icon={Ruler} label="Square feet" value={formatSqft(myListing.sqft)} />
          <SpecCard icon={MapPin} label="Parking" value={`${myListing.parking} stalls`} />
        </div>
        {myListing.hoa && (
          <div className="mt-3 px-4 py-2.5 bg-bg rounded-xl text-xs text-text-secondary">
            HOA: <span className="font-bold text-text-primary">${myListing.hoa.toLocaleString()}/mo</span>
          </div>
        )}
      </Section>

      {/* Photos */}
      <Section title="Photos & AI features" icon={Camera}>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
          {[
            '🏙️', '🛋️', '🍳', '🛏️',
            '🛁', '🌅', '🏊', '💪',
          ].map((e, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-sidebar/85 to-primary/40 rounded-xl flex items-center justify-center text-3xl md:text-4xl"
            >
              {e}
            </div>
          ))}
        </div>
        <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-primary flex-shrink-0" />
          <p className="text-xs text-primary font-semibold">AI detected {myListing.aiTags.length} features in your photos</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {myListing.aiTags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-bg border border-border text-xs text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Next step */}
      <Link
        to="/sell/valuation"
        className="block bg-primary text-white rounded-2xl p-5 hover:bg-primary-hover transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Next step</p>
            <p className="text-base md:text-lg font-extrabold">See your AI valuation</p>
          </div>
          <ArrowRight size={20} />
        </div>
      </Link>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 mb-4">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={16} />
        </div>
        <h2 className="text-base font-extrabold text-text-primary">{title}</h2>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, done }: { label: string; value: string; done?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm text-text-secondary truncate">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-bold text-text-primary truncate">{value}</span>
        {done && <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />}
      </div>
    </div>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: typeof Bed; label: string; value: string }) {
  return (
    <div className="bg-bg rounded-xl p-3 text-center">
      <Icon size={16} className="text-text-muted mx-auto mb-1.5" />
      <p className="text-base font-extrabold text-text-primary">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</p>
    </div>
  );
}
