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

export const dishMessage = (dish: string, branch?: Branch | null) =>
  `Hello Amoke Oge, I would like to order ${dish}${branch ? ` from your ${branch.name} branch` : ''}. Please confirm availability and today's price. Thank you.`;

export const branchMessage = (branch: Branch) =>
  `Hello Amoke Oge (${branch.name}), I would like to place an order. Please assist me with your available meals and prices.`;
