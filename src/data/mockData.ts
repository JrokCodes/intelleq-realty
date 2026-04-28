import type {
  Contact,
  Listing,
  Buyer,
  Comp,
  TimelineMilestone,
  DocumentRef,
  Alert,
} from '@/lib/types';

// =============================================================================
// CONTACTS — sellers, buyers, partners
// =============================================================================

export const contacts: Contact[] = [
  // Sellers
  { id: 'c-001', firstName: 'Maya', lastName: 'Kahale', email: 'maya.k@example.com', phone: '(808) 555-0142', role: 'seller', initials: 'MK', notes: 'You — selling your Anaha condo to relocate to mainland.' },
  { id: 'c-002', firstName: 'David', lastName: 'Lim', email: 'david.lim@example.com', phone: '(808) 555-0177', role: 'seller', initials: 'DL' },
  { id: 'c-003', firstName: 'Sarah', lastName: 'Otani', email: 'sarah.otani@example.com', phone: '(808) 555-0163', role: 'seller', initials: 'SO' },
  { id: 'c-004', firstName: 'James', lastName: 'Park', email: 'james.park@example.com', phone: '(808) 555-0189', role: 'seller', initials: 'JP' },
  { id: 'c-005', firstName: 'Lina', lastName: 'Chun', email: 'lina.chun@example.com', phone: '(808) 555-0119', role: 'seller', initials: 'LC' },

  // Buyers
  { id: 'c-101', firstName: 'Alex', lastName: 'Chen', email: 'alex.chen@example.com', phone: '(808) 555-0204', role: 'buyer', initials: 'AC', notes: 'You — first-time buyer looking in Honolulu and Mililani, pre-approved up to $850k.' },
  { id: 'c-102', firstName: 'Priya', lastName: 'Shah', email: 'priya.s@example.com', phone: '(808) 555-0287', role: 'buyer', initials: 'PS' },
  { id: 'c-103', firstName: 'Kai', lastName: 'Maeda', email: 'kai.maeda@example.com', phone: '(808) 555-0316', role: 'buyer', initials: 'KM' },

  // Imaginary buyers making offers on Maya's home
  { id: 'c-201', firstName: 'Jordan', lastName: 'Wright', email: 'jordan.w@example.com', phone: '(808) 555-0414', role: 'buyer', initials: 'JW' },
  { id: 'c-202', firstName: 'Mei', lastName: 'Tanaka', email: 'mei.t@example.com', phone: '(808) 555-0455', role: 'buyer', initials: 'MT' },

  // Partners
  { id: 'c-301', firstName: 'Brett', lastName: 'Yamamoto', email: 'brett.y@firstpacific.com', phone: '(808) 555-0411', role: 'lender', company: 'First Pacific Mortgage', initials: 'BY' },
  { id: 'c-302', firstName: 'Karen', lastName: 'Ito', email: 'karen@hawaiititle.com', phone: '(808) 555-0512', role: 'title', company: 'Hawaii Title Co.', initials: 'KI' },
  { id: 'c-303', firstName: 'Mike', lastName: 'Souza', email: 'mike@oahuinspect.com', phone: '(808) 555-0633', role: 'inspector', company: 'Oahu Home Inspections', initials: 'MS' },
  { id: 'c-304', firstName: 'Lia', lastName: 'Park', email: 'lia@kapahuluescrow.com', phone: '(808) 555-0712', role: 'escrow', company: 'Kapahulu Escrow', initials: 'LP' },
  { id: 'c-305', firstName: 'Ryo', lastName: 'Honda', email: 'ryo@oahuphoto.com', phone: '(808) 555-0810', role: 'photographer', company: 'Oahu Real Estate Photo', initials: 'RH' },
  // Partner agent (licensed) for legal sign-off
  { id: 'c-306', firstName: 'Dana', lastName: 'Tanaka', email: 'dana@intelleqrealty.com', phone: '(808) 555-0911', role: 'inspector', company: 'IntelleQ Partner Agent · Lic. RB-22451', initials: 'DT' },
];

