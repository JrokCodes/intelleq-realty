import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Sparkles, X, Send, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

const SUGGESTIONS_BY_PATH: Record<string, string[]> = {
  default: [
    'How does this work?',
    'Is this safe?',
    'How much will this cost me?',
  ],
  sell: [
    "What's my home worth?",
    'How long until it sells?',
    'How does pricing work?',
    'Do I still need a real estate agent?',
  ],
  buy: [
    'How do I get pre-approved?',
    "What's a fair offer for this home?",
    'How fast can I close?',
    'What if multiple people offer?',
  ],
};

const AI_RESPONSES: Record<string, string> = {
  "what's my home worth?":
    "Based on 8 recent comparable sales in Kakaako (within 0.5mi, sold in the last 90 days), your Anaha unit is worth between $965k and $1.01M with high confidence. The midpoint is around $988k. Tap into the Valuation tab to see the full comp breakdown.",
  'how long until it sells?':
    'Honolulu condos in your price range averaged 14 days on market this quarter. Based on your home, comps, and current buyer demand on the platform, I estimate 10–18 days to first acceptable offer.',
  'how does pricing work?':
    'I pull every comparable sale within your area, adjust for square footage, lot, time of sale, and condition, then build a defensible price band. You always have the final say — I just give you the data and a recommendation.',
  'do i still need a real estate agent?':
    "Not for the day-to-day work — I handle pricing, marketing, paperwork, and timelines. For liability, IntelleQ partners with a licensed agent in your state who reviews and signs off on the transaction at a small flat fee instead of 5–6% commission.",
  'how do i get pre-approved?':
    "I can connect you to one of our partner lenders right now. Most buyers get pre-approved within 24 hours by uploading 2 pay stubs, last year's W-2, and 2 months of bank statements. Want me to start?",
  "what's a fair offer for this home?":
    "Based on 5 recent comps within 0.4mi (all sold in the last 60 days), a competitive offer for this home is in the $720k–$745k range. The seller is at 0 days on market, so you have leverage to come in at the lower end.",
  'how fast can i close?':
    "If you're already pre-approved, expect 30–45 days from accepted offer. Cash offers can close in 14 days. I'll keep both sides on schedule and alert anyone who falls behind.",
  'what if multiple people offer?':
    'I monitor offer activity in real time. If a multi-offer scenario develops, I notify you and walk you through escalation strategies — increased earnest money, waived contingencies, escalation clauses — based on your priorities.',
  'how does this work?':
    'IntelleQ Realty handles the full home transaction with AI: identity verification, title, pricing, photos, paperwork, signatures, marketing, escrow, and closing. A licensed partner agent reviews and signs off for legal liability. Total cost is a fraction of the traditional 5–6%.',
  'is this safe?':
    "Yes. Every step has fiduciary safeguards built in — I always act in your best interest. Title companies handle the money, licensed escrow holds funds, and a partner agent reviews and approves the transaction. You have a full audit trail.",
  'how much will this cost me?':
    'Sellers: a 1% flat platform fee plus a small partner-agent flat fee — typically saving you tens of thousands compared to a 5–6% commission. Buyers: free, paid by the seller through the partner agent. Title and escrow fees are standard and disclosed up-front.',
};

function defaultResponse(prompt: string): string {
  return `Got it — "${prompt}". I'm pulling that up. (In the live app I'd answer this with real data; this demo uses scripted responses for the showcase.)`;
}

export default function AskAi() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: "Hi, I'm your IntelleQ AI agent 👋 — ask me anything about buying or selling your home.",
    },
  ]);
  const [input, setInput] = useState('');
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Don't show on landing page
  if (location.pathname === '/') return null;

  const inSell = location.pathname.startsWith('/sell');
  const inBuy = location.pathname.startsWith('/buy');
  const suggestions =
    inSell ? SUGGESTIONS_BY_PATH.sell
    : inBuy ? SUGGESTIONS_BY_PATH.buy
    : SUGGESTIONS_BY_PATH.default;

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    const key = trimmed.toLowerCase();
    const response = AI_RESPONSES[key] || defaultResponse(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: response }]);
    }, 600);
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:bg-primary-hover transition-all hover:scale-105 active:scale-95"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
          aria-label="Ask AI"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end bg-black/40">
          <button
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />
          <div className="relative w-full md:w-[420px] md:mr-6 md:mb-6 bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col h-[85vh] md:h-[600px] animate-slide-in"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sidebar flex items-center justify-center">
                <Bot size={18} className="text-accent-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-extrabold text-text-primary leading-tight">IntelleQ AI</h2>
                <p className="text-[11px] text-text-muted">Your personal real estate agent</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg text-text-muted"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-bg text-text-primary rounded-bl-sm border border-border'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {messages.length <= 2 && (
                <div className="pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Try asking</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="px-3 py-1.5 rounded-full bg-white border border-border text-xs text-text-secondary hover:border-primary hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="px-4 py-3 border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-2.5 bg-bg border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover disabled:opacity-50 transition-colors"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
