export type ID = string;
export type ISODate = string; // "2026-04-27"

export type Side = 'sell' | 'buy';

export type SellStage =
  | 'lead'
  | 'verified'
  | 'cma'
  | 'listed'
  | 'under_contract'
  | 'closing'
  | 'closed';

export type BuyStage =
  | 'pre_approval'
  | 'searching'
  | 'rep_signed'
  | 'offer'
  | 'under_contract'
  | 'closing'
  | 'closed';

export type AnyStage = SellStage | BuyStage;

export type ContactRole =
  | 'seller'
  | 'buyer'
  | 'lender'
  | 'title'
  | 'escrow'
  | 'inspector'
  | 'photographer';

export interface Contact {
  id: ID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: ContactRole;
  company?: string;
  initials: string;
  notes?: string;
}

export interface PropertyAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
}

export type ListingStatus =
  | 'draft'
  | 'pre_market'
  | 'active'
  | 'pending'
  | 'sold';

export type TitleStatus = 'pending' | 'clear' | 'issues';

export interface Listing {
  id: ID;
  sellerId: ID;
  address: PropertyAddress;
  status: ListingStatus;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  listPrice: number;
  aiPriceLow: number;
  aiPriceHigh: number;
  aiConfidence: number; // 0-1
  daysOnMarket: number;
  photoEmoji: string; // standin for photo
  aiTags: string[];
  intakeComplete: boolean;
  titleStatus: TitleStatus;
  marketingChannels: string[];
  description: string;
  parking: number;
  hoa?: number;
}

export type PreApprovalStatus = 'none' | 'pending' | 'approved';

export interface Buyer {
  id: ID;
  contactId: ID;
  preApproval: {
    status: PreApprovalStatus;
    lender?: string;
    maxPrice?: number;
    expires?: ISODate;
  };
  searchCriteria: {
    minBeds: number;
    minBaths: number;
    priceMin: number;
    priceMax: number;
    cities: string[];
    mustHave: string[];
  };
  dripActive: boolean;
  savedListingIds: ID[];
  repAgreementSigned: boolean;
  notes: string;
}

export interface Comp {
  id: ID;
  address: PropertyAddress;
  soldPrice: number;
  soldDate: ISODate;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  distanceMi: number;
  matchScore: number; // 0-100
  adjustments: {
    sqft: number;
    time: number;
    condition: number;
    lot: number;
  };
  adjustedPrice: number;
  photoEmoji: string;
}

export type OfferStatus =
  | 'draft'
  | 'sent'
  | 'countered'
  | 'accepted'
  | 'rejected';

export type OfferContingency = 'inspection' | 'financing' | 'appraisal';

export interface Offer {
  id: ID;
  buyerId: ID;
  listingId: ID;
  offerPrice: number;
  earnestMoney: number;
  contingencies: OfferContingency[];
  closeDate: ISODate;
  recommendedRange: [number, number];
  positionVsComps: 'below' | 'at' | 'above';
  status: OfferStatus;
  createdDate: ISODate;
}

export interface Deal {
  id: ID;
  side: Side;
  stage: AnyStage;
  listingId?: ID;
  buyerId?: ID;
  sellerId?: ID;
  price: number;
  openedDate: ISODate;
  expectedCloseDate: ISODate;
  onTrack: 'yes' | 'at_risk' | 'overdue';
  commissionEst: number;
  notes: string;
}

export type MilestoneStatus =
  | 'upcoming'
  | 'in_progress'
  | 'done'
  | 'overdue'
  | 'at_risk';

export interface TimelineMilestone {
  id: ID;
  dealId: ID;
  label: string;
  description?: string;
  dueDate: ISODate;
  completedDate?: ISODate;
  status: MilestoneStatus;
  ownerRole: 'agent' | 'buyer' | 'seller' | 'title' | 'lender' | 'escrow' | 'inspector';
  fiduciaryFlag?: string;
}

export type DocumentStatus = 'unsigned' | 'sent' | 'signed';

export type DocumentType =
  | 'buyer_rep'
  | 'listing_agreement'
  | 'disclosure'
  | 'offer'
  | 'addendum'
  | 'closing_statement';

export interface DocumentRef {
  id: ID;
  dealId: ID;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  signedDate?: ISODate;
}

export interface Alert {
  id: ID;
  dealId?: ID;
  listingId?: ID;
  buyerId?: ID;
  severity: 'info' | 'warning' | 'danger' | 'success';
  title: string;
  body: string;
  timestamp: ISODate;
  unread: boolean;
}
