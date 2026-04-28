import { Link } from 'react-router';
import { ArrowRight, Sparkles, Home, Search, ShieldCheck, Banknote, MessagesSquare } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Top bar */}
      <header className="px-5 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-sidebar flex items-center justify-center">
            <span className="text-accent-gold text-sm md:text-base font-extrabold">IQ</span>
          </div>
          <span className="text-base md:text-lg font-extrabold text-text-primary tracking-tight">IntelleQ Realty</span>
        </div>
        <Link to="/how-it-works" className="text-xs md:text-sm font-bold text-text-secondary hover:text-primary transition-colors">
          How it works
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-5 py-8 md:py-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8">
          <Sparkles size={12} />
          Buy or sell your home with AI
        </div>

        <h1 className="text-[2.5rem] md:text-6xl font-extrabold text-text-primary leading-[1.05] tracking-tight mb-5">
          The first real estate{' '}
          <span className="bg-gradient-to-r from-primary to-sidebar bg-clip-text text-transparent">
            agent that's not a person.
          </span>
        </h1>

        <p className="text-base md:text-xl text-text-secondary leading-relaxed mb-10 md:mb-14 max-w-xl">
          Pricing, paperwork, marketing, escrow — all handled by AI. A licensed partner agent
          signs off for legal liability. You save tens of thousands on commission.
        </p>

        {/* Two big choice cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
          <Link
            to="/sell"
            className="group bg-white rounded-2xl border-2 border-border hover:border-primary p-6 md:p-7 text-left transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center mb-4 transition-colors">
              <Home size={22} />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mb-1.5">Sell my home</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              AI pricing, photos, listing, marketing, and offer review.
              List in 24 hours.
            </p>
            <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
              Start selling <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/buy"
            className="group bg-white rounded-2xl border-2 border-border hover:border-accent-gold p-6 md:p-7 text-left transition-all hover:shadow-2xl hover:shadow-accent-gold/10 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-gold/20 group-hover:bg-accent-gold text-amber-800 group-hover:text-sidebar flex items-center justify-center mb-4 transition-colors">
              <Search size={22} />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mb-1.5">Find my home</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Pre-approval, AI-curated listings, offer guidance, and closing.
              No realtor needed.
            </p>
            <div className="flex items-center gap-1.5 text-sm font-bold text-amber-800">
              Start searching <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-text-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary" />
            <span>Licensed partner agent</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <Banknote size={14} className="text-primary" />
            <span>Save 4–5% on commission</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <MessagesSquare size={14} className="text-primary" />
            <span>AI agent 24/7</span>
          </div>
        </div>
      </section>

      <footer className="px-5 md:px-10 py-6 text-center text-[11px] text-text-muted/70">
        &copy; 2026 IntelleQ Technologies · Demo build · Mock data only
      </footer>
    </div>
  );
}
