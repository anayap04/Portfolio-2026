import type { Variants } from 'motion/react';

/** Stagger container — children animate in sequence */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/** Default item reveal animation */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/** Reduced-motion-safe variant — instant with no transform */
export const noMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
