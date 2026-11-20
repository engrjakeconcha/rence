// Exercise the real route logic with mocked providers; never send customer/test email.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
const compile = source => stripTypeScriptTypes(source);
const dataUrl = code => `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const businessUrl = dataUrl(compile(await fs.readFile('lib/business.ts', 'utf8')));
const source = compile(await fs.readFile('app/api/booking/route.ts', 'utf8')).replace("'@/lib/business'", JSON.stringify(businessUrl));
const { POST } = await import(dataUrl(source));
const originalFetch = globalThis.fetch;
let calls = [], emailStatus = 200, telegramStatus = 200;
globalThis.fetch = async (url, options) => {
 calls.push({ url, options, body: JSON.parse(options.body) });
 const status = url.includes('resend.com') ? emailStatus : telegramStatus;
 return Response.json({ ok: status === 200 }, { status });
};
const valid = { name: 'Route Test', contact: '09123456789', address: '123 Test Street, Marilao', product: 'whole-body-60', requestId: '12345678-1234-1234-1234-123456789abc' };
let ip = 0;
const send = (data, origin = 'https://rencemassage.world') => POST(new Request('https://rencemassage.world/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json', origin, 'x-forwarded-for': `192.0.2.${++ip}` }, body: JSON.stringify(data) }));
try {
 assert.equal((await send(valid, 'https://unrelated.example')).status, 403);
 for (const invalid of [null, [], { ...valid, name: '' }, { ...valid, contact: 'bad' }, { ...valid, product: 'invented' }, { ...valid, address: 'short' }, { ...valid, website: 'spam' }, { ...valid, requestId: '' }]) assert.equal((await send(invalid)).status, 400);
 assert.equal(calls.length, 0, 'Invalid requests must never reach providers');
 delete process.env.RESEND_API_KEY; delete process.env.RESEND_FROM_EMAIL;
 assert.equal((await send(valid)).status, 503);
 process.env.RESEND_API_KEY = 'test'; process.env.RESEND_FROM_EMAIL = 'Test <test@example.com>';
 emailStatus = 422;
 assert.equal((await send(valid)).status, 502, 'Provider rejection must not report success');
 emailStatus = 200; calls = [];
 for (const [product, price] of [['whole-body-60', '₱699'], ['whole-body-90', '₱900'], ['ventosa', '₱1,000']]) {
  const result = await send({ ...valid, product }); assert.equal(result.status, 200);
  assert.ok(calls.at(-1).body.text.includes(price));
  assert.deepEqual(calls.at(-1).body.to, ['massagehomeservice07@gmail.com']);
  assert.equal(calls.at(-1).options.headers['Idempotency-Key'], `booking-${valid.requestId}`);
 }
 process.env.TELEGRAM_BOT_TOKEN = 'test'; process.env.TELEGRAM_CHAT_ID = '123';
 calls = []; telegramStatus = 500;
 assert.equal((await send(valid)).status, 200, 'Telegram failure must not lose accepted email');
 assert.equal(calls.length, 2); assert.equal(calls[1].body.chat_id, '123');
 const rateRequest = () => POST(new Request('https://rencemassage.world/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.200' }, body: JSON.stringify(valid) }));
 delete process.env.TELEGRAM_BOT_TOKEN;
 for (let i = 0; i < 5; i++) assert.equal((await rateRequest()).status, 200);
 assert.equal((await rateRequest()).status, 429);
 console.log('Passed: booking validation, origin checks, missing configuration, provider failure, all product prices, recipients, idempotency, Telegram fallback and throttle.');
} finally { globalThis.fetch = originalFetch; }
