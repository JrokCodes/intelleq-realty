import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore, DEMO_USER } from '@/stores/authStore';
import { ArrowRight, Sparkles, ShieldCheck, Home } from 'lucide-react';

export function LoginForm() {
  const { user, hydrated, hydrate, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  function handleContinue() {
    setLoading(true);
    setTimeout(() => {
      setAuth(DEMO_USER, 'demo-token');
      navigate('/', { replace: true });
    }, 350);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Hero panel */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between relative overflow-hidden bg-sidebar text-white">
        <div className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, #2A9D8F 0%, transparent 40%), radial-gradient(circle at 80% 80%, #E9C46A 0%, transparent 35%), linear-gradient(135deg, #264653 0%, #1c3540 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 p-14">
          <div className="flex items-center gap-3 mb-24">
            <div className="w-10 h-10 rounded-xl bg-accent-gold flex items-center justify-center text-sidebar text-lg font-extrabold">
              IQ
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight block leading-none">IntelleQ Realty</span>
              <span className="text-[11px] text-white/50 uppercase tracking-[0.2em] mt-1 block">AI Realtor Platform</span>
            </div>
          </div>

          <h1 className="text-[3.25rem] font-extrabold leading-[1.05] mb-6 tracking-tight">
            Buy and sell<br />homes with<br />AI on your side.
          </h1>
          <p className="text-[17px] text-white/70 max-w-md leading-relaxed">
            CMA in seconds. Listings drafted, signed, and marketed by AI.
            Deal timelines that never miss a deadline.
          </p>
        </div>

        <div className="relative z-10 p-14 pt-0">
          <div className="flex gap-2">
            {[
              { icon: <Sparkles size={18} className="text-accent-gold" />, label: 'AI CMA', value: 'Sub-minute' },
              { icon: <ShieldCheck size={18} className="text-accent-gold" />, label: 'Fiduciary', value: 'Built-in' },
              { icon: <Home size={18} className="text-accent-gold" />, label: 'Hawaii MLS', value: 'Connected' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 bg-white/[0.06] backdrop-blur-md rounded-2xl px-5 py-4 border border-white/[0.1]"
              >
                {stat.icon}
                <p className="text-[20px] font-bold tracking-tight mt-2">{stat.value}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Continue panel */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #94A3B8 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/[0.05] rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent-gold/[0.06] rounded-full blur-3xl" />

        {/* Mobile header */}
        <div className="lg:hidden relative z-10 px-8 pt-12 pb-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sidebar flex items-center justify-center">
            <span className="text-accent-gold text-lg font-extrabold">IQ</span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-text-primary tracking-tight leading-none">IntelleQ Realty</h2>
            <p className="text-[10px] text-text-muted font-medium tracking-[0.15em] mt-1 uppercase">AI Realtor Platform</p>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[400px]">
            <div className="mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
                Demo Build
              </span>
              <h1 className="text-[28px] font-extrabold text-text-primary mb-2 tracking-tight">Welcome back, Cam</h1>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your AI realtor assistant is ready. Pick up where you left off — 2 deals need attention.
              </p>
            </div>

            <div className="bg-bg border border-border rounded-2xl p-5 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sidebar flex items-center justify-center flex-shrink-0">
                <span className="text-accent-gold text-base font-extrabold">CT</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">Cam Tanaka</p>
                <p className="text-xs text-text-muted truncate">cam@intelleqrealty.com</p>
                <p className="text-xs text-text-secondary mt-1">IntelleQ Realty Hawaii · Agent</p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl text-[15px] font-bold hover:bg-primary-hover transition-all disabled:opacity-60 cursor-pointer shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-[1px] active:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue to dashboard <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-text-muted mt-6 leading-relaxed">
              This is a guided demo. No real listings, comps, or contracts — all data is illustrative.
            </p>
          </div>
        </div>

        <div className="relative z-10 px-8 py-4 border-t border-border/40">
          <div className="max-w-[400px] mx-auto flex items-center justify-between text-[11px] text-text-muted/70">
            <span>&copy; 2026 IntelleQ Technologies</span>
            <span className="font-mono">demo v0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
