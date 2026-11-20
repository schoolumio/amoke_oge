/**
 * Photography registry.
 *
 * DEMONSTRATION IMAGERY: these are openly licensed photographs of Nigerian
 * dishes from Wikimedia Commons. They are NOT photographs of Amoke Oge's food
 * or premises and must be replaced with Amoke Oge's own photography before
 * the site is presented as the official website (see README).
 *
 * To swap a photo: drop the new file into src/assets/images/, update the
 * import below, its alt text, and set `credit` to null for in-house photos.
 */
import type { ImageMetadata } from 'astro';
import heroAmalaAbula from '../assets/images/hero-amala-abula.jpg';
import amalaGbegiri from '../assets/images/amala-gbegiri.jpg';
import assortedMeatStew from '../assets/images/assorted-meat-stew.jpg';
import jollofFriedRice from '../assets/images/jollof-fried-rice-plantain.jpg';
import takeawayPacks from '../assets/images/takeaway-packs.jpg';
import friedRice from '../assets/images/fried-rice-plantain-beef.jpg';
import ofadaRiceSauce from '../assets/images/ofada-rice-sauce.jpg';
import asaro from '../assets/images/asaro-yam-porridge.jpg';
import efoRiro from '../assets/images/efo-riro-clay-pot.jpg';
import egusiPot from '../assets/images/egusi-pot.jpg';
import cookingFirewood from '../assets/images/cooking-firewood.jpg';
import ofadaLeaf from '../assets/images/ofada-leaf-wrapped.jpg';
import moimoi from '../assets/images/moimoi-baskets.jpg';
import dodo from '../assets/images/dodo.jpg';
import bukaServer from '../assets/images/buka-server.jpg';
import pepperSoup from '../assets/images/assorted-pepper-soup.jpg';
import snail from '../assets/images/peppered-snail.jpg';
import yorubaDelicacies from '../assets/images/yoruba-delicacies.jpg';
import jollofEggEfo from '../assets/images/jollof-egg-efo.jpg';

export interface Credit {
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Focal point for object-position, e.g. '50% 40%'. */
  focus?: string;
  credit: Credit | null;
}

const BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`;

export const photos = {
  heroAmalaAbula: {
    src: heroAmalaAbula,
    alt: 'A plate of amala served with golden gbegiri, green ewedu and rich red pepper stew with pieces of beef',
    focus: '55% 45%',
    credit: { author: 'Owoeye007', ...BY_SA_4, source: commons('Amala and Abula.jpg') },
  },
  amalaGbegiri: {
    src: amalaGbegiri,
    alt: 'A mound of hot amala resting in thick golden gbegiri bean soup',
    focus: '50% 40%',
    credit: { author: 'Ebiojo', ...BY_SA_4, source: commons('Amala and gbegiri.jpg') },
  },
  assortedMeatStew: {
    src: assortedMeatStew,
    alt: 'Close-up of assorted meat and goat meat simmered in a glossy red pepper stew',
    credit: { author: 'Zend2020', ...BY_SA_4, source: commons('Local assorted meat stew in Nigeria.jpg') },
  },
  jollofFriedRice: {
    src: jollofFriedRice,
    alt: 'Nigerian jollof rice and fried rice with peppered chicken, fried plantain and coleslaw',
    focus: '60% 40%',
    credit: { author: 'Harriwillz', ...BY_SA_4, source: commons('Freshly made foods 08.jpg') },
  },
  takeawayPacks: {
    src: takeawayPacks,
    alt: 'Takeaway packs of jollof rice, fried rice, chicken, stew and soups ready for collection',
    credit: { author: 'Harriwillz', ...BY_SA_4, source: commons('Freshly made foods 01.jpg') },
  },
  friedRice: {
    src: friedRice,
    alt: 'Nigerian fried rice with vegetables, fried plantain and tender beef',
    credit: { author: 'Globalgab', ...BY_SA_4, source: commons('African Fried Rice with Fried Plantain and Beef.jpg') },
  },
  ofadaRiceSauce: {
    src: ofadaRiceSauce,
    alt: 'Ofada rice moulded on a tray beside spicy ofada sauce with boiled egg',
    focus: '55% 25%',
    credit: {
      author: 'Cherish Aurora',
      ...BY_SA_4,
      source: commons('Ofada Rice and Sauce, complimented with Moimoi, Egg, Plantain and Assorted Meat.jpg'),
    },
  },
  asaro: {
    src: asaro,
    alt: 'Golden yam porridge (asaro) served in a traditional calabash',
    credit: { author: 'Tunde Akangbe', ...BY_SA_4, source: commons('Asaro Yam porridge.jpg') },
  },
  efoRiro: {
    src: efoRiro,
    alt: 'Efo riro spinach stew served in a dark clay pot',
    credit: { author: 'Tunde Akangbe', ...BY_SA_4, source: commons('Efo Riro - Veggies.jpg') },
  },
  egusiPot: {
    src: egusiPot,
    alt: 'A large pot of egusi soup with meat being stirred over the fire',
    credit: { author: 'Sasu photography', ...BY_SA_4, source: commons('Egusi soup 333.jpg') },
  },
  cookingFirewood: {
    src: cookingFirewood,
    alt: 'A cook stirring a large pot of soup over a traditional firewood stove',
    focus: '50% 35%',
    credit: { author: 'Sasu photography', ...BY_SA_4, source: commons('Caterer staring Egusi soup.jpg') },
  },
  ofadaLeaf: {
    src: ofadaLeaf,
    alt: 'Ofada rice wrapped in leaves, served from a colourful enamel bowl',
    credit: { author: 'Tadekwiki', ...BY_SA_4, source: commons('Iresi Ofada Elewe.jpg') },
  },
  moimoi: {
    src: moimoi,
    alt: 'Leaf-wrapped moimoi bean pudding in woven baskets',
    credit: { author: 'Utibe Noah Silas', ...BY_SA_4, source: commons('Moi-Moi.jpg') },
  },
  dodo: {
    src: dodo,
    alt: 'Golden slices of fried ripe plantain (dodo)',
    credit: {
      author: 'Setor33',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      source: commons('Dodo fried.jpg'),
    },
  },
  bukaServer: {
    src: bukaServer,
    alt: 'A food vendor serving takeaway packs at a busy Lagos buka',
    focus: '40% 40%',
    credit: { author: 'Adaku Nwakanma', ...BY_SA_4, source: commons('The Buka 14.jpg') },
  },
  pepperSoup: {
    src: pepperSoup,
    alt: 'A bowl of assorted meat pepper soup',
    credit: {
      author: 'bob walker',
      license: 'CC BY-SA 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
      source: commons('Assorted meat pepper soup at Lagos Island.jpg'),
    },
  },
  snail: {
    src: snail,
    alt: 'Peppered snails in a spicy red pepper sauce',
    credit: {
      author: 'Iwai-Dialax',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      source: commons('Pepper snail.jpg'),
    },
  },
  yorubaDelicacies: {
    src: yorubaDelicacies,
    alt: 'Pots of amala, ewedu and gbegiri laid out ready to serve',
    focus: '50% 45%',
    credit: {
      author: 'Akum20',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      source: commons('Yoruba delicacies.jpg'),
    },
  },
  jollofEggEfo: {
    src: jollofEggEfo,
    alt: 'Jollof rice topped with a boiled egg in stew and efo greens',
    credit: { author: 'Segun Famisa', ...BY_SA_4, source: commons('Jollof rice with vegetable.jpg') },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
