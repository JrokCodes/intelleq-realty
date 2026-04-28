import { NavLink } from 'react-router';
import { Home, Briefcase, MapPin, Users, Sparkles } from 'lucide-react';

const items = [
  { to: '/', label: 'Today', icon: Home, end: true },
  { to: '/pipeline', label: 'Pipeline', icon: Briefcase },
  { to: '/listings', label: 'Listings', icon: MapPin },
  { to: '/buyers', label: 'Buyers', icon: Users },
  { to: '/roadmap', label: 'Next', icon: Sparkles },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border flex"
         style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
