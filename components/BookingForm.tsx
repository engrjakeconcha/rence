'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { business } from '@/lib/business';

export function BookingForm() {
 const [product, setProduct] = useState('');
 const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
 const [error, setError] = useState('');
 const requestId = useRef('');
 useEffect(() => {
  const selectService = () => {
   const id = window.location.hash.replace('#booking-', '');
   if (business.services.some(service => service.id === id)) {
    setProduct(id);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'instant' });
   }
  };
  selectService();
  window.addEventListener('hashchange', selectService);
  return () => window.removeEventListener('hashchange', selectService);
 }, []);
 async function submit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
  if (status === 'sending') return;
  const form = event.currentTarget;
  const data = new FormData(form);
  requestId.current ||= crypto.randomUUID();
  setStatus('sending'); setError('');
  try {
   const response = await fetch('/api/booking', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...Object.fromEntries(data), requestId: requestId.current }),
   });
   const result = await response.json();
   if (!response.ok) throw new Error(result.error || 'Your request could not be sent. Please try again or contact Rence directly.');
   setStatus('success'); form.reset(); setProduct(''); requestId.current = '';
  } catch (failure) {
   setStatus('error'); setError(failure instanceof Error ? failure.message : 'Please try again or contact Rence directly.');
  }
 }
 if (status === 'success') return <div className="booking-success" role="status"><CheckCircle2 size={40}/><h3>Request sent. Time to exhale.</h3><p>Rence will contact you to arrange your schedule and confirm availability. Your appointment is not confirmed yet.</p><button type="button" className="button button-dark" onClick={() => setStatus('idle')}>Send another request</button></div>;
 return <form className="booking-form" onSubmit={submit} onChange={() => { if (status !== 'sending') requestId.current = ''; }}>
  <div className="booking-fields"><label>Full name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name"/></label><label>Contact number<input name="contact" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} placeholder="09XX XXX XXXX"/></label><label className="field-wide">Home service address<textarea name="address" autoComplete="street-address" required minLength={10} maxLength={500} rows={3} placeholder="House / unit, street, barangay, city"/></label><label className="field-wide">Product<select name="product" value={product} required onChange={event => setProduct(event.target.value)}><option value="" disabled>Choose your massage</option>{business.services.map(service => <option key={service.id} value={service.id}>{service.name} · {service.duration} · ₱{service.price.toLocaleString('en-PH')}</option>)}</select></label></div>
  <div className="booking-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <p className="form-note">By submitting, you agree to share these details with Rence to arrange your home service. Requests are welcome 24/7; every appointment needs confirmation. Male clients only.</p>
  {error && <p className="form-error" role="alert">{error} <a href={business.smsHref}>Send an SMS</a></p>}
  <button className="button button-dark" type="submit" disabled={status === 'sending'}><Send size={17}/>{status === 'sending' ? 'Sending request…' : 'Request a booking'}</button>
  <p className="form-note">No payment is collected here. Rence will contact you about your preferred time.</p>
 </form>;
}
