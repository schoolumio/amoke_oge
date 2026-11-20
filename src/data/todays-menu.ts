/**
 * TODAY'S MENU — what is available right now, and what it costs.
 *
 * This is the board staff update each day: flip `available`, change a
 * `price`, then change `updated`. The homepage section, the order form
 * and the WhatsApp messages all read from this file.
 *
 * Current data: a snapshot of Amoke Oge's own Chowdeck store (Ikoyi branch),
 * taken on the date below. Chowdeck prices can differ from walk-in prices and
 * between branches; management should confirm their counter prices.
 */
import { photos, type Photo } from './photos';

export interface TodayItem {
  name: string;
  /** Price in naira. null = no separate charge (shown with `priceNote`). */
  price: number | null;
  priceNote?: string;
  /** e.g. 'per portion · min. 2' */
  unit?: string;
  available: boolean;
  photo: Photo;
}

export interface TodayDeal extends TodayItem {
  description: string;
}

export interface TodayGroup {
  id: string;
  title: string;
  items: TodayItem[];
}

export const todaysMenu = {
  /** ISO date the board was last updated. */
  updated: '2026-11-20',
  branch: 'Ikoyi / Obalende',
  source: { label: 'Amoke Oge on Chowdeck', url: 'https://chowdeck.com/store/ikoyi/restaurants/amoke-oge-ikoyi' },
  packs: 'Takeaway pack ₦300 · big pack ₦600',

  deals: [
    {
      name: 'Amala Combo',
      description: '3 amala, ewedu & gbegiri, 5 beef/assorted, bottled water',
      price: 2100,
      available: true,
      photo: photos.abulaPonmo,
    },
    {
      name: 'Double Amala Combo',
      description: '6 amala, gbegiri & ewedu, 6 beef/assorted, a drink and water',
      price: 3500,
      available: true,
      photo: photos.amalaGbegiri,
    },
    {
      name: 'Rice Combo',
      description: '3 portions white rice & sauce, 5 beef/assorted, 5 plantain, water',
      price: 2800,
      available: true,
      photo: photos.whiteRiceStew,
    },
    {
      name: 'Jollof & Chicken',
      description: '3 spoons jollof rice, chicken, 4 plantain, a drink or water, pack',
      price: 4500,
      available: true,
      photo: photos.jollofFriedRice,
    },
  ] satisfies TodayDeal[],

  groups: [
    {
      id: 'swallows',
      title: 'Swallows & Soups',
      items: [
        { name: 'Amala', price: 200, unit: 'per portion · min. 2', available: true, photo: photos.heroAmalaAbula },
        { name: 'Ewedu', price: null, priceNote: 'Free with swallow', available: true, photo: photos.ewedu },
        { name: 'Gbegiri', price: null, priceNote: 'Free with swallow', available: true, photo: photos.amalaGbegiri },
        { name: 'Eba', price: 200, unit: 'per portion · min. 2', available: true, photo: photos.eba },
        { name: 'Semovita', price: 200, unit: 'per portion', available: true, photo: photos.semovita },
        { name: 'Fufu', price: 400, unit: 'two wraps', available: true, photo: photos.fufu },
        { name: 'Wheat', price: 200, unit: 'per portion · min. 2', available: false, photo: photos.wheat },
        { name: 'Pounded Yam', price: 500, unit: 'per scoop', available: false, photo: photos.poundedYam },
        { name: 'Efo Riro', price: 1000, unit: 'per spoon', available: false, photo: photos.efoRiro },
        { name: 'Egusi', price: 1000, unit: 'per spoon', available: false, photo: photos.egusiPonmo },
        { name: 'Okro', price: null, priceNote: 'With swallow', available: false, photo: photos.okro },
      ],
    },
    {
      id: 'rice',
      title: 'Rice & Mains',
      items: [
        { name: 'Jollof Rice', price: 400, unit: 'per portion', available: true, photo: photos.jollofEggEfo },
        { name: 'Fried Rice', price: 400, unit: 'two portions', available: true, photo: photos.friedRice },
        { name: 'White Rice', price: 400, unit: 'two portions', available: true, photo: photos.whiteRiceStew },
        { name: 'Yam Porridge (Asaro)', price: 500, unit: 'per portion', available: true, photo: photos.asaro },
        { name: 'Ofada Rice', price: 500, unit: 'per scoop', available: false, photo: photos.ofadaRiceSauce },
        { name: 'Beans', price: 500, unit: 'per portion', available: false, photo: photos.beans },
      ],
    },
    {
      id: 'proteins',
      title: 'Proteins',
      items: [
        { name: 'Assorted Meat', price: 200, unit: 'per piece', available: true, photo: photos.assortedMeatStew },
        { name: 'Peppered Turkey', price: 4000, unit: 'per piece', available: true, photo: photos.pepperedTurkey },
        { name: 'Peppered Snail', price: 5000, unit: 'per piece', available: true, photo: photos.snail },
        { name: 'Peppered Chicken', price: 2500, unit: 'per piece', available: false, photo: photos.pepperedChicken },
        { name: 'Ponmo', price: 600, unit: 'per piece', available: false, photo: photos.ponmo },
        { name: 'Round Fish', price: 1500, unit: 'per piece', available: false, photo: photos.catfish },
        { name: 'Fresh Catfish', price: 3000, unit: 'in stew', available: false, photo: photos.catfish },
        { name: 'Boiled Egg', price: 300, unit: 'each', available: false, photo: photos.boiledEgg },
      ],
    },
    {
      id: 'sides',
      title: 'Sides',
      items: [
        { name: 'Fried Plantain (Dodo)', price: 100, unit: 'per piece', available: true, photo: photos.dodo },
        { name: 'Moimoi', price: 800, unit: 'each', available: false, photo: photos.moimoiStew },
        { name: 'Salad', price: 600, unit: 'per cup', available: false, photo: photos.salad },
      ],
    },
  ] satisfies TodayGroup[],
};

export const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

export const priceLabel = (item: TodayItem) => (item.price === null ? item.priceNote ?? '' : naira(item.price));

export const updatedLabel = () =>
  new Date(`${todaysMenu.updated}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
