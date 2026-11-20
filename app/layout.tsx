import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { business } from '@/lib/business';
import './globals.css';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const title = 'RENCE Home Service Massage | Professional Massage in Bulacan';
const description = 'Professional home-service massage in Bulacan. Explore RENCE massage services and pricing, and request an appointment in Marilao, Bocaue, and Meycauayan.';
export const metadata: Metadata = {
 metadataBase: new URL(business.domain), title, description,
 alternates: { canonical: '/' },
 openGraph: { title, description, url: '/', siteName: business.name, locale: 'en_PH', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'RENCE — Your space. Your reset.' }] },
 twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
 icons: { icon: '/icon.svg', apple: '/apple-icon' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07150D' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en" className={`${manrope.variable} ${space.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
