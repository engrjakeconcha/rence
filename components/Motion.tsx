'use client';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={{ opacity: [0.55, 1], y: reduced ? 0 : [24, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function HeroArt({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  return <motion.div ref={ref} className="hero-parallax" style={{ y: reduced ? 0 : y }}><motion.div className="hero-art-motion" initial={false} animate={{ rotate: reduced ? 0 : [0, 4, 0], scale: reduced ? 1 : [1, 1.035, 1] }} transition={{ duration: 18, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}>{children}</motion.div></motion.div>;
}
