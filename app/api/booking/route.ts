import { business } from '@/lib/business';

export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; reset: number }>();
const response = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max + 1) : '';

export async function POST(request: Request) {
 const origin = request.headers.get('origin');
 if (origin && origin !== new URL(request.url).origin && origin !== business.domain) return response({ error: 'Please submit from the RENCE website.' }, 403);
 if (!request.headers.get('content-type')?.includes('application/json')) return response({ error: 'Invalid request format.' }, 415);
 if (Number(request.headers.get('content-length')) > 4096) return response({ error: 'Request is too large.' }, 413);
 let data;
 try {
  const raw = await request.text();
  if (raw.length > 4096) return response({ error: 'Request is too large.' }, 413);
  data = JSON.parse(raw);
 } catch { return response({ error: 'Please check your details and try again.' }, 400); }
 if (!data || typeof data !== 'object' || Array.isArray(data)) return response({ error: 'Invalid booking details.' }, 400);
 if (data.website) return response({ error: 'Please contact Rence directly to book.' }, 400);
 const name = clean(data.name, 100), contact = clean(data.contact, 30), address = clean(data.address, 500);
 const service = business.services.find(item => item.id === data.product);
 const requestId = clean(data.requestId, 36);
 if (name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) || !/^[+\d() .-]{7,30}$/.test(contact) || contact.replace(/\D/g, '').length < 7 || address.length < 10 || address.length > 500 || !service || !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(requestId)) return response({ error: 'Please enter your name, a valid contact number, full address, and selected product.' }, 400);
 // Best-effort per-instance throttle; never retain customer details in this map.
 const now = Date.now();
 for (const [key, value] of attempts) if (value.reset < now) attempts.delete(key);
 const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
 const entry = attempts.get(ip) || { count: 0, reset: now + 15 * 60_000 };
 if (entry.count >= 5) return response({ error: 'Too many requests. Please try again later or contact Rence by SMS.' }, 429);
 entry.count++; attempts.set(ip, entry);
 const apiKey = process.env.RESEND_API_KEY;
 const from = process.env.RESEND_FROM_EMAIL;
 if (!apiKey || !from) return response({ error: 'Online requests are temporarily unavailable. Please contact Rence directly.' }, 503);
 const text = `New RENCE booking request\n\nName: ${name}\nContact number: ${contact}\nAddress: ${address}\nProduct: ${service.name}\nDuration: ${service.duration}\nPrice: ₱${service.price.toLocaleString('en-PH')}\n\nStatus: Awaiting Rence’s confirmation. Contact the customer to arrange the schedule.\nRequest ID: ${requestId}`;
 try {
  const email = await fetch('https://api.resend.com/emails', {
   method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `booking-${requestId}` },
   body: JSON.stringify({ from, to: [process.env.BOOKING_NOTIFICATION_EMAIL || 'massagehomeservice07@gmail.com'], subject: `RENCE booking request · ${service.name} (${service.duration})`, text }),
   signal: AbortSignal.timeout(12_000),
  });
  if (!email.ok) { console.error('Booking email rejected', { status: email.status }); return response({ error: 'Your request could not be sent. Please try again or contact Rence directly.' }, 502); }
 } catch { console.error('Booking email unavailable'); return response({ error: 'Your request could not be sent. Please try again or contact Rence directly.' }, 502); }
 // Email is the primary delivery channel. A Telegram failure must not ask customers to resubmit an already delivered request.
 const token = process.env.TELEGRAM_BOT_TOKEN, chatId = process.env.TELEGRAM_CHAT_ID;
 if (token && chatId) {
  try {
   const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text, protect_content: true }), signal: AbortSignal.timeout(6_000) });
   const result = await telegram.json();
   if (!telegram.ok || !result.ok) console.error('Booking Telegram notification failed', { status: telegram.status });
  } catch { console.error('Booking Telegram notification unavailable'); }
 }
 return response({ ok: true });
}
