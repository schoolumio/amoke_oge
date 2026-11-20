/**
 * Menu.
 *
 * Items are taken from what Amoke Oge lists on its Chowdeck store (Ikoyi
 * branch, checked November 2026) and from published visit reviews. No prices
 * are shown: prices change frequently and differ between walk-in and delivery
 * platforms, so customers are invited to ask for today's price on WhatsApp.
 *
 * To add a price later, set `price` (e.g. '₦1,500') on an item.
 */
import { photos, type Photo } from './photos';

export interface MenuItem {
  name: string;
  description: string;
  /** Optional small label, e.g. 'Swallow', 'Soup', 'House favourite'. */
  tag?: string;
  price?: string;
  /** Thumbnail shown beside the item. */
  photo: Photo;
}

export interface MenuCategory {
  id: string;
  title: string;
  intro: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'swallows-soups',
    title: 'Swallows & Soups',
    intro: 'Hot swallows, freshly turned, with the soups Lagos queues for.',
    items: [
      { photo: photos.heroAmalaAbula, name: 'Amala', tag: 'Swallow', description: 'Hot, smooth black amala made from yam flour — the heart of the house.' },
      { photo: photos.ewedu, name: 'Ewedu', tag: 'Soup', description: 'Silky jute-leaf soup, whisked until light. The classic partner to amala.' },
      { photo: photos.amalaGbegiri, name: 'Gbegiri', tag: 'Soup', description: 'Velvety bean soup, golden with palm oil and gently spiced.' },
      { photo: photos.efoRiro, name: 'Efo Riro', tag: 'Soup', description: 'Rich Yoruba spinach stew cooked down with peppers and palm oil.' },
      { photo: photos.egusiPonmo, name: 'Egusi', tag: 'Soup', description: 'Ground melon seed soup — hearty, nutty and full of flavour.' },
      { photo: photos.okro, name: 'Okro', tag: 'Soup', description: 'Fresh okro soup, best enjoyed with any swallow.' },
      { photo: photos.eba, name: 'Eba', tag: 'Swallow', description: 'Firm, comforting garri swallow.' },
      { photo: photos.fufu, name: 'Fufu', tag: 'Swallow', description: 'Soft, smooth cassava fufu.' },
      { photo: photos.semovita, name: 'Semovita', tag: 'Swallow', description: 'Light, smooth semolina swallow.' },
      { photo: photos.wheat, name: 'Wheat', tag: 'Swallow', description: 'Wholesome wheat swallow.' },
      { photo: photos.poundedYam, name: 'Pounded Yam', tag: 'Swallow', description: 'Freshly pounded yam, soft and stretchy.' },
    ],
  },
  {
    id: 'rice',
    title: 'Rice Dishes',
    intro: 'Party-style rice, every day of the week.',
    items: [
      { photo: photos.jollofEggEfo, name: 'Jollof Rice', tag: 'House favourite', description: 'Smoky, tomato-rich Nigerian jollof cooked low and slow.' },
      { photo: photos.friedRice, name: 'Fried Rice', description: 'Nigerian-style fried rice with mixed vegetables.' },
      { photo: photos.whiteRiceStew, name: 'White Rice & Stew', description: 'Fluffy white rice with our rich pepper stew.' },
      { photo: photos.ofadaRiceSauce, name: 'Ofada Rice & Sauce', description: 'Local unpolished ofada rice with spicy ofada sauce.' },
    ],
  },
  {
    id: 'proteins',
    title: 'Proteins',
    intro: 'Build your plate — every protein comes in stew.',
    items: [
      { photo: photos.assortedMeatStew, name: 'Assorted Meat', description: 'A mix of beef and offal cuts, simmered in stew.' },
      { photo: photos.goatMeat, name: 'Goat Meat', description: 'Tender goat meat cooked in pepper stew.' },
      { photo: photos.ponmo, name: 'Ponmo', description: 'Soft cow skin, well seasoned.' },
      { photo: photos.pepperedChicken, name: 'Peppered Chicken', description: 'Chicken in a fiery pepper sauce.' },
      { photo: photos.pepperedTurkey, name: 'Peppered Turkey', description: 'Juicy turkey, peppered the Lagos way.' },
      { photo: photos.catfish, name: 'Fish', description: 'Round fish, tilapia, smoked or fresh catfish — ask for today’s catch.' },
      { photo: photos.snail, name: 'Peppered Snail', description: 'Plump snail in spicy pepper sauce.' },
      { photo: photos.boiledEgg, name: 'Boiled Egg', description: 'Simple and satisfying.' },
    ],
  },
  {
    id: 'specials',
    title: 'Traditional Specials',
    intro: 'The plates that made the name.',
    items: [
      { photo: photos.abulaPonmo, name: 'Amala, Ewedu & Gbegiri (Abula)', tag: 'Signature', description: 'The full Abula experience: amala with ewedu, gbegiri and stew, with your choice of meat.' },
      { photo: photos.amalaOgunfe, name: 'Amala & Ogunfe', description: 'Amala with ewedu, gbegiri and goat meat — a true Yoruba classic.' },
      { photo: photos.asaro, name: 'Yam Porridge (Asaro)', description: 'Sweet yam pottage, cooked soft in a rich pepper and palm-oil base.' },
      { photo: photos.ofadaAssorted, name: 'Ofada Rice with Assorted Meat', description: 'Ofada rice and sauce, loaded with assorted meat.' },
    ],
  },
  {
    id: 'others',
    title: 'Other Meals & Sides',
    intro: 'Sides to round out the plate.',
    items: [
      { photo: photos.beans, name: 'Beans', description: 'Soft, well-seasoned Nigerian beans.' },
      { photo: photos.moimoiStew, name: 'Moimoi', description: 'Steamed bean pudding — a perfect side.' },
      { photo: photos.dodo, name: 'Fried Plantain (Dodo)', description: 'Sweet ripe plantain, fried golden.' },
      { photo: photos.salad, name: 'Salad', description: 'Fresh, crunchy side salad.' },
    ],
  },
];
