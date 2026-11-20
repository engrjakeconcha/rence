export const GOOGLE_CALENDAR_EMBED_URL = 'https://calendar.google.com/calendar/embed?src=c_dbad59b3d20f2b30f7045b9c108cb20b1199bcb13eb3470c857c568aa0e78ff2%40group.calendar.google.com&ctz=Asia%2FManila';
const appointmentUrl = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_BOOKING_URL?.trim() || '';
// Reject unrelated URLs or protocols before rendering a public booking link.
function validateAppointmentUrl(value: string) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && ['calendar.google.com', 'calendar.app.google'].includes(url.hostname)) return url.href;
  } catch { /* A missing/invalid URL keeps direct-contact booking available. */ }
  return '';
}
export const GOOGLE_APPOINTMENT_BOOKING_URL = validateAppointmentUrl(appointmentUrl);
export const SHOW_AVAILABILITY_CALENDAR = process.env.NEXT_PUBLIC_SHOW_AVAILABILITY_CALENDAR === 'true';
