import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/stores/authStore';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token, hydrated, hydrate } = useAuthStore();

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  if (!hydrated) return null;
  if (!user || !token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