// =============================================================================
// LISTINGS — 5 Oahu properties (l-001 = Maya's home)
// =============================================================================

export const listings: Listing[] = [
  {
    id: 'l-001',
    sellerId: 'c-001',
    address: { line1: '1108 Auahi St #2204', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' },
    status: 'active',
    beds: 2, baths: 2, sqft: 1080, lotSqft: 0, yearBuilt: 2018,
    listPrice: 985_000, aiPriceLow: 965_000, aiPriceHigh: 1_010_000, aiConfidence: 0.88,
    daysOnMarket: 12,
    photoEmoji: '🏙️',
    aiTags: ['Floor-to-ceiling windows', 'Ocean view', 'Granite countertops', 'Stainless appliances', 'In-unit laundry', 'Pool & gym'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS', 'Zillow', 'Realtor.com', 'Instagram', 'Drip campaign (3,247 buyers)'],
    description: 'Stunning 22nd-floor 2BR/2BA in Anaha with sweeping Diamond Head and ocean views. Floor-to-ceiling windows, Bosch appliances, marble baths.',
    parking: 1,
    hoa: 1240,
  },
  {
    id: 'l-002',
    sellerId: 'c-002',
    address: { line1: '347 Kaha St', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' },
    status: 'active',
    beds: 4, baths: 3, sqft: 2340, lotSqft: 8120, yearBuilt: 1998,
    listPrice: 2_175_000, aiPriceLow: 2_115_000, aiPriceHigh: 2_240_000, aiConfidence: 0.81,
    daysOnMarket: 28,
    photoEmoji: '🌴',
    aiTags: ['Single-level', 'Pool', 'Solar PV', 'Walk to beach', 'Mature mango trees', 'Vaulted ceilings'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS', 'Zillow', 'Realtor.com'],
    description: 'Beach-side single-level in Kailua. 4BR/3BA with pool, owned solar, and mature landscaping. 0.4mi walk to Kailua Beach.',
    parking: 2,
  },
  {
    id: 'l-003',
    sellerId: 'c-003',
    address: { line1: '95-271 Waikalani Dr #B304', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' },
    status: 'active',
    beds: 3, baths: 2, sqft: 1310, lotSqft: 0, yearBuilt: 2005,
    listPrice: 745_000, aiPriceLow: 720_000, aiPriceHigh: 765_000, aiConfidence: 0.92,
    daysOnMarket: 5,
    photoEmoji: '🏘️',
    aiTags: ['Corner unit', 'Two parking', 'Quiet street', 'Updated kitchen', 'Walk to park'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS', 'Zillow'],
    description: 'Updated 3BR townhome in central Mililani. Corner unit with two assigned parking, near schools and community pool.',
    parking: 2,
    hoa: 510,
  },
  {
    id: 'l-004',
    sellerId: 'c-004',
    address: { line1: '538 Kawaihae St', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' },
    status: 'pending',
    beds: 4, baths: 3, sqft: 2680, lotSqft: 7100, yearBuilt: 1985,
    listPrice: 1_895_000, aiPriceLow: 1_840_000, aiPriceHigh: 1_950_000, aiConfidence: 0.85,
    daysOnMarket: 19,
    photoEmoji: '🏡',
    aiTags: ['Marina view', 'Boat dock access', 'Renovated 2022', 'Open floor plan', 'Two-car garage'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS', 'Zillow'],
    description: 'Renovated 4BR with marina views and boat dock access in Hawaii Kai. Open-concept living, two-car garage.',
    parking: 2,
  },
  {
    id: 'l-005',
    sellerId: 'c-005',
    address: { line1: '2843 Lowrey Ave', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' },
    status: 'active',
    beds: 3, baths: 2, sqft: 1720, lotSqft: 5400, yearBuilt: 1962,
    listPrice: 1_385_000, aiPriceLow: 1_340_000, aiPriceHigh: 1_420_000, aiConfidence: 0.74,
    daysOnMarket: 22,
    photoEmoji: '🌳',
    aiTags: ['Mid-century', 'Mature trees', 'Mountain view', 'Original hardwood', 'Needs kitchen update'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS'],
    description: 'Charming mid-century 3BR in upper Manoa with mountain views and mature landscaping. Original hardwood floors throughout.',
    parking: 2,
  },
];

// Maya's listing helper
export const myListing = listings[0]!;

// =============================================================================
// BUYERS — Alex Chen as the demo buyer persona
// =============================================================================

export const buyers: Buyer[] = [
  {
    id: 'b-001',
    contactId: 'c-101',
    preApproval: { status: 'approved', lender: 'First Pacific Mortgage', maxPrice: 850_000, expires: '2026-07-15' },
    searchCriteria: {
      minBeds: 2,
      minBaths: 2,
      priceMin: 600_000,
      priceMax: 850_000,
      cities: ['Honolulu', 'Mililani'],
      mustHave: ['Parking', 'In-unit laundry'],
    },
    dripActive: true,
    savedListingIds: ['l-001', 'l-003', 'l-005'],
    repAgreementSigned: true,
    notes: 'First-time buyer. Looking for condo or townhome. Wants to close before September.',
  },
];

// Alex's buyer
export const me = buyers[0]!;

// =============================================================================
// COMPS — keyed by listing id (used on /sell/cma for Maya's home)
// =============================================================================

export const compsByListing: Record<string, Comp[]> = {
  'l-001': [
    { id: 'cmp-1-1', address: { line1: '1108 Auahi St #1808', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 980_000, soldDate: '2026-02-14', beds: 2, baths: 2, sqft: 1062, lotSqft: 0, yearBuilt: 2018, distanceMi: 0.0, matchScore: 96, adjustments: { sqft: 6_500, time: 4_200, condition: 0, lot: 0 }, adjustedPrice: 990_700, photoEmoji: '🏙️' },
    { id: 'cmp-1-2', address: { line1: '1330 Ala Moana Blvd #1602', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 1_025_000, soldDate: '2026-01-22', beds: 2, baths: 2, sqft: 1115, lotSqft: 0, yearBuilt: 2017, distanceMi: 0.3, matchScore: 89, adjustments: { sqft: -12_500, time: 5_500, condition: -3_000, lot: 0 }, adjustedPrice: 1_015_000, photoEmoji: '🌆' },
    { id: 'cmp-1-3', address: { line1: '1118 Ala Moana Blvd #2906', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 945_000, soldDate: '2026-03-08', beds: 2, baths: 2, sqft: 1040, lotSqft: 0, yearBuilt: 2016, distanceMi: 0.2, matchScore: 84, adjustments: { sqft: 14_500, time: 1_500, condition: 5_000, lot: 0 }, adjustedPrice: 966_000, photoEmoji: '🏙️' },
    { id: 'cmp-1-4', address: { line1: '555 South St #2208', city: 'Honolulu', state: 'HI', zip: '96813', neighborhood: 'Downtown' }, soldPrice: 905_000, soldDate: '2026-02-28', beds: 2, baths: 2, sqft: 1090, lotSqft: 0, yearBuilt: 2019, distanceMi: 0.6, matchScore: 78, adjustments: { sqft: -3_500, time: 2_700, condition: 12_000, lot: 0 }, adjustedPrice: 916_200, photoEmoji: '🌃' },
    { id: 'cmp-1-5', address: { line1: '1009 Kapiolani Blvd #2104', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 1_055_000, soldDate: '2025-12-19', beds: 2, baths: 2, sqft: 1140, lotSqft: 0, yearBuilt: 2020, distanceMi: 0.4, matchScore: 82, adjustments: { sqft: -22_000, time: 11_000, condition: -8_000, lot: 0 }, adjustedPrice: 1_036_000, photoEmoji: '🏙️' },
    { id: 'cmp-1-6', address: { line1: '888 Kapiolani Blvd #1812', city: 'Honolulu', state: 'HI', zip: '96813', neighborhood: 'Kakaako' }, soldPrice: 925_000, soldDate: '2026-03-30', beds: 2, baths: 2, sqft: 1010, lotSqft: 0, yearBuilt: 2015, distanceMi: 0.5, matchScore: 76, adjustments: { sqft: 24_500, time: 800, condition: 6_500, lot: 0 }, adjustedPrice: 956_800, photoEmoji: '🌆' },
    { id: 'cmp-1-7', address: { line1: '1108 Auahi St #1402', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 968_000, soldDate: '2026-04-04', beds: 2, baths: 2, sqft: 1080, lotSqft: 0, yearBuilt: 2018, distanceMi: 0.0, matchScore: 94, adjustments: { sqft: 0, time: 200, condition: 0, lot: 0 }, adjustedPrice: 968_200, photoEmoji: '🏙️' },
    { id: 'cmp-1-8', address: { line1: '1330 Ala Moana Blvd #2401', city: 'Honolulu', state: 'HI', zip: '96814', neighborhood: 'Kakaako' }, soldPrice: 999_000, soldDate: '2026-01-08', beds: 2, baths: 2, sqft: 1075, lotSqft: 0, yearBuilt: 2017, distanceMi: 0.3, matchScore: 87, adjustments: { sqft: 1_000, time: 6_500, condition: 0, lot: 0 }, adjustedPrice: 1_006_500, photoEmoji: '🌆' },
  ],
  'l-003': [
    { id: 'cmp-3-1', address: { line1: '95-261 Waikalani Dr #C201', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 720_000, soldDate: '2026-03-12', beds: 3, baths: 2, sqft: 1290, lotSqft: 0, yearBuilt: 2004, distanceMi: 0.1, matchScore: 94, adjustments: { sqft: 4_800, time: 2_100, condition: 5_000, lot: 0 }, adjustedPrice: 731_900, photoEmoji: '🏘️' },
    { id: 'cmp-3-2', address: { line1: '95-340 Waikalani Dr #A102', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 755_000, soldDate: '2026-02-08', beds: 3, baths: 2, sqft: 1340, lotSqft: 0, yearBuilt: 2006, distanceMi: 0.2, matchScore: 91, adjustments: { sqft: -7_200, time: 4_500, condition: 0, lot: 0 }, adjustedPrice: 752_300, photoEmoji: '🏘️' },
    { id: 'cmp-3-3', address: { line1: '95-220 Hokuiwa St #C5', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 698_000, soldDate: '2026-01-19', beds: 3, baths: 2, sqft: 1280, lotSqft: 0, yearBuilt: 2003, distanceMi: 0.4, matchScore: 87, adjustments: { sqft: 7_200, time: 6_300, condition: 8_000, lot: 0 }, adjustedPrice: 719_500, photoEmoji: '🏘️' },
    { id: 'cmp-3-4', address: { line1: '95-178 Pikoi Pl', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 770_000, soldDate: '2026-03-28', beds: 3, baths: 2.5, sqft: 1380, lotSqft: 0, yearBuilt: 2008, distanceMi: 0.6, matchScore: 82, adjustments: { sqft: -16_800, time: 700, condition: -8_000, lot: 0 }, adjustedPrice: 745_900, photoEmoji: '🏠' },
    { id: 'cmp-3-5', address: { line1: '95-271 Waikalani Dr #B102', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 735_000, soldDate: '2026-04-04', beds: 3, baths: 2, sqft: 1310, lotSqft: 0, yearBuilt: 2005, distanceMi: 0.0, matchScore: 97, adjustments: { sqft: 0, time: 200, condition: 0, lot: 0 }, adjustedPrice: 735_200, photoEmoji: '🏘️' },
    { id: 'cmp-3-6', address: { line1: '95-156 Kuahelani Ave #A8', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 712_000, soldDate: '2026-02-22', beds: 3, baths: 2, sqft: 1295, lotSqft: 0, yearBuilt: 2002, distanceMi: 0.3, matchScore: 89, adjustments: { sqft: 1_800, time: 3_500, condition: 7_500, lot: 0 }, adjustedPrice: 724_800, photoEmoji: '🏘️' },
  ],
  'l-005': [
    { id: 'cmp-5-1', address: { line1: '2812 Lowrey Ave', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_310_000, soldDate: '2026-02-08', beds: 3, baths: 2, sqft: 1680, lotSqft: 5200, yearBuilt: 1958, distanceMi: 0.1, matchScore: 92, adjustments: { sqft: 6_400, time: 5_900, condition: 12_000, lot: 1_400 }, adjustedPrice: 1_335_700, photoEmoji: '🌳' },
    { id: 'cmp-5-2', address: { line1: '2965 East Manoa Rd', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_440_000, soldDate: '2026-03-15', beds: 3, baths: 2, sqft: 1820, lotSqft: 5800, yearBuilt: 1966, distanceMi: 0.5, matchScore: 84, adjustments: { sqft: -16_000, time: 3_200, condition: -22_000, lot: -2_800 }, adjustedPrice: 1_402_400, photoEmoji: '🌿' },
    { id: 'cmp-5-3', address: { line1: '2710 Pamoa Rd', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_265_000, soldDate: '2026-01-12', beds: 3, baths: 2, sqft: 1640, lotSqft: 5100, yearBuilt: 1955, distanceMi: 0.7, matchScore: 76, adjustments: { sqft: 12_800, time: 8_700, condition: 28_000, lot: 1_500 }, adjustedPrice: 1_316_000, photoEmoji: '🌳' },
  ],
};

// =============================================================================
// INCOMING OFFERS — on Maya's listing (the seller's marketing page)
// =============================================================================

export interface IncomingOffer {
  id: string;
  buyerContactId: string;
  buyerLabel: string; // anonymized: "Buyer 1", or use first name
  offerPrice: number;
  earnestMoney: number;
  contingencies: ('inspection' | 'financing' | 'appraisal')[];
  closeDate: string;
  status: 'received' | 'reviewed' | 'countered' | 'accepted' | 'rejected';
  receivedDate: string;
  aiAnalysis: string;
  preApproved: boolean;
}

export const incomingOffersForMyHome: IncomingOffer[] = [
  {
    id: 'in-1',
    buyerContactId: 'c-201',
    buyerLabel: 'Jordan W. · pre-approved',
    offerPrice: 968_000,
    earnestMoney: 25_000,
    contingencies: ['inspection', 'financing', 'appraisal'],
    closeDate: '2026-06-15',
    status: 'received',
    receivedDate: '2026-04-26',
    aiAnalysis: 'Below your AI-recommended range ($965k–$1.01M). Reasonable opening offer. Strong financing — pre-approved with First Pacific. Recommend countering at $988k.',
    preApproved: true,
  },
  {
    id: 'in-2',
    buyerContactId: 'c-202',
    buyerLabel: 'Mei T. · cash buyer',
    offerPrice: 945_000,
    earnestMoney: 50_000,
    contingencies: ['inspection'],
    closeDate: '2026-05-15',
    status: 'received',
    receivedDate: '2026-04-27',
    aiAnalysis: 'Cash offer with 30-day close — strong terms. Price is $20k below your AI midpoint. Recommend counter to $985k cash, accept the 30-day timeline.',
    preApproved: true,
  },
];

// =============================================================================
// ALEX'S OUTGOING OFFER (on Mililani #B304)
// =============================================================================

export const alexOutgoingOffer = {
  id: 'out-1',
  listingId: 'l-003',
  offerPrice: 745_000,
  earnestMoney: 18_000,
  contingencies: ['inspection', 'financing', 'appraisal'] as const,
  closeDate: '2026-06-30',
  status: 'sent' as const,
  sentDate: '2026-04-26',
  aiAnalysis: 'Right at list price — competitive but not aggressive. Strong financing position (pre-approved). 50% probability of acceptance based on 5-day market exposure.',
};

// =============================================================================
// MILESTONES — keyed by deal id
// =============================================================================

export const sellTimeline: TimelineMilestone[] = [
  { id: 'sm-1', dealId: 'sell-active', label: 'Identity & ownership verified', dueDate: '2026-04-15', completedDate: '2026-04-15', status: 'done', ownerRole: 'agent' },
  { id: 'sm-2', dealId: 'sell-active', label: 'Title report — clear', dueDate: '2026-04-18', completedDate: '2026-04-18', status: 'done', ownerRole: 'title' },
  { id: 'sm-3', dealId: 'sell-active', label: 'Property intake complete', dueDate: '2026-04-17', completedDate: '2026-04-16', status: 'done', ownerRole: 'seller' },
  { id: 'sm-4', dealId: 'sell-active', label: 'Photos taken & AI-tagged', dueDate: '2026-04-20', completedDate: '2026-04-20', status: 'done', ownerRole: 'agent' },
  { id: 'sm-5', dealId: 'sell-active', label: 'AI valuation complete', dueDate: '2026-04-21', completedDate: '2026-04-21', status: 'done', ownerRole: 'agent' },
  { id: 'sm-6', dealId: 'sell-active', label: 'Listing agreement signed', dueDate: '2026-04-21', completedDate: '2026-04-21', status: 'done', ownerRole: 'seller', fiduciaryFlag: 'Disclosures presented and acknowledged' },
  { id: 'sm-7', dealId: 'sell-active', label: 'MLS active + marketing live', dueDate: '2026-04-22', completedDate: '2026-04-22', status: 'done', ownerRole: 'agent' },
  { id: 'sm-8', dealId: 'sell-active', label: 'Reviewing offers', dueDate: '2026-04-29', status: 'in_progress', ownerRole: 'seller', description: '2 offers received — see Marketing tab' },
  { id: 'sm-9', dealId: 'sell-active', label: 'Open escrow', dueDate: '2026-05-04', status: 'upcoming', ownerRole: 'escrow' },
  { id: 'sm-10', dealId: 'sell-active', label: 'Inspection contingency window', dueDate: '2026-05-19', status: 'upcoming', ownerRole: 'buyer' },
  { id: 'sm-11', dealId: 'sell-active', label: 'Final walk-through', dueDate: '2026-06-09', status: 'upcoming', ownerRole: 'buyer' },
  { id: 'sm-12', dealId: 'sell-active', label: 'Close & funds released', dueDate: '2026-06-12', status: 'upcoming', ownerRole: 'escrow' },
];

export const buyTimeline: TimelineMilestone[] = [
  { id: 'bm-1', dealId: 'buy-active', label: 'Pre-approval complete', dueDate: '2026-04-08', completedDate: '2026-04-08', status: 'done', ownerRole: 'lender' },
  { id: 'bm-2', dealId: 'buy-active', label: 'Buyer agreement signed', dueDate: '2026-04-10', completedDate: '2026-04-10', status: 'done', ownerRole: 'buyer' },
  { id: 'bm-3', dealId: 'buy-active', label: 'Search criteria locked', dueDate: '2026-04-11', completedDate: '2026-04-11', status: 'done', ownerRole: 'agent' },
  { id: 'bm-4', dealId: 'buy-active', label: 'Toured Anaha #2204', dueDate: '2026-04-25', completedDate: '2026-04-25', status: 'done', ownerRole: 'agent' },
  { id: 'bm-5', dealId: 'buy-active', label: 'Toured Mililani #B304', dueDate: '2026-04-25', completedDate: '2026-04-25', status: 'done', ownerRole: 'agent' },
  { id: 'bm-6', dealId: 'buy-active', label: 'Offer sent on Mililani #B304', dueDate: '2026-04-26', completedDate: '2026-04-26', status: 'done', ownerRole: 'agent' },
  { id: 'bm-7', dealId: 'buy-active', label: 'Awaiting seller response', dueDate: '2026-04-29', status: 'in_progress', ownerRole: 'seller' },
  { id: 'bm-8', dealId: 'buy-active', label: 'Open escrow', dueDate: '2026-05-04', status: 'upcoming', ownerRole: 'escrow' },
  { id: 'bm-9', dealId: 'buy-active', label: 'Inspection', dueDate: '2026-05-12', status: 'upcoming', ownerRole: 'inspector' },
  { id: 'bm-10', dealId: 'buy-active', label: 'Loan appraisal & underwriting', dueDate: '2026-05-26', status: 'upcoming', ownerRole: 'lender' },
  { id: 'bm-11', dealId: 'buy-active', label: 'Final walk-through', dueDate: '2026-06-26', status: 'upcoming', ownerRole: 'buyer' },
  { id: 'bm-12', dealId: 'buy-active', label: 'Close — keys & moving day 🎉', dueDate: '2026-06-30', status: 'upcoming', ownerRole: 'escrow' },
];

// =============================================================================
// DOCUMENTS
// =============================================================================

export const sellDocuments: DocumentRef[] = [
  { id: 'sd-1', dealId: 'sell-active', name: 'Listing Agreement — 1108 Auahi #2204', type: 'listing_agreement', status: 'signed', signedDate: '2026-04-21' },
  { id: 'sd-2', dealId: 'sell-active', name: 'Seller Property Disclosure', type: 'disclosure', status: 'signed', signedDate: '2026-04-21' },
  { id: 'sd-3', dealId: 'sell-active', name: 'Lead-Based Paint Disclosure', type: 'disclosure', status: 'signed', signedDate: '2026-04-21' },
  { id: 'sd-4', dealId: 'sell-active', name: 'HOA Disclosure Packet', type: 'disclosure', status: 'sent' },
  { id: 'sd-5', dealId: 'sell-active', name: 'Counter-offer to Jordan W.', type: 'addendum', status: 'unsigned' },
];

export const buyDocuments: DocumentRef[] = [
  { id: 'bd-1', dealId: 'buy-active', name: 'Buyer Representation Agreement', type: 'buyer_rep', status: 'signed', signedDate: '2026-04-10' },
  { id: 'bd-2', dealId: 'buy-active', name: 'Pre-approval letter — First Pacific', type: 'disclosure', status: 'signed', signedDate: '2026-04-08' },
  { id: 'bd-3', dealId: 'buy-active', name: 'Purchase Offer — 95-271 Waikalani #B304', type: 'offer', status: 'sent' },
];

// =============================================================================
// ALERTS
// =============================================================================

export const sellAlerts: Alert[] = [
  { id: 'sa-1', severity: 'success', title: 'New offer received', body: 'Jordan W. submitted $968,000 with full financing. AI analysis ready.', timestamp: '2026-04-27T07:14:00Z', unread: true },
  { id: 'sa-2', severity: 'success', title: 'Cash offer received', body: 'Mei T. submitted $945,000 cash with 30-day close.', timestamp: '2026-04-27T06:50:00Z', unread: true },
  { id: 'sa-3', severity: 'info', title: '142 buyers viewed your listing today', body: '3,247 matched buyers in your AI drip campaign so far. 18% open rate.', timestamp: '2026-04-26T18:00:00Z', unread: false },
];

export const buyAlerts: Alert[] = [
  { id: 'ba-1', severity: 'info', title: 'Awaiting seller response', body: 'Your offer on Mililani #B304 was sent yesterday. Sellers usually respond within 48 hours.', timestamp: '2026-04-27T08:00:00Z', unread: true },
  { id: 'ba-2', severity: 'success', title: '3 new homes match your criteria', body: 'AI found 3 new listings under $850k in Honolulu/Mililani. View them in your feed.', timestamp: '2026-04-27T06:30:00Z', unread: true },
  { id: 'ba-3', severity: 'warning', title: 'Pre-approval renews soon', body: 'Your pre-approval expires July 15. AI will auto-renew with First Pacific 30 days before.', timestamp: '2026-04-25T14:00:00Z', unread: false },
];

// Lender + title for "your team"
export const sellTeam = ['c-302', 'c-303', 'c-304', 'c-305', 'c-306']; // title, inspector, escrow, photographer, partner agent
export const buyTeam = ['c-301', 'c-302', 'c-304', 'c-303', 'c-306']; // lender, title, escrow, inspector, partner agent
