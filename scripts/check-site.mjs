// Integration checks against a running production server: npm start, then npm test.
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200, 'Home page should render');
const html = await response.text();
for (const anchor of ['services', 'videos', 'reviews', 'booking']) assert.ok(html.includes(`id="${anchor}"`), `Missing ${anchor} destination`);
for (const href of ['tel:+639617380298', 'sms:+639617380298', 'viber://chat?number=%2B639482148277', 'https://t.me/Rence_24F']) assert.ok(html.includes(href), `Missing exact contact href: ${href}`);
assert.ok(html.includes('https://rencemassage.world'), 'Missing canonical domain');
assert.equal((html.match(/<video /g) || []).length, 2, 'Two supplied videos should be rendered');
assert.equal((html.match(/preload="metadata"/g) || []).length, 2, 'Videos should preload metadata');
assert.equal((html.match(/autoPlay=""/g) || []).length, 2, 'Both videos should autoplay');
assert.equal((html.match(/loop=""/g) || []).length, 2, 'Both videos should loop');
assert.equal((html.match(/muted=""/g) || []).length, 2, 'Both videos should start muted');
assert.ok(html.includes('rence-hero-scrubs.webp'), 'The background-removed hero should be used');
assert.ok(!html.includes('/reference-assets/'), 'Private reference photos must never be served');
const rawSchema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
assert.ok(rawSchema, 'Structured data should exist');
const schema = JSON.parse(rawSchema);
assert.deepEqual(schema.hasOfferCatalog.itemListElement.map(x => x.price), [699, 900, 1000]);
assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'No invented ratings');
assert.ok(!schema.address, 'No invented address');
for (const field of ['name', 'contact', 'address', 'product', 'date', 'time', 'telegram']) assert.ok(html.includes(`name="${field}"`), `Missing booking field ${field}`);
assert.ok(html.includes('https://jcit.digital'), 'Missing JCIT credits');
assert.ok(!html.includes('ONLINE BOOKING COMING SOON'), 'Booking form should replace the placeholder');
assert.ok(!html.includes('calendar.google.com'), 'Google Calendar should not be used for booking');
for (const path of ['/robots.txt', '/sitemap.xml', '/icon.svg', '/opengraph-image', '/apple-icon']) {
 const res = await fetch(`${base}${path}`);
 assert.equal(res.status, 200, `${path} should load`);
 if (path === '/sitemap.xml') assert.ok((await res.text()).includes('https://rencemassage.world'));
}
assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
for (const path of ['/videos/rence-session-01.mp4', '/videos/rence-session-02.mp4']) {
 const res = await fetch(`${base}${path}`, {headers: {Range: 'bytes=0-1023'}});
 assert.equal(res.status, 206, `${path} should support byte-range playback`);
 assert.ok(res.headers.get('content-type')?.includes('video/mp4'));
 await res.body?.cancel();
}
console.log('Passed: page rendering, anchor destinations, exact contact links, pricing schema, booking request form, private reference exclusion, SEO routes, social icons, and response headers.');
