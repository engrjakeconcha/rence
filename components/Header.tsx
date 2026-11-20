import Image from 'next/image';
export function Header() {
 return <header className="header"><a className="wordmark" href="#home" aria-label="RENCE home"><Image className="official-logo" src="/images/rence-logo.png" alt="RENCE Home Service Massage" width={170} height={110} priority/><span className="mobile-wordmark">RENCE</span></a><nav aria-label="Main navigation"><a href="#services">Services</a><a href="#reviews">Reviews</a><a className="nav-book" href="#booking">Book now</a></nav></header>;
}
