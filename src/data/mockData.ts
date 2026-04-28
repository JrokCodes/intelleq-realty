import type {
  Contact,
  Listing,
  Buyer,
  Comp,
  Deal,
  TimelineMilestone,
  DocumentRef,
  Alert,
  Offer,
} from '@/lib/types';

// =============================================================================
// CONTACTS — 12 (sellers, buyers, partners)
// =============================================================================

export const contacts: Contact[] = [
  { id: 'c-001', firstName: 'Malia', lastName: 'Kahale', email: 'malia.k@example.com', phone: '(808) 555-0142', role: 'seller', initials: 'MK', notes: 'Relocating to mainland for job. Wants to close before September.' },
  { id: 'c-002', firstName: 'David', lastName: 'Lim', email: 'david.lim@example.com', phone: '(808) 555-0177', role: 'seller', initials: 'DL', notes: 'Inherited property, no urgency. Wants top dollar.' },
  { id: 'c-003', firstName: 'Sarah', lastName: 'Otani', email: 'sarah.otani@example.com', phone: '(808) 555-0163', role: 'seller', initials: 'SO', notes: 'Downsizing, kids graduated.' },
  { id: 'c-004', firstName: 'James', lastName: 'Park', email: 'james.park@example.com', phone: '(808) 555-0189', role: 'seller', initials: 'JP' },
  { id: 'c-005', firstName: 'Lina', lastName: 'Chun', email: 'lina.chun@example.com', phone: '(808) 555-0119', role: 'seller', initials: 'LC' },

  { id: 'c-101', firstName: 'Trevor', lastName: 'Nakamura', email: 'trevor.n@example.com', phone: '(808) 555-0204', role: 'buyer', initials: 'TN', notes: 'First-time buyer. Very engaged on drip emails.' },
  { id: 'c-102', firstName: 'Priya', lastName: 'Shah', email: 'priya.s@example.com', phone: '(808) 555-0287', role: 'buyer', initials: 'PS', notes: 'Cash buyer, relocating from California.' },
  { id: 'c-103', firstName: 'Kai', lastName: 'Maeda', email: 'kai.maeda@example.com', phone: '(808) 555-0316', role: 'buyer', initials: 'KM' },
  { id: 'c-104', firstName: 'Ashley', lastName: 'Wong', email: 'ashley.wong@example.com', phone: '(808) 555-0335', role: 'buyer', initials: 'AW' },

  { id: 'c-201', firstName: 'Brett', lastName: 'Yamamoto', email: 'brett.y@firstpacific.com', phone: '(808) 555-0411', role: 'lender', company: 'First Pacific Mortgage', initials: 'BY' },
  { id: 'c-202', firstName: 'Karen', lastName: 'Ito', email: 'karen@hawaiititle.com', phone: '(808) 555-0512', role: 'title', company: 'Hawaii Title Co.', initials: 'KI' },
  { id: 'c-203', firstName: 'Mike', lastName: 'Souza', email: 'mike@oahuinspect.com', phone: '(808) 555-0633', role: 'inspector', company: 'Oahu Home Inspections', initials: 'MS' },
];

