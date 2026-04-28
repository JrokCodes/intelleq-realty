import { Link } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="bg-white rounded-2xl border border-border p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-bg flex items-center justify-center mx-auto mb-4 text-3xl">🏝️</div>
        <h1 className="text-2xl font-extrabold text-text-primary mb-2">Lost in paradise</h1>
        <p className="text-sm text-text-secondary mb-6">
          That page doesn't exist. Let's get you back to the dashboard.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
        >
          <Home size={16} />
          Go home
        </Link>
      </div>
    </div>
  );
}
