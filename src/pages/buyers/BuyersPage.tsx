import { Link } from 'react-router';
import { UserPlus, Mail } from 'lucide-react';
import { buyers, contacts } from '@/data/mockData';
import { formatCurrency } from '@/lib/format';
import { preApprovalStyles } from '@/lib/colors';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/shared/Toast';

export default function BuyersPage() {
  const { toast } = useToast();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-5 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Buyers</h1>
          <p className="text-sm text-text-muted">{buyers.length} active · {buyers.filter((b) => b.dripActive).length} on drip</p>
        </div>
        <button
          onClick={() => toast('Buyer intake form opening...', 'info')}
          className="bg-primary text-white px-3 md:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
        >
          <UserPlus size={16} />
          <span className="hidden sm:inline">Add buyer</span>
        </button>
      </div>

      <div className="space-y-3">
        {buyers.map((buyer) => {
          const contact = contacts.find((c) => c.id === buyer.contactId);
          if (!contact) return null;
          const styles = preApprovalStyles[buyer.preApproval.status];

          return (
            <Link
              key={buyer.id}
              to={`/buyers/${buyer.id}`}
              className="block bg-white rounded-xl border border-border p-4 md:p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-sm font-extrabold flex-shrink-0">
                  {contact.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-extrabold text-text-primary truncate">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <StatusBadge bg={styles.bg} text={styles.text} label={styles.label} size="sm" />
                  </div>
                  <p className="text-xs text-text-muted truncate mb-2">{contact.email} · {contact.phone}</p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary mb-2">
                    <span><strong className="text-text-primary">{buyer.searchCriteria.minBeds}+</strong> BR</span>
                    <span><strong className="text-text-primary">{formatCurrency(buyer.searchCriteria.priceMin, { compact: true })}</strong>–<strong className="text-text-primary">{formatCurrency(buyer.searchCriteria.priceMax, { compact: true })}</strong></span>
                    <span className="truncate">{buyer.searchCriteria.cities.join(', ')}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {buyer.dripActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                        <Mail size={10} /> Drip on
                      </span>
                    )}
                    {buyer.repAgreementSigned && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        Rep signed
                      </span>
                    )}
                    {buyer.savedListingIds.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-bg border border-border text-text-secondary text-[10px] font-bold uppercase tracking-wider">
                        {buyer.savedListingIds.length} saved
                      </span>
                    )}
                  </div>

                  {buyer.notes && (
                    <p className="text-xs text-text-secondary mt-2 italic line-clamp-1">"{buyer.notes}"</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
