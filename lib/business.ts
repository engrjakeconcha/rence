export const business = {
  name: 'RENCE Home Service Massage', brand: 'RENCE', domain: 'https://rencemassage.world',
  location: 'Bulacan, Philippines', timezone: 'Asia/Manila', clientele: 'Male clients only',
  phone: '0961 738 0298', phoneHref: 'tel:+639617380298', smsHref: 'sms:+639617380298',
  viber: '0948 214 8277', viberHref: 'viber://chat?number=%2B639482148277',
  telegram: '@Rence_24F', telegramHref: 'https://t.me/Rence_24F',
  areas: ['Marilao', 'Bocaue', 'Meycauayan'],
  techniques: ['Shiatsu massage', 'Swedish massage', 'Body stretching', 'Massage with Ventosa'],
  services: [
    { id: 'whole-body-60', name: 'Whole body massage', duration: '60 minutes', price: 699, tag: 'THE EVERYDAY RESET', description: 'A little time for yourself. A whole-body reset, right at home.', image: 'wholeBody', art: 'flow' },
    { id: 'whole-body-90', name: 'Whole body massage', duration: '90 minutes', price: 900, tag: 'TAKE YOUR TIME', description: 'More time to slow down. Make room for a longer moment of calm.', image: 'technique', art: 'ripple' },
    { id: 'ventosa', name: 'Massage with Ventosa', duration: null, price: 1000, tag: 'A DIFFERENT RHYTHM', description: 'Massage meets cupping. Ask Rence about the session and duration.', image: 'ventosa', art: 'orbit' },
  ],
} as const;
export type Review = { quote: string; author: string; permissionToPublish: true };
// Add only genuine reviews with the author's permission.
export const reviews: Review[] = [];
