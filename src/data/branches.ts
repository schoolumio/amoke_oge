/**
 * Amoke Oge branches.
 *
 * To add a branch, append an object to `branches`. The homepage locations
 * section, footer, branch page (/locations/<slug>), order form, sitemap and
 * structured data all update automatically.
 *
 * Research notes (November 2026):
 * - The official Instagram (@amokefoodsng1) lists walk-in branches in
 *   Onipanu, Surulere, Obalende and Bawala.
 * - Phone numbers found online conflict between listings and branches, so no
 *   phone number is published here until management confirms one per branch.
 *   Candidates found (UNCONFIRMED, do not publish without confirmation):
 *     Bawala — 0703 985 0834 (Foodie in Lagos), 0802 874 8473 (directories)
 *     Ikoyi  — 0703 572 7288 (Foodie in Lagos), 0802 874 8473 (Waze)
 *     Onipanu — 0703 583 2831 (business directory)
 * - Listings for "Amoke Oge Food Centre, Mafoluku/Oshodi" and "Amoke Ala Amala,
 *   Oregun" could not be linked to this brand and are deliberately excluded.
 */

export type VerificationLevel = 'verified' | 'listed' | 'pending';

export interface Branch {
  slug: string;
  /** Short name shown on cards, e.g. "Ikoyi / Obalende". */
  name: string;
  /** Neighbourhood line, e.g. "Lagos Island". */
  area: string;
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode?: string;
    country: 'NG';
  };
  /** Shown under the address when part of it still needs confirmation. */
  addressNote?: string;
  addressStatus: VerificationLevel;
  geo?: { lat: number; lng: number };
  /** Only confirmed numbers. International format, digits only. */
  phone: string | null;
  /** Branch WhatsApp number (digits only). Falls back to the site number. */
  whatsapp: string | null;
  hours: {
    days: string;
    times?: string;
    note?: string;
    status: VerificationLevel;
    /** Only filled when verified; used in structured data. */
    schema?: { days: string[]; opens: string; closes: string }[];
  };
  services: string[];
  orderOnline?: { label: string; url: string }[];
  /** Search phrase used for Google Maps directions & embeds. */
  mapsQuery: string;
  sources: string[];
}

export const branches: Branch[] = [
  {
    slug: 'ikoyi-obalende',
    name: 'Ikoyi / Obalende',
    area: 'Lagos Island',
    address: {
      street: '95–59 Moshalashi Street',
      locality: 'Ikoyi',
      city: 'Lagos',
      region: 'Lagos',
      postalCode: '106104',
      country: 'NG',
    },
    addressStatus: 'verified',
    geo: { lat: 6.4481791, lng: 3.4135938 },
    phone: null,
    whatsapp: null,
    hours: {
      days: 'Tuesday – Sunday',
      times: '8:00am – 8:00pm',
      note: 'Closed Mondays · as listed on Chowdeck',
      status: 'listed',
    },
    services: ['Dine-in', 'Takeaway', 'Delivery via Chowdeck'],
    orderOnline: [
      { label: 'Chowdeck', url: 'https://chowdeck.com/store/ikoyi/restaurants/amoke-oge-ikoyi' },
    ],
    mapsQuery: 'Amoke Oge, 95-59 Moshalashi St, Ikoyi, Lagos 106104',
    sources: [
      'https://chowdeck.com/store/ikoyi/restaurants/amoke-oge-ikoyi',
      'https://foodieinlagos.com/review-amoke-oge-ikoyi/',
    ],
  },
  {
    slug: 'bawala-pedro',
    name: 'Bawala',
    area: 'Pedro, Shomolu',
    address: {
      street: '1 Bawala Street',
      locality: 'Pedro',
      city: 'Lagos',
      region: 'Lagos',
      postalCode: '102216',
      country: 'NG',
    },
    addressStatus: 'verified',
    phone: null,
    whatsapp: null,
    hours: {
      days: 'Tuesday – Sunday',
      note: 'Closed Mondays · times to be confirmed',
      status: 'listed',
    },
    services: ['Dine-in', 'Takeaway'],
    mapsQuery: 'Amoke Oge Restaurant, 1 Bawala Street, Pedro, Lagos',
    sources: ['https://foodieinlagos.com/review-amala-oge-bawala/'],
  },
  {
    slug: 'surulere',
    name: 'Surulere',
    area: 'Iganmu, Surulere',
    address: {
      street: 'Babs Animashaun Road',
      locality: 'Surulere',
      city: 'Lagos',
      region: 'Lagos',
      postalCode: '101241',
      country: 'NG',
    },
    addressNote: 'Street number to be confirmed',
    addressStatus: 'listed',
    phone: null,
    whatsapp: null,
    hours: {
      days: 'Tuesday – Sunday',
      note: 'Closed Mondays · times to be confirmed',
      status: 'listed',
    },
    services: ['Dine-in', 'Takeaway'],
    mapsQuery: 'Amoke Oge (Surulere), Babs Animashaun Rd, Lagos',
    sources: ['Instagram bio @amokefoodsng1 (branch area)', 'Google Maps listing "Amoke Oge (Surulere)"'],
  },
  {
    slug: 'onipanu',
    name: 'Onipanu',
    area: 'Onipanu, Shomolu',
    address: {
      street: 'Oguntolu Street',
      locality: 'Onipanu',
      city: 'Lagos',
      region: 'Lagos',
      postalCode: '102216',
      country: 'NG',
    },
    addressNote: 'Street number to be confirmed',
    addressStatus: 'listed',
    phone: null,
    whatsapp: null,
    hours: {
      days: 'Opening hours to be confirmed',
      status: 'pending',
    },
    services: ['Dine-in', 'Takeaway'],
    mapsQuery: 'Amoke Oge, Oguntolu Street, Onipanu, Lagos',
    sources: ['Instagram bio @amokefoodsng1 (branch area)', 'Business directory listing (Oguntolu St)'],
  },
];

export const formatAddress = (b: Branch, opts: { postal?: boolean } = {}) =>
  [
    b.address.street,
    b.address.locality,
    opts.postal && b.address.postalCode ? `${b.address.city} ${b.address.postalCode}` : b.address.city,
  ].join(', ');

export const directionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.mapsQuery)}`;

export const mapEmbedUrl = (b: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(b.mapsQuery)}&z=16&output=embed`;
