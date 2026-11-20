import { photos, type Photo } from './photos';

export interface SignatureDish {
  name: string;
  yoruba?: string;
  description: string;
  photo: Photo;
  /** Name sent in the WhatsApp order message. */
  orderName: string;
}

export const signatureDishes: SignatureDish[] = [
  {
    name: 'Amala, Ewedu & Gbegiri',
    yoruba: 'Abula',
    description:
      'Hot, smooth amala with silky ewedu, golden gbegiri and our rich pepper stew. The plate Amoke Oge is loved for.',
    photo: photos.amalaGbegiri,
    orderName: 'Amala, Ewedu & Gbegiri (Abula)',
  },
  {
    name: 'Assorted Meat & Traditional Stew',
    description:
      'Beef, goat meat, ponmo and offal cuts, slow-cooked and finished in a deep, peppery stew.',
    photo: photos.assortedMeatStew,
    orderName: 'Assorted Meat',
  },
  {
    name: 'Nigerian Jollof Rice',
    description:
      'Smoky, tomato-rich jollof with that unmistakable party flavour, served with your choice of protein.',
    photo: photos.jollofFriedRice,
    orderName: 'Jollof Rice',
  },
  {
    name: 'Ofada Rice & Sauce',
    description:
      'Local unpolished ofada rice with a bold, spicy ofada sauce — earthy, aromatic and deeply satisfying.',
    photo: photos.ofadaRiceSauce,
    orderName: 'Ofada Rice & Sauce',
  },
  {
    name: 'Fried Rice',
    description:
      'Nigerian-style fried rice with mixed vegetables, perfect with peppered chicken or turkey and sweet dodo.',
    photo: photos.friedRice,
    orderName: 'Fried Rice',
  },
  {
    name: 'Yam Porridge',
    yoruba: 'Asaro',
    description:
      'Soft yam cooked down in a rich pepper and palm-oil base until thick, sweet and comforting.',
    photo: photos.asaro,
    orderName: 'Yam Porridge (Asaro)',
  },
];

export interface GalleryItem {
  photo: Photo;
  caption: string;
  /** Layout hint for the editorial grid. */
  size?: 'tall' | 'wide' | 'large';
}

export const gallery: GalleryItem[] = [
  { photo: photos.heroAmalaAbula, caption: 'Amala with ewedu, gbegiri & stew', size: 'large' },
  { photo: photos.yorubaDelicacies, caption: 'Amala, ewedu & gbegiri, ready to serve', size: 'tall' },
  { photo: photos.efoRiro, caption: 'Efo riro in a clay pot' },
  { photo: photos.jollofEggEfo, caption: 'Jollof rice with egg & efo' },
  { photo: photos.cookingFirewood, caption: 'Slow-cooked over the fire', size: 'tall' },
  { photo: photos.pepperSoup, caption: 'Assorted meat pepper soup' },
  { photo: photos.ofadaLeaf, caption: 'Ofada rice, wrapped in leaves', size: 'tall' },
  { photo: photos.egusiPot, caption: 'Egusi, stirred fresh', size: 'wide' },
  { photo: photos.snail, caption: 'Peppered snail' },
  { photo: photos.moimoi, caption: 'Moimoi in leaves' },
  { photo: photos.dodo, caption: 'Golden dodo' },
  { photo: photos.bukaServer, caption: 'Lagos buka culture', size: 'wide' },
];
