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

export interface MenuItem {
  name: string;
  description: string;
  /** Optional small label, e.g. 'Swallow', 'Soup', 'House favourite'. */
  tag?: string;
  price?: string;
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
      { name: 'Amala', tag: 'Swallow', description: 'Hot, smooth black amala made from yam flour — the heart of the house.' },
      { name: 'Ewedu', tag: 'Soup', description: 'Silky jute-leaf soup, whisked until light. The classic partner to amala.' },
      { name: 'Gbegiri', tag: 'Soup', description: 'Velvety bean soup, golden with palm oil and gently spiced.' },
      { name: 'Efo Riro', tag: 'Soup', description: 'Rich Yoruba spinach stew cooked down with peppers and palm oil.' },
      { name: 'Egusi', tag: 'Soup', description: 'Ground melon seed soup — hearty, nutty and full of flavour.' },
      { name: 'Okro', tag: 'Soup', description: 'Fresh okro soup, best enjoyed with any swallow.' },
      { name: 'Eba', tag: 'Swallow', description: 'Firm, comforting garri swallow.' },
      { name: 'Fufu', tag: 'Swallow', description: 'Soft, smooth cassava fufu.' },
      { name: 'Semovita', tag: 'Swallow', description: 'Light, smooth semolina swallow.' },
      { name: 'Wheat', tag: 'Swallow', description: 'Wholesome wheat swallow.' },
      { name: 'Pounded Yam', tag: 'Swallow', description: 'Freshly pounded yam, soft and stretchy.' },
    ],
  },
  {
    id: 'rice',
    title: 'Rice Dishes',
    intro: 'Party-style rice, every day of the week.',
    items: [
      { name: 'Jollof Rice', tag: 'House favourite', description: 'Smoky, tomato-rich Nigerian jollof cooked low and slow.' },
      { name: 'Fried Rice', description: 'Nigerian-style fried rice with mixed vegetables.' },
      { name: 'White Rice & Stew', description: 'Fluffy white rice with our rich pepper stew.' },
      { name: 'Ofada Rice & Sauce', description: 'Local unpolished ofada rice with spicy ofada sauce.' },
    ],
  },
  {
    id: 'proteins',
    title: 'Proteins',
    intro: 'Build your plate — every protein comes in stew.',
    items: [
      { name: 'Assorted Meat', description: 'A mix of beef and offal cuts, simmered in stew.' },
      { name: 'Goat Meat', description: 'Tender goat meat cooked in pepper stew.' },
      { name: 'Ponmo', description: 'Soft cow skin, well seasoned.' },
      { name: 'Peppered Chicken', description: 'Chicken in a fiery pepper sauce.' },
      { name: 'Peppered Turkey', description: 'Juicy turkey, peppered the Lagos way.' },
      { name: 'Fish', description: 'Round fish, tilapia, smoked or fresh catfish — ask for today’s catch.' },
      { name: 'Peppered Snail', description: 'Plump snail in spicy pepper sauce.' },
      { name: 'Boiled Egg', description: 'Simple and satisfying.' },
    ],
  },
  {
    id: 'specials',
    title: 'Traditional Specials',
    intro: 'The plates that made the name.',
    items: [
      { name: 'Amala, Ewedu & Gbegiri (Abula)', tag: 'Signature', description: 'The full Abula experience: amala with ewedu, gbegiri and stew, with your choice of meat.' },
      { name: 'Amala & Ogunfe', description: 'Amala with ewedu, gbegiri and goat meat — a true Yoruba classic.' },
      { name: 'Yam Porridge (Asaro)', description: 'Sweet yam pottage, cooked soft in a rich pepper and palm-oil base.' },
      { name: 'Ofada Rice with Assorted Meat', description: 'Ofada rice and sauce, loaded with assorted meat.' },
    ],
  },
  {
    id: 'others',
    title: 'Other Meals & Sides',
    intro: 'Sides to round out the plate.',
    items: [
      { name: 'Beans', description: 'Soft, well-seasoned Nigerian beans.' },
      { name: 'Moimoi', description: 'Steamed bean pudding — a perfect side.' },
      { name: 'Fried Plantain (Dodo)', description: 'Sweet ripe plantain, fried golden.' },
      { name: 'Salad', description: 'Fresh, crunchy side salad.' },
    ],
  },
];
