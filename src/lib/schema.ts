/**
 * Schema.org structured data.
 * Only verified facts are emitted: no ratings, reviews, prices or phone
 * numbers are included unless they are confirmed in the data files.
 */
import { site } from '../config/site';
import { branches, type Branch } from '../data/branches';

const abs = (path: string, base: URL | string) => new URL(path, base).toString();

export const restaurantSchema = (b: Branch, base: URL | string) => {
  const node: Record<string, unknown> = {
    '@type': 'Restaurant',
    '@id': abs(`/locations/${b.slug}#restaurant`, base),
    name: `${site.name} — ${b.name}`,
    url: abs(`/locations/${b.slug}`, base),
    image: abs('/og-image.jpg', base),
    servesCuisine: ['Nigerian', 'Yoruba', 'West African'],
    hasMenu: abs('/#menu', base),
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
      ...(b.address.postalCode ? { postalCode: b.address.postalCode } : {}),
      addressCountry: b.address.country,
    },
    brand: { '@id': abs('/#organization', base) },
  };
  if (b.geo) node.geo = { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng };
  if (b.phone) node.telephone = `+${b.phone}`;
  if (b.hours.status === 'verified' && b.hours.schema) {
    node.openingHoursSpecification = b.hours.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return node;
};

export const organizationSchema = (base: URL | string) => ({
  '@type': 'Organization',
  '@id': abs('/#organization', base),
  name: site.name,
  url: abs('/', base),
  logo: abs('/icon-512.png', base),
  description: site.description,
  sameAs: site.socials.map((s) => s.url),
  department: branches.map((b) => ({ '@id': abs(`/locations/${b.slug}#restaurant`, base) })),
});

export const websiteSchema = (base: URL | string) => ({
  '@type': 'WebSite',
  '@id': abs('/#website', base),
  url: abs('/', base),
  name: site.name,
  publisher: { '@id': abs('/#organization', base) },
});

export const graph = (...nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
