import type { APIRoute } from 'astro';
import { branches } from '../data/branches';

export const GET: APIRoute = ({ site }) => {
  const base = site!;
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    ...branches.map((b) => ({ path: `/locations/${b.slug}`, priority: '0.8', changefreq: 'monthly' })),
    { path: '/photo-credits', priority: '0.2', changefreq: 'yearly' },
  ];
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${new URL(p.path, base).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
