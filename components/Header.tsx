import { Sparkle } from 'lucide-react';
export function Header() {
 return <header className="header"><a className="wordmark" href="#home" aria-label="RENCE home">RENCE<span className="logo-spark"><Sparkle size={18}/></span></a><nav aria-label="Main navigation"><a href="#services">Services</a><a href="#reviews">Reviews</a><a className="nav-book" href="#booking">Book now</a></nav></header>;
}
