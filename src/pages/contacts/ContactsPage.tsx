import { contacts } from '@/data/mockData';
import { Mail, Phone, Building2 } from 'lucide-react';

const roleStyles: Record<string, { bg: string; text: string; label: string }> = {
  seller: { bg: 'bg-primary/10', text: 'text-primary', label: 'Seller' },
  buyer: { bg: 'bg-accent-gold/20', text: 'text-amber-800', label: 'Buyer' },
  lender: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Lender' },
  title: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Title' },
  escrow: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Escrow' },
  inspector: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Inspector' },
  photographer: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Photographer' },
};

export default function ContactsPage() {
  const grouped: Record<string, typeof contacts> = {};
  for (const contact of contacts) {
    grouped[contact.role] = grouped[contact.role] || [];
    grouped[contact.role].push(contact);
  }

  const order = ['seller', 'buyer', 'lender', 'title', 'inspector', 'escrow', 'photographer'];

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">Contacts</h1>
        <p className="text-sm text-text-muted">Sellers, buyers, and partners — all in one place</p>
      </div>

      {order.map((role) => {
        const group = grouped[role];
        if (!group || group.length === 0) return null;
        const styles = roleStyles[role];
        return (
          <section key={role} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text}`}>
                {styles.label}
              </span>
              <span className="text-xs text-text-muted font-bold">{group.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.map((c) => (
                <div key={c.id} className="bg-white rounded-xl border border-border p-4 flex items-start gap-3 hover:border-primary/30 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-sidebar text-accent-gold flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{c.firstName} {c.lastName}</p>
                    {c.company && (
                      <p className="text-xs text-text-muted flex items-center gap-1 truncate"><Building2 size={11} /> {c.company}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Mail size={11} className="text-text-muted" /> <span className="truncate">{c.email}</span></span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-text-secondary">
                      <Phone size={11} className="text-text-muted" /> {c.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
