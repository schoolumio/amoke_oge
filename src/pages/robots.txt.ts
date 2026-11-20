import type { APIRoute } from 'astro';
import { site as siteConfig } from '../config/site';

/**
 * While the site is a concept preview, search engines are asked not to crawl
 * it. Setting `conceptMode: false` in src/config/site.ts publishes the
 * production rules and the sitemap reference.
 */
export const GET: APIRoute = ({ site }) => {
  const body = siteConfig.conceptMode
    ? `# Concept preview — not yet the official Amoke Oge website\nUser-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).toString()}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
