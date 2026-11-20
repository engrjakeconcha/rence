import Image from 'next/image';
import { generatedAssets } from '@/lib/assets';
export function BrandVisual({ asset, variant = 'flow', priority = false }: { asset: string; variant?: string; priority?: boolean }) {
  const src = generatedAssets[asset];
  const descriptions: Record<string, string> = { wholeBody: 'Campaign image of Rence providing a home massage to a fully clothed male client', technique: 'Campaign close-up of a professional shoulder massage', ventosa: 'Clear Ventosa cups, massage oil, and folded forest-green towels', setup: 'Rence preparing a home-service massage table' };
  if (src) return <div className="photo-frame"><Image src={src} alt={asset === 'profile' || asset === 'heroDesktop' ? 'Rence, home-service massage therapist in Bulacan' : descriptions[asset] || 'RENCE home-service massage brand photography'} fill sizes={priority ? '(max-width: 700px) 100vw, 65vw' : '(max-width: 700px) 100vw, 50vw'} priority={priority} className="brand-photo" />{asset === 'heroDesktop' && generatedAssets.heroMobile && <Image src={generatedAssets.heroMobile} alt="" fill sizes="100vw" priority className="brand-photo mobile-hero-photo" />}</div>;
  return <div className={`brand-visual art-${variant}`} aria-hidden="true"><div className="art-halo"/><div className="sculpture"><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="visual-grain"/></div>;
}
