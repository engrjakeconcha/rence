// Integration checks against a running production server: npm start, then npm test.
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200, 'Home page should render');
const html = await response.text();
for (const anchor of ['services', 'reviews', 'booking']) assert.ok(html.includes(`id="${anchor}"`), `Missing ${anchor} destination`);
for (const href of ['tel:+639617380298', 'sms:+639617380298', 'viber://chat?number=%2B639482148277', 'https://t.me/Rence_24F']) assert.ok(html.includes(href), `Missing exact contact href: ${href}`);
assert.ok(html.includes('https://rencemassage.world'), 'Missing canonical domain');
assert.ok(!html.includes('/reference-assets/'), 'Private reference photos must never be served');
const rawSchema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
assert.ok(rawSchema, 'Structured data should exist');
const schema = JSON.parse(rawSchema);
assert.deepEqual(schema.hasOfferCatalog.itemListElement.map(x => x.price), [699, 900, 1000]);
assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'No invented ratings');
assert.ok(!schema.address, 'No invented address');
if (!process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_BOOKING_URL) assert.ok(html.includes('ONLINE BOOKING COMING SOON'), 'Missing honest booking fallback');
for (const path of ['/robots.txt', '/sitemap.xml', '/icon.svg', '/opengraph-image', '/apple-icon']) {
 const res = await fetch(`${base}${path}`);
 assert.equal(res.status, 200, `${path} should load`);
 if (path === '/sitemap.xml') assert.ok((await res.text()).includes('https://rencemassage.world'));
}
assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
console.log('Passed: page rendering, anchor destinations, exact contact links, pricing schema, honest booking fallback, private reference exclusion, SEO routes, social icons, and response headers.');