// =============================================================================
// LISTINGS — 5 Oahu properties
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
    marketingChannels: ['MLS', 'Zillow', 'Instagram', 'Drip campaign (3,247 buyers)'],
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
    aiTags: ['Single-level', 'Pool', 'Solar PV', 'Walk to beach (0.4mi)', 'Mature mango trees', 'Vaulted ceilings'],
    intakeComplete: true,
    titleStatus: 'clear',
    marketingChannels: ['MLS', 'Zillow', 'Realtor.com', 'Open house Sat'],
    description: 'Beach-side single-level in coveted Kailua. 4BR/3BA with pool, owned solar, and mature landscaping. 0.4mi walk to Kailua Beach.',
    parking: 2,
  },
  {
    id: 'l-003',
    sellerId: 'c-003',
    address: { line1: '95-271 Waikalani Dr #B304', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' },
    status: 'pre_market',
    beds: 3, baths: 2, sqft: 1310, lotSqft: 0, yearBuilt: 2005,
    listPrice: 745_000, aiPriceLow: 720_000, aiPriceHigh: 765_000, aiConfidence: 0.92,
    daysOnMarket: 0,
    photoEmoji: '🏘️',
    aiTags: ['Corner unit', 'Two parking', 'Quiet street', 'Updated kitchen', 'Walk to park'],
    intakeComplete: true,
    titleStatus: 'pending',
    marketingChannels: ['MLS scheduled Mon'],
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
    marketingChannels: ['MLS', 'Zillow', 'Drip campaign'],
    description: 'Renovated 4BR with marina views and boat dock access in Hawaii Kai. Open-concept living, two-car garage.',
    parking: 2,
  },
  {
    id: 'l-005',
    sellerId: 'c-005',
    address: { line1: '2843 Lowrey Ave', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' },
    status: 'draft',
    beds: 3, baths: 2, sqft: 1720, lotSqft: 5400, yearBuilt: 1962,
    listPrice: 1_385_000, aiPriceLow: 1_340_000, aiPriceHigh: 1_420_000, aiConfidence: 0.74,
    daysOnMarket: 0,
    photoEmoji: '🌳',
    aiTags: ['Mid-century', 'Mature trees', 'Mountain view', 'Original hardwood', 'Needs kitchen update'],
    intakeComplete: false,
    titleStatus: 'pending',
    marketingChannels: [],
    description: 'Charming mid-century 3BR in upper Manoa with mountain views and mature landscaping. Original hardwood floors throughout.',
    parking: 2,
  },
];

// =============================================================================
// BUYERS — 4
// =============================================================================

export const buyers: Buyer[] = [
  {
    id: 'b-001',
    contactId: 'c-101',
    preApproval: { status: 'approved', lender: 'First Pacific Mortgage', maxPrice: 850_000, expires: '2026-07-15' },
    searchCriteria: { minBeds: 2, minBaths: 2, priceMin: 600_000, priceMax: 850_000, cities: ['Honolulu', 'Mililani'], mustHave: ['Parking', 'In-unit laundry'] },
    dripActive: true, savedListingIds: ['l-001', 'l-003'], repAgreementSigned: true,
    notes: 'Engaged on every drip email. Toured 4 properties. Ready to write offer on right one.',
  },
  {
    id: 'b-002',
    contactId: 'c-102',
    preApproval: { status: 'approved', lender: 'Cash', maxPrice: 2_500_000 },
    searchCriteria: { minBeds: 4, minBaths: 3, priceMin: 1_800_000, priceMax: 2_500_000, cities: ['Kailua', 'Hawaii Kai', 'Honolulu'], mustHave: ['Pool', 'Single-level preferred'] },
    dripActive: true, savedListingIds: ['l-002', 'l-004'], repAgreementSigned: true,
    notes: 'Cash relocation buyer from Bay Area. Wants to close in 30 days.',
  },
  {
    id: 'b-003',
    contactId: 'c-103',
    preApproval: { status: 'pending', lender: 'First Pacific Mortgage' },
    searchCriteria: { minBeds: 3, minBaths: 2, priceMin: 700_000, priceMax: 950_000, cities: ['Mililani', 'Pearl City', 'Aiea'], mustHave: ['Garage'] },
    dripActive: true, savedListingIds: ['l-003'], repAgreementSigned: false,
    notes: 'Pre-approval expected by Friday. Send rep agreement once approved.',
  },
  {
    id: 'b-004',
    contactId: 'c-104',
    preApproval: { status: 'none' },
    searchCriteria: { minBeds: 2, minBaths: 1, priceMin: 500_000, priceMax: 750_000, cities: ['Honolulu'], mustHave: [] },
    dripActive: false, savedListingIds: [], repAgreementSigned: false,
    notes: 'New lead. Needs lender intro before searching.',
  },
];

// =============================================================================
// COMPS — keyed by listing id
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
  'l-002': [
    { id: 'cmp-2-1', address: { line1: '512 Kaumakani Pl', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 2_080_000, soldDate: '2026-02-04', beds: 4, baths: 3, sqft: 2280, lotSqft: 7800, yearBuilt: 1995, distanceMi: 0.4, matchScore: 92, adjustments: { sqft: 24_000, time: 9_000, condition: 0, lot: 5_500, }, adjustedPrice: 2_118_500, photoEmoji: '🌴' },
    { id: 'cmp-2-2', address: { line1: '1244 Mokulua Dr', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 2_350_000, soldDate: '2026-03-18', beds: 4, baths: 3, sqft: 2510, lotSqft: 8400, yearBuilt: 2001, distanceMi: 0.7, matchScore: 84, adjustments: { sqft: -68_000, time: 4_700, condition: -25_000, lot: -3_500 }, adjustedPrice: 2_258_200, photoEmoji: '🏖️' },
    { id: 'cmp-2-3', address: { line1: '88 Kuumele Pl', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 1_975_000, soldDate: '2026-01-30', beds: 4, baths: 2, sqft: 2150, lotSqft: 7900, yearBuilt: 1992, distanceMi: 0.6, matchScore: 76, adjustments: { sqft: 76_000, time: 11_500, condition: 18_000, lot: 2_500 }, adjustedPrice: 2_083_000, photoEmoji: '🌴' },
    { id: 'cmp-2-4', address: { line1: '420 Kaha St', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 2_125_000, soldDate: '2026-04-02', beds: 4, baths: 3, sqft: 2305, lotSqft: 8050, yearBuilt: 2000, distanceMi: 0.1, matchScore: 95, adjustments: { sqft: 14_000, time: 800, condition: 0, lot: 1_000 }, adjustedPrice: 2_140_800, photoEmoji: '🌴' },
    { id: 'cmp-2-5', address: { line1: '660 Manono St', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 2_290_000, soldDate: '2026-02-25', beds: 5, baths: 3, sqft: 2480, lotSqft: 8500, yearBuilt: 2003, distanceMi: 0.5, matchScore: 79, adjustments: { sqft: -56_000, time: 5_500, condition: -10_000, lot: -4_000 }, adjustedPrice: 2_225_500, photoEmoji: '🏝️' },
    { id: 'cmp-2-6', address: { line1: '1812 Kalanianaole Hwy', city: 'Kailua', state: 'HI', zip: '96734', neighborhood: 'Kailua' }, soldPrice: 1_890_000, soldDate: '2026-03-10', beds: 4, baths: 3, sqft: 2240, lotSqft: 7600, yearBuilt: 1990, distanceMi: 0.9, matchScore: 71, adjustments: { sqft: 30_000, time: 3_400, condition: 22_000, lot: 6_500 }, adjustedPrice: 1_951_900, photoEmoji: '🌴' },
  ],
  'l-003': [
    { id: 'cmp-3-1', address: { line1: '95-261 Waikalani Dr #C201', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 720_000, soldDate: '2026-03-12', beds: 3, baths: 2, sqft: 1290, lotSqft: 0, yearBuilt: 2004, distanceMi: 0.1, matchScore: 94, adjustments: { sqft: 4_800, time: 2_100, condition: 5_000, lot: 0 }, adjustedPrice: 731_900, photoEmoji: '🏘️' },
    { id: 'cmp-3-2', address: { line1: '95-340 Waikalani Dr #A102', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 755_000, soldDate: '2026-02-08', beds: 3, baths: 2, sqft: 1340, lotSqft: 0, yearBuilt: 2006, distanceMi: 0.2, matchScore: 91, adjustments: { sqft: -7_200, time: 4_500, condition: 0, lot: 0 }, adjustedPrice: 752_300, photoEmoji: '🏘️' },
    { id: 'cmp-3-3', address: { line1: '95-220 Hokuiwa St #C5', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 698_000, soldDate: '2026-01-19', beds: 3, baths: 2, sqft: 1280, lotSqft: 0, yearBuilt: 2003, distanceMi: 0.4, matchScore: 87, adjustments: { sqft: 7_200, time: 6_300, condition: 8_000, lot: 0 }, adjustedPrice: 719_500, photoEmoji: '🏘️' },
    { id: 'cmp-3-4', address: { line1: '95-178 Pikoi Pl', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 770_000, soldDate: '2026-03-28', beds: 3, baths: 2.5, sqft: 1380, lotSqft: 0, yearBuilt: 2008, distanceMi: 0.6, matchScore: 82, adjustments: { sqft: -16_800, time: 700, condition: -8_000, lot: 0 }, adjustedPrice: 745_900, photoEmoji: '🏠' },
    { id: 'cmp-3-5', address: { line1: '95-271 Waikalani Dr #B102', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 735_000, soldDate: '2026-04-04', beds: 3, baths: 2, sqft: 1310, lotSqft: 0, yearBuilt: 2005, distanceMi: 0.0, matchScore: 97, adjustments: { sqft: 0, time: 200, condition: 0, lot: 0 }, adjustedPrice: 735_200, photoEmoji: '🏘️' },
    { id: 'cmp-3-6', address: { line1: '95-156 Kuahelani Ave #A8', city: 'Mililani', state: 'HI', zip: '96789', neighborhood: 'Mililani' }, soldPrice: 712_000, soldDate: '2026-02-22', beds: 3, baths: 2, sqft: 1295, lotSqft: 0, yearBuilt: 2002, distanceMi: 0.3, matchScore: 89, adjustments: { sqft: 1_800, time: 3_500, condition: 7_500, lot: 0 }, adjustedPrice: 724_800, photoEmoji: '🏘️' },
  ],
  'l-004': [
    { id: 'cmp-4-1', address: { line1: '470 Kawaihae St', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' }, soldPrice: 1_840_000, soldDate: '2026-02-12', beds: 4, baths: 3, sqft: 2580, lotSqft: 6900, yearBuilt: 1982, distanceMi: 0.1, matchScore: 93, adjustments: { sqft: 12_000, time: 6_500, condition: 8_000, lot: 1_400 }, adjustedPrice: 1_867_900, photoEmoji: '🏡' },
    { id: 'cmp-4-2', address: { line1: '6310 Lalea Pl', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' }, soldPrice: 2_010_000, soldDate: '2026-03-04', beds: 4, baths: 3, sqft: 2740, lotSqft: 7400, yearBuilt: 1988, distanceMi: 0.4, matchScore: 86, adjustments: { sqft: -7_200, time: 3_400, condition: -12_000, lot: -2_100 }, adjustedPrice: 1_992_100, photoEmoji: '🏠' },
    { id: 'cmp-4-3', address: { line1: '7011 Hawaii Kai Dr', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' }, soldPrice: 1_750_000, soldDate: '2026-01-15', beds: 4, baths: 3, sqft: 2510, lotSqft: 7000, yearBuilt: 1980, distanceMi: 0.6, matchScore: 78, adjustments: { sqft: 20_400, time: 9_500, condition: 25_000, lot: 700 }, adjustedPrice: 1_805_600, photoEmoji: '🏡' },
    { id: 'cmp-4-4', address: { line1: '450 Pakui St', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' }, soldPrice: 1_925_000, soldDate: '2026-03-22', beds: 4, baths: 3, sqft: 2640, lotSqft: 7150, yearBuilt: 1986, distanceMi: 0.3, matchScore: 90, adjustments: { sqft: 1_600, time: 1_800, condition: 0, lot: 200 }, adjustedPrice: 1_928_600, photoEmoji: '🏠' },
    { id: 'cmp-4-5', address: { line1: '538 Hawaii Kai Dr', city: 'Honolulu', state: 'HI', zip: '96825', neighborhood: 'Hawaii Kai' }, soldPrice: 2_080_000, soldDate: '2026-04-01', beds: 5, baths: 3, sqft: 2820, lotSqft: 7400, yearBuilt: 1990, distanceMi: 0.2, matchScore: 82, adjustments: { sqft: -22_400, time: 1_000, condition: -15_000, lot: -2_100 }, adjustedPrice: 2_041_500, photoEmoji: '🌊' },
  ],
  'l-005': [
    { id: 'cmp-5-1', address: { line1: '2812 Lowrey Ave', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_310_000, soldDate: '2026-02-08', beds: 3, baths: 2, sqft: 1680, lotSqft: 5200, yearBuilt: 1958, distanceMi: 0.1, matchScore: 92, adjustments: { sqft: 6_400, time: 5_900, condition: 12_000, lot: 1_400 }, adjustedPrice: 1_335_700, photoEmoji: '🌳' },
    { id: 'cmp-5-2', address: { line1: '2965 East Manoa Rd', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_440_000, soldDate: '2026-03-15', beds: 3, baths: 2, sqft: 1820, lotSqft: 5800, yearBuilt: 1966, distanceMi: 0.5, matchScore: 84, adjustments: { sqft: -16_000, time: 3_200, condition: -22_000, lot: -2_800 }, adjustedPrice: 1_402_400, photoEmoji: '🌿' },
    { id: 'cmp-5-3', address: { line1: '2710 Pamoa Rd', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_265_000, soldDate: '2026-01-12', beds: 3, baths: 2, sqft: 1640, lotSqft: 5100, yearBuilt: 1955, distanceMi: 0.7, matchScore: 76, adjustments: { sqft: 12_800, time: 8_700, condition: 28_000, lot: 1_500 }, adjustedPrice: 1_316_000, photoEmoji: '🌳' },
    { id: 'cmp-5-4', address: { line1: '3120 Beaumont Woods Pl', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_410_000, soldDate: '2026-03-28', beds: 3, baths: 2, sqft: 1750, lotSqft: 5500, yearBuilt: 1968, distanceMi: 0.6, matchScore: 81, adjustments: { sqft: -3_000, time: 1_400, condition: -8_000, lot: -300 }, adjustedPrice: 1_400_100, photoEmoji: '🏡' },
    { id: 'cmp-5-5', address: { line1: '2840 Lowrey Ave', city: 'Honolulu', state: 'HI', zip: '96822', neighborhood: 'Manoa' }, soldPrice: 1_355_000, soldDate: '2026-04-08', beds: 3, baths: 2, sqft: 1700, lotSqft: 5350, yearBuilt: 1960, distanceMi: 0.0, matchScore: 95, adjustments: { sqft: 2_000, time: 200, condition: 0, lot: 200 }, adjustedPrice: 1_357_400, photoEmoji: '🌳' },
  ],
};

// =============================================================================
// DEALS — 6 (4 sell, 2 buy)
// =============================================================================

export const deals: Deal[] = [
  { id: 'd-001', side: 'sell', stage: 'listed', listingId: 'l-001', sellerId: 'c-001', price: 985_000, openedDate: '2026-04-15', expectedCloseDate: '2026-06-12', onTrack: 'yes', commissionEst: 24_625, notes: '3 showings scheduled this week. Anaha unit, strong interest.' },
  { id: 'd-002', side: 'sell', stage: 'listed', listingId: 'l-002', sellerId: 'c-002', price: 2_175_000, openedDate: '2026-03-30', expectedCloseDate: '2026-06-30', onTrack: 'at_risk', commissionEst: 54_375, notes: 'Sale at 28 DOM. Need to consider a price refresh after Sunday open house.' },
  { id: 'd-003', side: 'sell', stage: 'cma', listingId: 'l-003', sellerId: 'c-003', price: 745_000, openedDate: '2026-04-22', expectedCloseDate: '2026-07-15', onTrack: 'yes', commissionEst: 18_625, notes: 'Pre-market. Hits MLS Monday. Photographer scheduled Friday.' },
  { id: 'd-004', side: 'sell', stage: 'under_contract', listingId: 'l-004', sellerId: 'c-004', price: 1_895_000, openedDate: '2026-04-01', expectedCloseDate: '2026-05-15', onTrack: 'overdue', commissionEst: 47_375, notes: 'Inspection contingency expires in 2 days. Buyer requested 3 repairs.' },
  { id: 'd-101', side: 'buy', stage: 'searching', buyerId: 'b-001', price: 800_000, openedDate: '2026-04-08', expectedCloseDate: '2026-08-15', onTrack: 'yes', commissionEst: 20_000, notes: 'Saved 2 listings. Touring l-003 this weekend.' },
  { id: 'd-102', side: 'buy', stage: 'offer', buyerId: 'b-002', listingId: 'l-002', price: 2_100_000, openedDate: '2026-04-19', expectedCloseDate: '2026-05-20', onTrack: 'at_risk', commissionEst: 52_500, notes: 'Cash buyer, offer at $2.1M (3.5% under list). Awaiting seller response.' },
];

// =============================================================================
// MILESTONES — keyed by deal id
// =============================================================================

export const milestonesByDeal: Record<string, TimelineMilestone[]> = {
  'd-001': [
    { id: 'm-1-1', dealId: 'd-001', label: 'Identity verified', dueDate: '2026-04-15', completedDate: '2026-04-15', status: 'done', ownerRole: 'agent' },
    { id: 'm-1-2', dealId: 'd-001', label: 'Title report ordered', dueDate: '2026-04-16', completedDate: '2026-04-16', status: 'done', ownerRole: 'title' },
    { id: 'm-1-3', dealId: 'd-001', label: 'Title report received — clear', dueDate: '2026-04-19', completedDate: '2026-04-18', status: 'done', ownerRole: 'title' },
    { id: 'm-1-4', dealId: 'd-001', label: 'CMA generated', dueDate: '2026-04-17', completedDate: '2026-04-16', status: 'done', ownerRole: 'agent' },
    { id: 'm-1-5', dealId: 'd-001', label: 'Listing agreement signed', dueDate: '2026-04-19', completedDate: '2026-04-19', status: 'done', ownerRole: 'seller', fiduciaryFlag: 'Required disclosures presented' },
    { id: 'm-1-6', dealId: 'd-001', label: 'Photography complete', dueDate: '2026-04-20', completedDate: '2026-04-20', status: 'done', ownerRole: 'agent' },
    { id: 'm-1-7', dealId: 'd-001', label: 'MLS active', dueDate: '2026-04-21', completedDate: '2026-04-21', status: 'done', ownerRole: 'agent' },
    { id: 'm-1-8', dealId: 'd-001', label: 'First showings', dueDate: '2026-04-25', status: 'in_progress', ownerRole: 'agent' },
    { id: 'm-1-9', dealId: 'd-001', label: 'Open house Saturday', dueDate: '2026-05-04', status: 'upcoming', ownerRole: 'agent' },
    { id: 'm-1-10', dealId: 'd-001', label: 'Review offers / counter', dueDate: '2026-05-15', status: 'upcoming', ownerRole: 'agent' },
    { id: 'm-1-11', dealId: 'd-001', label: 'Close', dueDate: '2026-06-12', status: 'upcoming', ownerRole: 'escrow' },
  ],
  'd-002': [
    { id: 'm-2-1', dealId: 'd-002', label: 'Identity verified', dueDate: '2026-03-30', completedDate: '2026-03-30', status: 'done', ownerRole: 'agent' },
    { id: 'm-2-2', dealId: 'd-002', label: 'Title clear', dueDate: '2026-04-02', completedDate: '2026-04-04', status: 'done', ownerRole: 'title' },
    { id: 'm-2-3', dealId: 'd-002', label: 'CMA generated', dueDate: '2026-04-01', completedDate: '2026-04-01', status: 'done', ownerRole: 'agent' },
    { id: 'm-2-4', dealId: 'd-002', label: 'Listing agreement signed', dueDate: '2026-04-04', completedDate: '2026-04-05', status: 'done', ownerRole: 'seller' },
    { id: 'm-2-5', dealId: 'd-002', label: 'MLS active', dueDate: '2026-04-06', completedDate: '2026-04-06', status: 'done', ownerRole: 'agent' },
    { id: 'm-2-6', dealId: 'd-002', label: 'Drip campaign launched', dueDate: '2026-04-07', completedDate: '2026-04-07', status: 'done', ownerRole: 'agent' },
    { id: 'm-2-7', dealId: 'd-002', label: 'Open house #1', dueDate: '2026-04-13', completedDate: '2026-04-13', status: 'done', ownerRole: 'agent' },
    { id: 'm-2-8', dealId: 'd-002', label: 'Price refresh decision', dueDate: '2026-04-26', status: 'at_risk', ownerRole: 'agent', fiduciaryFlag: 'Discuss list-price reduction with seller' },
    { id: 'm-2-9', dealId: 'd-002', label: 'Open house #2', dueDate: '2026-05-04', status: 'upcoming', ownerRole: 'agent' },
    { id: 'm-2-10', dealId: 'd-002', label: 'Close', dueDate: '2026-06-30', status: 'upcoming', ownerRole: 'escrow' },
  ],
  'd-003': [
    { id: 'm-3-1', dealId: 'd-003', label: 'Identity verified', dueDate: '2026-04-22', completedDate: '2026-04-22', status: 'done', ownerRole: 'agent' },
    { id: 'm-3-2', dealId: 'd-003', label: 'Title report ordered', dueDate: '2026-04-23', completedDate: '2026-04-23', status: 'done', ownerRole: 'title' },
    { id: 'm-3-3', dealId: 'd-003', label: 'Title report received', dueDate: '2026-04-26', status: 'in_progress', ownerRole: 'title' },
    { id: 'm-3-4', dealId: 'd-003', label: 'CMA generated', dueDate: '2026-04-24', completedDate: '2026-04-24', status: 'done', ownerRole: 'agent' },
    { id: 'm-3-5', dealId: 'd-003', label: 'Photography', dueDate: '2026-04-25', status: 'in_progress', ownerRole: 'agent' },
    { id: 'm-3-6', dealId: 'd-003', label: 'Listing agreement signed', dueDate: '2026-04-26', status: 'upcoming', ownerRole: 'seller' },
    { id: 'm-3-7', dealId: 'd-003', label: 'MLS active', dueDate: '2026-04-28', status: 'upcoming', ownerRole: 'agent' },
    { id: 'm-3-8', dealId: 'd-003', label: 'Close', dueDate: '2026-07-15', status: 'upcoming', ownerRole: 'escrow' },
  ],
  'd-004': [
    { id: 'm-4-1', dealId: 'd-004', label: 'Identity verified', dueDate: '2026-04-01', completedDate: '2026-04-01', status: 'done', ownerRole: 'agent' },
    { id: 'm-4-2', dealId: 'd-004', label: 'Listing agreement signed', dueDate: '2026-04-02', completedDate: '2026-04-02', status: 'done', ownerRole: 'seller' },
    { id: 'm-4-3', dealId: 'd-004', label: 'MLS active', dueDate: '2026-04-04', completedDate: '2026-04-04', status: 'done', ownerRole: 'agent' },
    { id: 'm-4-4', dealId: 'd-004', label: 'Offer accepted', dueDate: '2026-04-19', completedDate: '2026-04-19', status: 'done', ownerRole: 'agent' },
    { id: 'm-4-5', dealId: 'd-004', label: 'Earnest money received', dueDate: '2026-04-22', completedDate: '2026-04-21', status: 'done', ownerRole: 'escrow' },
    { id: 'm-4-6', dealId: 'd-004', label: 'Inspection complete', dueDate: '2026-04-24', completedDate: '2026-04-23', status: 'done', ownerRole: 'inspector' },
    { id: 'm-4-7', dealId: 'd-004', label: 'Inspection contingency expires', dueDate: '2026-04-29', status: 'overdue', ownerRole: 'buyer', fiduciaryFlag: 'Buyer must respond by 2026-04-29 or contingency removed' },
    { id: 'm-4-8', dealId: 'd-004', label: 'Loan appraisal', dueDate: '2026-05-02', status: 'upcoming', ownerRole: 'lender' },
    { id: 'm-4-9', dealId: 'd-004', label: 'Final walk-through', dueDate: '2026-05-12', status: 'upcoming', ownerRole: 'buyer' },
    { id: 'm-4-10', dealId: 'd-004', label: 'Close', dueDate: '2026-05-15', status: 'upcoming', ownerRole: 'escrow' },
  ],
  'd-101': [
    { id: 'm-101-1', dealId: 'd-101', label: 'Pre-approval complete', dueDate: '2026-04-08', completedDate: '2026-04-08', status: 'done', ownerRole: 'lender' },
    { id: 'm-101-2', dealId: 'd-101', label: 'Buyer rep agreement signed', dueDate: '2026-04-10', completedDate: '2026-04-10', status: 'done', ownerRole: 'buyer' },
    { id: 'm-101-3', dealId: 'd-101', label: 'Search criteria locked', dueDate: '2026-04-11', completedDate: '2026-04-11', status: 'done', ownerRole: 'agent' },
    { id: 'm-101-4', dealId: 'd-101', label: 'Drip campaign live', dueDate: '2026-04-12', completedDate: '2026-04-12', status: 'done', ownerRole: 'agent' },
    { id: 'm-101-5', dealId: 'd-101', label: 'Tour Anaha #2204', dueDate: '2026-04-26', completedDate: '2026-04-25', status: 'done', ownerRole: 'agent' },
    { id: 'm-101-6', dealId: 'd-101', label: 'Tour Mililani #B304', dueDate: '2026-04-28', status: 'in_progress', ownerRole: 'agent' },
    { id: 'm-101-7', dealId: 'd-101', label: 'Offer drafted', dueDate: '2026-05-05', status: 'upcoming', ownerRole: 'agent' },
    { id: 'm-101-8', dealId: 'd-101', label: 'Close', dueDate: '2026-08-15', status: 'upcoming', ownerRole: 'escrow' },
  ],
  'd-102': [
    { id: 'm-102-1', dealId: 'd-102', label: 'Pre-approval (cash)', dueDate: '2026-04-19', completedDate: '2026-04-19', status: 'done', ownerRole: 'buyer' },
    { id: 'm-102-2', dealId: 'd-102', label: 'Buyer rep agreement signed', dueDate: '2026-04-19', completedDate: '2026-04-19', status: 'done', ownerRole: 'buyer' },
    { id: 'm-102-3', dealId: 'd-102', label: 'Tour Kaha St', dueDate: '2026-04-21', completedDate: '2026-04-21', status: 'done', ownerRole: 'agent' },
    { id: 'm-102-4', dealId: 'd-102', label: 'Offer analysis complete', dueDate: '2026-04-22', completedDate: '2026-04-22', status: 'done', ownerRole: 'agent' },
    { id: 'm-102-5', dealId: 'd-102', label: 'Offer sent', dueDate: '2026-04-23', completedDate: '2026-04-23', status: 'done', ownerRole: 'agent' },
    { id: 'm-102-6', dealId: 'd-102', label: 'Seller response deadline', dueDate: '2026-04-28', status: 'at_risk', ownerRole: 'seller' },
    { id: 'm-102-7', dealId: 'd-102', label: 'Open escrow', dueDate: '2026-04-30', status: 'upcoming', ownerRole: 'escrow' },
    { id: 'm-102-8', dealId: 'd-102', label: 'Close', dueDate: '2026-05-20', status: 'upcoming', ownerRole: 'escrow' },
  ],
};

// =============================================================================
// DOCUMENTS — keyed by deal id
// =============================================================================

export const documentsByDeal: Record<string, DocumentRef[]> = {
  'd-001': [
    { id: 'doc-1-1', dealId: 'd-001', name: 'Listing Agreement — 1108 Auahi #2204', type: 'listing_agreement', status: 'signed', signedDate: '2026-04-19' },
    { id: 'doc-1-2', dealId: 'd-001', name: 'Seller Property Disclosure', type: 'disclosure', status: 'signed', signedDate: '2026-04-19' },
    { id: 'doc-1-3', dealId: 'd-001', name: 'Lead-Based Paint Disclosure', type: 'disclosure', status: 'signed', signedDate: '2026-04-19' },
  ],
  'd-002': [
    { id: 'doc-2-1', dealId: 'd-002', name: 'Listing Agreement — 347 Kaha St', type: 'listing_agreement', status: 'signed', signedDate: '2026-04-05' },
    { id: 'doc-2-2', dealId: 'd-002', name: 'Seller Property Disclosure', type: 'disclosure', status: 'signed', signedDate: '2026-04-05' },
    { id: 'doc-2-3', dealId: 'd-002', name: 'Price Reduction Addendum', type: 'addendum', status: 'unsigned' },
  ],
  'd-004': [
    { id: 'doc-4-1', dealId: 'd-004', name: 'Listing Agreement — 538 Kawaihae', type: 'listing_agreement', status: 'signed', signedDate: '2026-04-02' },
    { id: 'doc-4-2', dealId: 'd-004', name: 'Purchase Contract', type: 'offer', status: 'signed', signedDate: '2026-04-19' },
    { id: 'doc-4-3', dealId: 'd-004', name: 'Inspection Response Addendum', type: 'addendum', status: 'sent' },
  ],
  'd-101': [
    { id: 'doc-101-1', dealId: 'd-101', name: 'Buyer Representation Agreement', type: 'buyer_rep', status: 'signed', signedDate: '2026-04-10' },
  ],
  'd-102': [
    { id: 'doc-102-1', dealId: 'd-102', name: 'Buyer Representation Agreement', type: 'buyer_rep', status: 'signed', signedDate: '2026-04-19' },
    { id: 'doc-102-2', dealId: 'd-102', name: 'Offer — 347 Kaha St', type: 'offer', status: 'sent' },
  ],
};

// =============================================================================
// OFFERS
// =============================================================================

export const offers: Offer[] = [
  {
    id: 'o-001',
    buyerId: 'b-002',
    listingId: 'l-002',
    offerPrice: 2_100_000,
    earnestMoney: 50_000,
    contingencies: ['inspection'],
    closeDate: '2026-05-20',
    recommendedRange: [2_080_000, 2_175_000],
    positionVsComps: 'below',
    status: 'sent',
    createdDate: '2026-04-23',
  },
];

// =============================================================================
// ALERTS
// =============================================================================

export const alerts: Alert[] = [
  { id: 'a-1', dealId: 'd-004', severity: 'danger', title: 'Inspection contingency expiring', body: '538 Kawaihae buyer must respond in 2 days or contingency drops.', timestamp: '2026-04-27T07:14:00Z', unread: true },
  { id: 'a-2', dealId: 'd-002', severity: 'warning', title: 'Price refresh decision due', body: '347 Kaha St at 28 DOM. Recommended action: reduce to $2.099M.', timestamp: '2026-04-27T06:50:00Z', unread: true },
  { id: 'a-3', listingId: 'l-001', severity: 'info', title: 'New comp alert', body: 'Anaha #1808 just sold $980k — supports current Auahi list price.', timestamp: '2026-04-26T14:22:00Z', unread: true },
  { id: 'a-4', buyerId: 'b-001', severity: 'success', title: 'Drip reply', body: 'Trevor Nakamura replied to drip — interested in Mililani tour Saturday.', timestamp: '2026-04-26T11:08:00Z', unread: false },
];
