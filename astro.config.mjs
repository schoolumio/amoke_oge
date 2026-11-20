// @ts-check
import { defineConfig } from 'astro/config';

/**
 * The public URL the site will be deployed to. Used for canonical URLs,
 * Open Graph tags, structured data and the sitemap.
 * Set SITE_URL in the deployment environment once the domain is confirmed.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://amoke-oge.example.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  image: {
    // Responsive images are generated at build time with sharp (AVIF + WebP).
    responsiveStyles: false,
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
