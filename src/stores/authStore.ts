import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'agent' | 'broker' | 'admin';
  avatarInitials: string;
  brokerage: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  hydrated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

const DEMO_USER: AuthUser = {
  id: 'cam-demo',
  email: 'cam@intelleqrealty.com',
  firstName: 'Cam',
  lastName: 'Tanaka',
  role: 'agent',
  avatarInitials: 'CT',
  brokerage: 'IntelleQ Realty Hawaii',
};

const STORAGE_KEY = 'iq-realty-auth';

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  hydrated: false,
  setAuth: (user, token) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    set({ user, token, hydrated: true });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null, hydrated: true });
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { user, token } = JSON.parse(raw);
        set({ user, token, hydrated: true });
        return;
      }
    } catch {
      // ignore
    }
    set({ hydrated: true });
  },
}));

export { DEMO_USER };
