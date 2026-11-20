import { ImageResponse } from 'next/og';
export const alt = 'RENCE — Your space. Your reset. Home service massage in Bulacan.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
 return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: '#07150D', color: '#F3F5F0', padding: '60px' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}><span style={{ color: '#8CF5AE' }}>RENCE</span><span>HOME SERVICE MASSAGE · BULACAN</span></div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 94, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}><span>YOUR SPACE.</span><span style={{ color: '#8CF5AE' }}>YOUR RESET.</span></div><div style={{ fontSize: 24 }}>Your home. Your time. Your moment of calm.</div></div>, size);
}
