import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Trust } from '@/components/Trust';
import { Booking } from '@/components/Booking';
import { Footer, ContactBar } from '@/components/Footer';
import { MotionProvider } from '@/components/Motion';
import { business } from '@/lib/business';
import { Sparkle } from 'lucide-react';
const schema = {
 '@context': 'https://schema.org', '@type': 'Organization', name: business.name, url: business.domain,
 telephone: '+639617380298', description: 'Personalized home-service massage for male clients in Bulacan, Philippines. Availability subject to confirmation.',
 areaServed: business.areas.map(name => ({ '@type': 'City', name: `${name}, Bulacan, Philippines` })),
 hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Home-service massage', itemListElement: business.services.map(s => ({ '@type': 'Offer', price: s.price, priceCurrency: 'PHP', itemOffered: { '@type': 'Service', name: `${s.name}${s.duration ? ` — ${s.duration}` : ''}`, provider: { '@type': 'Organization', name: business.name } } })) },
};
export default function Home() {
 return <MotionProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/><Header/><main id="main"><Hero/><div className="brand-strip" aria-label="Breathe. Release. Reset."><span>BREATHE.</span><Sparkle/><span>RELEASE.</span><Sparkle/><span>RESET.</span><Sparkle/><span className="strip-extra">REPEAT.</span></div><Services/><Trust/><Booking/></main><Footer/><ContactBar/></MotionProvider>;
}
