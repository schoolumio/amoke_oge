/**
 * End-to-end checks against the production build (dist/).
 * Run `npm run build` first, then `npm test`.
 * Requires Playwright with Chromium (`npx playwright install chromium` if missing).
 */
import { createServer } from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(require.resolve('playwright', { paths: [process.env.NODE_PATH ?? '', '/usr/lib/node_modules', '/usr/local/lib/node_modules'] })));
}

const DIST = resolve('dist');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

async function resolveFile(urlPath) {
  let p = join(DIST, decodeURIComponent(urlPath.split('?')[0]));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
    return p;
  } catch {
    try { await stat(p + '.html'); return p + '.html'; } catch { return null; }
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url);
  if (!file) { res.writeHead(404); res.end(await readFile(join(DIST, '404.html'))); return; }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}`;

let failures = 0;
let passes = 0;
const check = (cond, msg) => {
  if (cond) { passes++; } else { failures++; console.error('  ✗', msg); }
};
const section = (t) => console.log(`\n▸ ${t}`);

const browser = await chromium.launch();
const WHATSAPP = '2348141250336';

// ---------------------------------------------------------------- image budget
section('Image budget (every image ≤ 200 KB)');
{
  const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true })).map((d) => d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]))).flat();
  const images = (await walk(DIST)).filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f));
  let largest = 0;
  for (const f of images) {
    const { size } = await stat(f);
    largest = Math.max(largest, size);
    check(size <= 200 * 1024, `${f.replace(DIST, '')} is ${Math.round(size / 1024)} KB`);
  }
  console.log(`  ${images.length} images, largest ${Math.round(largest / 1024)} KB`);
}
const pages = ['/', '/locations/ikoyi-obalende', '/locations/bawala-pedro', '/locations/surulere', '/locations/onipanu', '/photo-credits', '/404'];

// ---------------------------------------------------------------- static checks
section('Links, images, structured data, WhatsApp URLs');
for (const path of pages) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !m.text().includes('maps') && errors.push(m.text()));
  await page.goto(BASE + path, { waitUntil: 'load' });
  check(errors.length === 0, `${path}: console errors: ${errors.join(' | ')}`);

  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content ?? '',
    canonical: document.querySelector('link[rel=canonical]')?.href ?? '',
    og: document.querySelector('meta[property="og:image"]')?.content ?? '',
    h1: document.querySelectorAll('h1').length,
    imgs: [...document.images].map((i) => ({ src: i.currentSrc || i.src, alt: i.getAttribute('alt') })),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  }));
  check(info.title.length > 10 && info.title.length <= 90, `${path}: title length ${info.title.length}`);
  if (path !== '/404') check(info.desc.length >= 50 && info.desc.length <= 200, `${path}: meta description length ${info.desc.length}`);
  check(info.canonical.startsWith('http'), `${path}: canonical`);
  check(info.og.endsWith('/og-image.jpg'), `${path}: og:image`);
  check(info.h1 === 1, `${path}: exactly one h1 (found ${info.h1})`);
  for (const img of info.imgs) check(img.alt !== null, `${path}: image without alt attribute ${img.src}`);

  for (const href of info.links) {
    if (href.startsWith('https://wa.me/')) {
      const u = new URL(href);
      const text = u.searchParams.get('text') ?? '';
      check(/Amoke Oge/.test(text), `${path}: WhatsApp link without prefilled message: ${href}`);
      check(u.pathname === `/${WHATSAPP}`, `${path}: WhatsApp link not pointing at +${WHATSAPP}: ${href}`);
    } else if (href.startsWith('#') || href.startsWith('/')) {
      const [p, hash] = href.split('#');
      const target = p || path;
      if (p) {
        const res = await fetch(BASE + p);
        check(res.ok, `${path}: broken internal link ${href} (${res.status})`);
      }
      if (hash && target === path) check(info.ids.includes(hash), `${path}: missing anchor #${hash}`);
      if (hash && target === '/' && path !== '/') {
        const home = await (await fetch(BASE + '/')).text();
        check(home.includes(`id="${hash}"`), `${path}: missing anchor /#${hash}`);
      }
    } else {
      check(/^(https:|tel:|mailto:)/.test(href), `${path}: unexpected link ${href}`);
    }
  }

  for (const raw of info.ld) {
    let json;
    try { json = JSON.parse(raw); } catch { check(false, `${path}: invalid JSON-LD`); continue; }
    const s = JSON.stringify(json);
    check(!/aggregateRating|"review"|ratingValue/.test(s), `${path}: JSON-LD must not contain ratings or reviews`);
    check(!/"telephone"/.test(s), `${path}: JSON-LD contains an unconfirmed telephone`);
    check(/"Restaurant"/.test(s), `${path}: JSON-LD has no Restaurant entity`);
  }
  await page.close();
}

for (const f of ['/sitemap.xml', '/robots.txt', '/og-image.jpg', '/favicon.svg', '/site.webmanifest', '/icon-512.png']) {
  const res = await fetch(BASE + f);
  check(res.ok, `${f} is served`);
}
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text();
check((sitemap.match(/<loc>/g) ?? []).length === 6, 'sitemap lists home, 4 branches and credits');

