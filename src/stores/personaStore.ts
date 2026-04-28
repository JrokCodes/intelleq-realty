import { create } from 'zustand';

export type Side = 'sell' | 'buy';

export interface SellPersona {
  side: 'sell';
  firstName: string;
  lastName: string;
  initials: string;
  city: string;
  listingId: string;
}

export interface BuyPersona {
  side: 'buy';
  firstName: string;
  lastName: string;
  initials: string;
  preApproved: boolean;
  maxPrice: number;
  buyerId: string;
}

export const sellPersona: SellPersona = {
  side: 'sell',
  firstName: 'Maya',
  lastName: 'Kahale',
  initials: 'MK',
  city: 'Honolulu',
  listingId: 'l-001',
};

export const buyPersona: BuyPersona = {
  side: 'buy',
  firstName: 'Alex',
  lastName: 'Chen',
  initials: 'AC',
  preApproved: true,
  maxPrice: 850_000,
  buyerId: 'b-001',
};

interface PersonaState {
  side: Side | null;
  setSide: (side: Side | null) => void;
}

export const usePersonaStore = create<PersonaState>()((set) => ({
  side: null,
  setSide: (side) => set({ side }),
}));

export function personaForSide(side: Side) {
  return side === 'sell' ? sellPersona : buyPersona;
}
