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
import eweduImg from '../assets/images/menu/ewedu.jpg';
import ebaImg from '../assets/images/menu/eba.jpg';
import fufuImg from '../assets/images/menu/fufu.jpg';
import semovitaImg from '../assets/images/menu/semovita.jpg';
import wheatImg from '../assets/images/menu/wheat.jpg';
import okroImg from '../assets/images/menu/okro.jpg';
import poundedYamImg from '../assets/images/menu/pounded-yam.jpg';
import whiteRiceStewImg from '../assets/images/menu/white-rice-stew.jpg';
import ponmoImg from '../assets/images/menu/ponmo.jpg';
import pepperedChickenImg from '../assets/images/menu/peppered-chicken.jpg';
import pepperedTurkeyImg from '../assets/images/menu/peppered-turkey.jpg';
import goatMeatImg from '../assets/images/menu/goat-meat.jpg';
import catfishImg from '../assets/images/menu/catfish.jpg';
import boiledEggImg from '../assets/images/menu/boiled-egg.jpg';
import beansImg from '../assets/images/menu/beans.jpg';
import moimoiStewImg from '../assets/images/menu/moimoi-stew.jpg';
import saladImg from '../assets/images/menu/salad.jpg';
import amalaOgunfeImg from '../assets/images/menu/amala-ogunfe.jpg';
import ofadaAssortedImg from '../assets/images/menu/ofada-assorted.jpg';
import abulaPonmoImg from '../assets/images/menu/abula-ponmo.jpg';
import egusiPonmoImg from '../assets/images/menu/egusi-ponmo.jpg';
import amalaEweduImg from '../assets/images/menu/amala-ewedu.jpg';
import placeholders from './placeholders.json';

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
const CC0 = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' };
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
  ewedu: {
    src: eweduImg,
    alt: 'A bowl of green ewedu soup, whisked smooth',
    credit: { author: 'Aderiqueza', ...BY_SA_4, source: commons('Ewedu Soup.jpg') },
  },
  eba: {
    src: ebaImg,
    alt: 'Freshly made eba, a garri swallow',
    credit: { author: 'Tesleemah', ...BY_SA_4, source: commons('Eba (swallow food).jpg') },
  },
  fufu: {
    src: fufuImg,
    alt: 'Wraps of soft white cassava fufu',
    credit: { author: 'Naydness danidamiobi', ...BY_SA_4, source: commons('Nigerian Food Fufu.jpg') },
  },
  semovita: {
    src: semovitaImg,
    alt: 'Semovita swallow served with okro soup',
    credit: { author: 'Omolarabasirat', ...BY_SA_4, source: commons('Semovita and okro soup.jpg') },
  },
  wheat: {
    src: wheatImg,
    alt: 'Wheat swallow served with egusi soup',
    credit: { author: 'Abasswealth', ...BY_SA_4, source: commons('Melon soup with wheat.jpg') },
  },
  okro: {
    src: okroImg,
    alt: 'Okro soup with peppers, fish and meat',
    credit: { author: 'Bukky658', ...BY_SA_4, source: commons('Okro soup.jpg') },
  },
  poundedYam: {
    src: poundedYamImg,
    alt: 'Pounded yam served with egusi soup',
    credit: { author: 'Justdifference', ...BY_SA_4, source: commons('Pounded Yam and Egusi Soup.jpg') },
  },
  whiteRiceStew: {
    src: whiteRiceStewImg,
    alt: 'White rice topped with red pepper stew',
    credit: { author: 'Uskeone', ...CC0, source: commons('White rice with stew.jpg') },
  },
  ponmo: {
    src: ponmoImg,
    alt: 'Pieces of soft ponmo (cow skin) in pepper stew',
    credit: { author: 'Bukky658', ...BY_SA_4, source: commons('Ponmo stew.jpg') },
  },
  pepperedChicken: {
    src: pepperedChickenImg,
    alt: 'Peppered chicken served on a plate',
    credit: { author: 'Fatimah Bello', ...CC0, source: commons('Peppered chicken.jpg') },
  },
  pepperedTurkey: {
    src: pepperedTurkeyImg,
    alt: 'Fried peppered turkey with sliced onions',
    credit: { author: 'Ourlibrary', ...CC0, source: commons('Yomife’s kitchen Fried peppered turkey.jpg') },
  },
  goatMeat: {
    src: goatMeatImg,
    alt: 'Cooked goat meat (ogunfe) in a pot',
    credit: { author: 'Aderiqueza', ...BY_SA_4, source: commons('Ogúnfe (Goat meat).jpg') },
  },
  catfish: {
    src: catfishImg,
    alt: 'Catfish in a light pepper broth with greens',
    credit: { author: 'Halima Waziri', ...BY_SA_4, source: commons('Catfish pepper soup with vegetables.jpg') },
  },
  boiledEgg: {
    src: boiledEggImg,
    alt: 'Boiled eggs in stew with white rice and fried plantain',
    credit: { author: 'Bukky658', ...BY_SA_4, source: commons('White rice and fried plantain with boiled egg stew.png') },
  },
  beans: {
    src: beansImg,
    alt: 'Beans porridge ringed with fried plantain',
    credit: { author: 'Bukky658', ...BY_SA_4, source: commons('Beans porridge and fried plantains.jpg') },
  },
  moimoiStew: {
    src: moimoiStewImg,
    alt: 'Moimoi bean pudding served with stew',
    credit: { author: 'MOIBARDE', ...BY_SA_4, source: commons('Moi-moi with stew.jpg') },
  },
  salad: {
    src: saladImg,
    alt: 'A fresh vegetable salad with cucumber and tomato',
    credit: { author: 'Halima Waziri', ...BY_SA_4, source: commons('Vegetable salad with mayonnaise.jpg') },
  },
  amalaOgunfe: {
    src: amalaOgunfeImg,
    alt: 'Amala with ewedu and goat meat in rich red stew',
    credit: { author: 'Jostbrain', ...BY_SA_4, source: commons('Amala ati Ewedu and Ogunfe.png') },
  },
  ofadaAssorted: {
    src: ofadaAssortedImg,
    alt: 'A bowl of ofada rice with ofada sauce, assorted meat and egg',
    credit: { author: 'Fatimah Bello', ...BY_SA_4, source: commons('Ofada rice with assorted meat.jpg') },
  },
  abulaPonmo: {
    src: abulaPonmoImg,
    alt: 'Amala with gbegiri, ewedu, ponmo and red stew',
    credit: { author: 'IFaRotimi', ...BY_SA_4, source: commons('Amala With Ponmo And Abula.jpg') },
  },
  egusiPonmo: {
    src: egusiPonmoImg,
    alt: 'Egusi soup with ponmo and beef',
    credit: { author: 'Bukky658', ...BY_SA_4, source: commons('Egusi soup with ponmo and beef.jpg') },
  },
  amalaEwedu: {
    src: amalaEweduImg,
    alt: 'A smooth mound of amala served beside ewedu',
    credit: { author: 'Ajia4ty', ...BY_SA_4, source: commons('Amala with Ewedu.jpg') },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * Inline style that paints a tiny blurred preview behind an image while the
 * full image loads, so no image box is ever blank. Generated by
 * `python3 scripts/placeholders.py`.
 */
// Map each imported image to its file name without touching `.src`
// (reading `.src` would make Astro ship the full-size original too).
const files = import.meta.glob<ImageMetadata>('../assets/images/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const stems = new Map<ImageMetadata, string>(
  Object.entries(files).map(([path, meta]) => [meta, path.split('/').pop()!.replace(/\.[^.]+$/, '')]),
);

export const placeholder = (photo: Photo) => {
  const stem = stems.get(photo.src);
  const data = stem ? (placeholders as Record<string, { p: string }>)[stem]?.p : undefined;
  const pos = photo.focus ? `object-position:${photo.focus};background-position:${photo.focus};` : '';
  return data ? `${pos}background-image:url(${data});background-size:cover;` : pos;
};

/** Intrinsic size of a photo, read from placeholders.json (not from the image object). */
export const dimensions = (photo: Photo) => {
  const stem = stems.get(photo.src);
  const d = stem ? (placeholders as Record<string, { w: number; h: number }>)[stem] : undefined;
  return d ?? { w: 1600, h: 1200 };
};