// ---------------------------------------------------------------- responsive
section('No horizontal overflow (320–1440px)');
for (const width of [320, 360, 390, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const path of pages) {
    await page.goto(BASE + path, { waitUntil: 'load' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${path} @${width}px overflows by ${overflow}px`);
  }
  await page.close();
}

// ---------------------------------------------------------------- interactions
section("Today's Menu");
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const order = await page.evaluate(() => [...document.querySelectorAll('main > section')].map((s) => s.id));
  check(order[0] === 'top' && order[1] === 'today', `Today's Menu is the first section after the hero (${order.slice(0, 3).join(', ')})`);
  const soldOut = page.locator('#today .is-soldout').first();
  check(await soldOut.isVisible(), 'sold-out items are shown by default');
  await page.locator('#today .switch').click();
  check(!(await soldOut.isVisible()), '"Show available only" hides sold-out items');
  const prices = await page.locator('#today .board__price').allTextContents();
  check(prices.some((p) => /₦\d/.test(p)), 'board shows naira prices');
  await page.locator('#today [data-dish="Amala Combo"]').click();
  await page.locator('[data-order-dialog]').waitFor({ state: 'visible' });
  const msg = await page.locator('[data-order-preview]').textContent();
  check(msg.includes('1 × Amala Combo — ₦2,100') && msg.includes('Estimated total: ₦2,100'), 'deal price and total carried into the WhatsApp message');
  const href = await page.locator('[data-order-send]').getAttribute('href');
  check(href.startsWith(`https://wa.me/${WHATSAPP}?text=`), 'order is sent to the configured WhatsApp number');
  check(decodeURIComponent(href).includes("Hello Amoke Oge, I'd like to order"), 'message opens with the ready-made greeting');
  await page.close();
}

section('Order on WhatsApp flow');
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#menu').scrollIntoViewIfNeeded();
  await page.locator('[data-dish="Gbegiri"]').first().click();
  const dialog = page.locator('[data-order-dialog]');
  await dialog.waitFor({ state: 'visible' });
  check(await dialog.evaluate((d) => d.open), 'order dialog opens from a menu item');
  const preview = await page.locator('[data-order-preview]').textContent();
  check(preview.includes('1 × Gbegiri'), 'selected dish appears in the message');
  await page.locator('[data-order-items] button[aria-label^="One more"]').click();
  check((await page.locator('[data-order-preview]').textContent()).includes('2 × Gbegiri'), 'quantity stepper updates message');
  await page.selectOption('[data-order-add]', 'Jollof Rice');
  check((await page.locator('[data-order-preview]').textContent()).includes('1 × Jollof Rice'), 'dish can be added from the select');
  await page.locator('label.chip', { hasText: 'Surulere' }).click();
  await page.locator('.segmented label', { hasText: 'Delivery' }).click();
  await page.fill('#order-name', 'Tunde');
  const href = await page.locator('[data-order-send]').getAttribute('href');
  const msg = new URL(href).searchParams.get('text');
  check(msg.includes('Branch: Surulere') && msg.includes('Delivery') && msg.includes('Name: Tunde'), 'branch, order type and name are in the WhatsApp message');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  check(!(await dialog.evaluate((d) => d.open)), 'Escape closes the order dialog');
  await page.locator('[data-wa-float]').click();
  await dialog.waitFor({ state: 'visible' });
  check(true, 'floating WhatsApp button opens order flow');
  await page.locator('[data-order-close]').click();
  await page.waitForTimeout(500);

  section('Menu tabs & mobile navigation');
  await page.locator('#tab-rice').click();
  await page.waitForTimeout(300);
  check(await page.locator('#panel-rice').isVisible(), 'rice panel visible after selecting tab');
  check(!(await page.locator('#panel-swallows-soups').isVisible()), 'previous panel hidden');
  check((await page.locator('#tab-rice').getAttribute('aria-selected')) === 'true', 'aria-selected updated');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('[data-drawer-open]').click();
  await page.waitForTimeout(600);
  check(await page.locator('[data-drawer]').evaluate((d) => d.open), 'mobile drawer opens');
  await page.locator('[data-drawer-link]', { hasText: 'Locations' }).click();
  await page.waitForTimeout(2600); // smooth scroll on a long page
  check(!(await page.locator('[data-drawer]').evaluate((d) => d.open)), 'drawer closes after navigating');
  const locTop = await page.locator('#locations').evaluate((el) => el.getBoundingClientRect().top);
  check(Math.abs(locTop) < 200, `drawer link scrolls to section (top=${Math.round(locTop)})`);

  section('Gallery lightbox');
  await page.locator('[data-lightbox-index="0"]').click();
  await page.waitForTimeout(400);
  check(await page.locator('[data-lightbox]').evaluate((d) => d.open), 'lightbox opens');
  await page.locator('[data-lightbox-next]').click();
  check((await page.locator('[data-lightbox-count]').textContent()).startsWith('02'), 'lightbox next works');
  await page.keyboard.press('Escape');
  await page.close();
}

await browser.close();
server.close();
console.log(`\n${passes} checks passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
