import Image from 'next/image';
import { business } from '@/lib/business';
export function Footer() {
 return <footer className="footer section-pad"><div className="footer-top"><div><a href="#home" className="wordmark"><Image className="footer-logo" src="/images/rence-logo.png" alt="RENCE Home Service Massage" width={250} height={167}/></a><p>HOME SERVICE MASSAGE</p></div><p>YOUR SPACE.<br/>YOUR RESET.</p></div><div className="footer-middle"><p>Bulacan, Philippines<br/><span className="muted">Marilao · Bocaue · Meycauayan</span></p><div><a href={business.phoneHref}>{business.phone}</a><a href={business.viberHref}>Viber · {business.viber}</a><a href={business.telegramHref} target="_blank" rel="noopener noreferrer">Telegram · {business.telegram}</a></div><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#reviews">Reviews</a><a href="#booking">Booking</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RENCE Home Service Massage. All rights reserved.</span><span>Website by <a href="https://jcit.digital" target="_blank" rel="noopener noreferrer">JCIT Services · jcit.digital</a></span></div></footer>;
}
export function ContactBar() {
 return <nav className="contact-bar" aria-label="Quick contact"><a href={business.phoneHref}><PhoneIcon/>Call</a><a href={business.smsHref}><MessageIcon/>Message</a><a href="#booking" className="contact-book"><CalendarIcon/>Book now</a></nav>;
}
import { Phone as PhoneIcon, MessageCircle as MessageIcon, CalendarDays as CalendarIcon } from 'lucide-react';
