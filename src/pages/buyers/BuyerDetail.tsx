import { Link, useParams } from 'react-router';
import { ArrowLeft, Mail, Phone, FileSignature, Send, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { buyers, contacts, listings } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/format';
import { preApprovalStyles } from '@/lib/colors';
import StatusBadge from '@/components/shared/StatusBadge';

export default function BuyerDetail() {
  const { id } = useParams<{ id: string }>();
  const buyer = buyers.find((b) => b.id === id);
  const contact = buyer ? contacts.find((c) => c.id === buyer.contactId) : null;

  if (!buyer || !contact) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Buyer not found.</p>
        <Link to="/buyers" className="text-primary text-sm font-bold">← Back to buyers</Link>
      </div>
    );
  }

  const styles = preApprovalStyles[buyer.preApproval.status];
  const saved = buyer.savedListingIds
    .map((id) => listings.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <Link
        to="/buyers"
        className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-hover mb-4"
      >
        <ArrowLeft size={16} /> Buyers
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-lg font-extrabold flex-shrink-0">
            {contact.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-extrabold text-text-primary">{contact.firstName} {contact.lastName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge bg={styles.bg} text={styles.text} label={styles.label} size="sm" />
              {buyer.repAgreementSigned && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  Rep signed
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-bg border border-border text-sm font-bold text-text-secondary hover:border-primary hover:text-primary transition-colors">
            <Mail size={14} /> Email
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-bg border border-border text-sm font-bold text-text-secondary hover:border-primary hover:text-primary transition-colors">
            <Phone size={14} /> Call
          </button>
        </div>
      </div>

      {/* Pre-approval card */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-sm font-bold text-text-primary mb-3">Pre-approval</h2>
        {buyer.preApproval.status === 'approved' ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">Approved</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Lender</p>
                <p className="font-bold text-text-primary mt-0.5">{buyer.preApproval.lender}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Max price</p>
                <p className="font-bold text-text-primary mt-0.5">{formatCurrency(buyer.preApproval.maxPrice || 0, { compact: true })}</p>
              </div>
              {buyer.preApproval.expires && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Expires</p>
                  <p className="font-bold text-text-primary mt-0.5">{formatDate(buyer.preApproval.expires)}</p>
                </div>
              )}
            </div>
          </>
        ) : buyer.preApproval.status === 'pending' ? (
          <div className="flex items-start gap-2">
            <Clock size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Pending with {buyer.preApproval.lender}</p>
              <p className="text-xs text-text-secondary mt-1">Approval expected within 48 hours.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <Clock size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-700">Not pre-approved</p>
              <p className="text-xs text-text-secondary mt-1">Connect with First Pacific Mortgage (referral partner) to start.</p>
            </div>
          </div>
        )}
      </div>

      {/* Search criteria */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h2 className="text-sm font-bold text-text-primary mb-3">Search criteria</h2>
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Beds / Baths</p>
            <p className="font-bold text-text-primary mt-0.5">{buyer.searchCriteria.minBeds}+ BR · {buyer.searchCriteria.minBaths}+ BA</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Price range</p>
            <p className="font-bold text-text-primary mt-0.5">{formatCurrency(buyer.searchCriteria.priceMin, { compact: true })}–{formatCurrency(buyer.searchCriteria.priceMax, { compact: true })}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Cities</p>
            <p className="font-bold text-text-primary mt-0.5">{buyer.searchCriteria.cities.join(', ')}</p>
          </div>
          {buyer.searchCriteria.mustHave.length > 0 && (
            <div className="col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Must have</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {buyer.searchCriteria.mustHave.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded-full bg-bg border border-border text-xs font-medium text-text-secondary">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${buyer.dripActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
            <Mail size={10} /> Drip {buyer.dripActive ? 'active' : 'paused'}
          </span>
          <button className="text-xs font-bold text-primary hover:text-primary-hover">Edit</button>
        </div>
      </div>

      {/* Saved listings */}
      {saved.length > 0 && (
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h2 className="text-sm font-bold text-text-primary mb-3">Saved listings ({saved.length})</h2>
          <div className="space-y-2">
            {saved.map((l) => (
              <Link key={l.id} to={`/listings/${l.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg transition-colors">
                <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center text-2xl flex-shrink-0">
                  {l.photoEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary truncate">{l.address.line1}</p>
                  <p className="text-xs text-text-muted flex items-center gap-1"><MapPin size={11} /> {l.address.neighborhood}</p>
                </div>
                <span className="text-sm font-extrabold text-text-primary flex-shrink-0">{formatCurrency(l.listPrice, { compact: true })}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {buyer.notes && (
        <div className="bg-white rounded-2xl border border-border p-5 mb-4">
          <h2 className="text-sm font-bold text-text-primary mb-2">Notes</h2>
          <p className="text-sm text-text-secondary leading-relaxed italic">"{buyer.notes}"</p>
        </div>
      )}

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          to={`/buyers/${buyer.id}/offer`}
          className="py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold text-center hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
        >
          <FileSignature size={16} /> Build offer
        </Link>
        <button className="py-3 px-4 rounded-xl bg-white border border-border text-sm font-bold text-text-primary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Send size={16} /> Send drip
        </button>
      </div>
    </div>
  );
}
