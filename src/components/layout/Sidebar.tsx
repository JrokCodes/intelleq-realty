import { NavLink } from 'react-router';
import { Home, Briefcase, Users, Wrench, Sparkles, X, LogOut, FileText, MapPin } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const items = [
  { to: '/', label: 'Today', icon: Home, end: true },
  { to: '/pipeline', label: 'Pipeline', icon: Briefcase },
  { to: '/listings', label: 'Listings', icon: MapPin },
  { to: '/buyers', label: 'Buyers', icon: Users },
  { to: '/contacts', label: 'Contacts', icon: FileText },
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/roadmap', label: "What's Next", icon: Sparkles },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}
      <aside
        className={`fixed md:fixed top-0 left-0 h-screen w-60 bg-sidebar text-white z-40 flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-accent-gold flex items-center justify-center text-sidebar text-sm font-extrabold">
              IQ
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight block leading-none">IntelleQ</span>
              <span className="text-[9px] text-white/50 uppercase tracking-[0.18em] mt-0.5 block">Realty</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/70"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/65 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-accent-gold flex items-center justify-center text-sidebar text-xs font-extrabold flex-shrink-0">
              {user?.avatarInitials || 'CT'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-[11px] text-white/50 truncate">{user?.brokerage}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
