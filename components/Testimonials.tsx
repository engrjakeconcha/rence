'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '@/lib/business';
export function Testimonials() {
 const [index,setIndex] = useState(0);
 const reduced = useReducedMotion();
 if (!reviews.length) return <p className="review-statement">Stories to come.</p>;
 const review = reviews[index];
 return <div className="testimonial-viewer"><div aria-live="polite" aria-atomic="true" className="testimonial-stage"><AnimatePresence mode="wait" initial={false}><motion.figure className="review" key={index} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:reduced?0:.22}}><blockquote>“{review.quote}”</blockquote><figcaption>{review.author}<span>Anonymous excerpt · shared with RENCE</span></figcaption></motion.figure></AnimatePresence></div><div className="review-controls"><p>{String(index+1).padStart(2,'0')} <span>/ {String(reviews.length).padStart(2,'0')}</span></p><div><button type="button" onClick={()=>setIndex((index-1+reviews.length)%reviews.length)} aria-label="Previous client review"><ChevronLeft size={20}/></button><button type="button" onClick={()=>setIndex((index+1)%reviews.length)} aria-label="Next client review"><ChevronRight size={20}/></button></div></div><p className="review-source-note">Excerpts from client messages supplied by RENCE. Names are withheld for privacy.</p></div>;
}
