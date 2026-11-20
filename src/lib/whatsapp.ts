import { site } from '../config/site';
import type { Branch } from '../data/branches';

/** Digits-only number, or null when none is configured. */
export const normaliseNumber = (n: string | null | undefined) => {
  const digits = (n ?? '').replace(/\D/g, '');
  return digits.length >= 8 ? digits : null;
};

/** The number to use for a branch: branch → site default → none. */
export const numberFor = (branch?: Branch | null) =>
  normaliseNumber(branch?.whatsapp) ?? normaliseNumber(site.whatsapp.number);

/**
 * Build a WhatsApp click-to-chat URL.
 * With a number: opens a chat with the business.
 * Without one: opens WhatsApp with the message prefilled and lets the user
 * pick the recipient — so buttons never break before the number is confirmed.
 */
export const whatsappUrl = (message: string = site.whatsapp.defaultMessage, branch?: Branch | null) => {
  const number = numberFor(branch);
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
};

export const dishMessage = (dish: string, branch?: Branch | null, price?: string) =>
  `Hello Amoke Oge, I'd like to order ${dish}${price ? ` (${price} on your menu)` : ''}${branch ? ` from your ${branch.name} branch` : ''}. Is it available now? Thank you.`;

export const branchMessage = (branch: Branch) =>
  `Hello Amoke Oge (${branch.name}), I'd like to place an order. Please let me know what's available today and the prices.`;
