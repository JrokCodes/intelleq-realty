import { Link, useLocation } from 'react-router';
import { ArrowLeftRight, ChevronLeft } from 'lucide-react';

export default function TopNav() {
  const location = useLocation();
  const path = location.pathname;
  const inSell = path.startsWith('/sell');
  const inBuy = path.startsWith('/buy');
  const inFlow = inSell || inBuy;

  // What's the parent route to go "back" to?
  const homeRoute = inSell ? '/sell' : inBuy ? '/buy' : '/';
  const segmentCount = path.split('/').filter(Boolean).length;
  const showBack = segmentCount > 1;

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-border h-14 md:h-16 flex items-center px-4 md:px-6 gap-2">
      {showBack && inFlow ? (
        <Link
          to={homeRoute}
          className="-ml-1 p-2 rounded-lg hover:bg-bg text-text-secondary"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <div className="w-8" />
      )}

      <Link to="/" className="flex items-center gap-2.5 flex-1">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-sidebar flex items-center justify-center">
          <span className="text-accent-gold text-xs md:text-sm font-extrabold">IQ</span>
        </div>
        <div className="leading-tight">
          <span className="block text-sm md:text-base font-extrabold text-text-primary tracking-tight">IntelleQ Realty</span>
          {inFlow && (
            <span className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted">
              {inSell ? "You're selling" : "You're buying"}
            </span>
          )}
        </div>
      </Link>

      {inFlow && (
        <Link
          to="/"
          className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg bg-bg border border-border text-[11px] md:text-xs font-bold text-text-secondary hover:border-primary hover:text-primary transition-colors"
        >
          <ArrowLeftRight size={12} />
          Switch
        </Link>
      )}
    </header>
  );
}
