import { Menu, Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-border h-16 flex items-center px-4 md:px-6 gap-3">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-bg text-text-secondary"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search deals, listings, contacts..."
            className="w-full pl-9 pr-4 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      <div className="flex-1 md:hidden">
        <span className="text-base font-extrabold text-text-primary">IntelleQ Realty</span>
      </div>

      <button
        className="relative p-2 rounded-lg hover:bg-bg text-text-secondary"
        aria-label="Notifications"
      >
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warning" />
      </button>

      <div className="w-9 h-9 rounded-full bg-sidebar flex items-center justify-center text-accent-gold text-xs font-extrabold flex-shrink-0">
        {user?.avatarInitials || 'CT'}
      </div>
    </header>
  );
}
