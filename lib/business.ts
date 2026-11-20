export const business = {
  name: 'RENCE Home Service Massage', brand: 'RENCE', domain: 'https://rencemassage.world',
  location: 'Bulacan, Philippines', timezone: 'Asia/Manila', clientele: 'Male clients only',
  phone: '0961 738 0298', phoneHref: 'tel:+639617380298', smsHref: 'sms:+639617380298',
  viber: '0948 214 8277', viberHref: 'viber://chat?number=%2B639482148277',
  telegram: '@Rence_24F', telegramHref: 'https://t.me/Rence_24F',
  areas: ['Marilao', 'Bocaue', 'Meycauayan'],
  techniques: ['Shiatsu massage', 'Swedish massage', 'Body stretching', 'Massage with Ventosa'],
  services: [
    { id: 'whole-body-60', name: 'Whole body massage', duration: '60 minutes', price: 699, tag: 'THE EVERYDAY RESET', description: 'A little time for yourself. A whole-body reset, right at home.', image: 'setup', art: 'flow' },
    { id: 'whole-body-90', name: 'Whole body massage', duration: '90 minutes', price: 900, tag: 'TAKE YOUR TIME', description: 'More time to slow down. Make room for a longer moment of calm.', image: 'technique', art: 'ripple' },
    { id: 'ventosa', name: 'Massage with Ventosa', duration: null, price: 1000, tag: 'A DIFFERENT RHYTHM', description: 'Massage meets cupping. Ask Rence about the session and duration.', image: 'ventosa', art: 'orbit' },
  ],
} as const;
export type Review = { quote: string; author: string; source: string };
// Anonymous excerpts from the owner's supplied screenshots. No names or ratings are invented.
export const reviews: Review[] = [
  { quote: "Very satisfying massage by Rence! Even though it was a last-minute service, he politely responded and accommodated me.", author: "Client feedback", source: "supplied-screenshot-03" },
  { quote: "The pressure was perfectly adjusted to my needs, and the techniques used provided both deep relief and complete relaxation.", author: "Client feedback", source: "supplied-screenshot-04" },
  { quote: "Sobrang approachable at magaan kasama. Sulit ang bayad. Ulit ulit", author: "Client feedback", source: "supplied-screenshot-05" },
  { quote: "Boss thanks sa massage kanina, legit sa alam mo ginagawa mo very attentive sa customers concerns and most importantly Hindi nagmmdli...until next time", author: "Client feedback", source: "supplied-screenshot-08" },
  { quote: "He made sure na comfortable ako sa pressure na binibigay nya.", author: "Client feedback", source: "supplied-screenshot-09" },
];
