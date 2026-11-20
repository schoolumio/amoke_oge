/**
 * Central brand & business configuration.
 *
 * Everything the business may need to change (WhatsApp number, social links,
 * concept/preview mode) lives here. Branch-level details live in
 * `src/data/branches.ts`; the menu lives in `src/data/menu.ts`.
 *
 * IMPORTANT: only add contact details that Amoke Oge management has confirmed.
 */

export const site = {
  name: 'Amoke Oge',
  /** Short descriptor used next to the wordmark and in titles. */
  descriptor: 'Nigerian Kitchen',
  city: 'Lagos',
  tagline: 'Authentic Nigerian Flavours. Made to Satisfy.',
  description:
    'Amoke Oge serves authentic Nigerian food in Lagos — hot amala with ewedu and gbegiri, assorted meat, jollof rice, ofada rice and sauce, yam porridge and more. Dine in, take away or order on WhatsApp.',

  /**
   * Concept / preview mode.
   * While true the site:
   *  - shows a discreet "concept preview" ribbon,
   *  - asks search engines not to index it (noindex + robots.txt Disallow),
   *  - labels photography as demonstration imagery.
   * Set to false only once management has approved the content and real
   * Amoke Oge photography has replaced the demonstration images.
   */
  conceptMode: true,

  whatsapp: {
    /**
     * The business WhatsApp number in international format, digits only,
     * e.g. '2348012345678'. Leave null until management confirms the number.
     *
     * While null, every WhatsApp button still works: it opens WhatsApp with
     * the order message prefilled and lets the customer choose the contact.
     * Branch-specific numbers can be set in `src/data/branches.ts`.
     */
    number: null as string | null,
    defaultMessage:
      'Hello Amoke Oge, I would like to place an order. Please assist me with your available meals and prices.',
  },

  /** Verified social profiles only. */
  socials: [
    {
      label: 'Instagram',
      handle: '@amokefoodsng1',
      url: 'https://www.instagram.com/amokefoodsng1/',
    },
  ],

  /**
   * Delivery partners. Chowdeck store verified for the Ikoyi branch.
   * Glovo is mentioned in the official Instagram bio; add its store link
   * once confirmed.
   */
  deliveryPartners: [
    { label: 'Chowdeck', url: 'https://chowdeck.com/store/ikoyi/restaurants/amoke-oge-ikoyi' },
    { label: 'Glovo', url: null as string | null },
  ],

  nav: [
    { label: 'Home', href: '/#top' },
    { label: 'Our Story', href: '/#story' },
    { label: 'Menu', href: '/#menu' },
    { label: 'Locations', href: '/#locations' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export type Site = typeof site;
