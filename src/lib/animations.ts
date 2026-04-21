import { Variants } from "framer-motion";

// ─── Core Variants ───────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Container (stagger children) ────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerDelayed: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// ─── Interaction Variants ───────────────────────────────────────────────────

export const hoverScale: Variants = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const tapScale: Variants = {
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeInOut" },
  },
};

// ─── Hero-specific ───────────────────────────────────────────────────────────

export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Viewport defaults (once: true — trigger only on first scroll into view) ─

export const viewportOnce = { once: true, amount: 0.1 } as const;
export const viewportFlexible = { once: true, amount: 0.05 } as const;

// ─── Reduced-motion safe variants ─────────────────────────────────────────────
// Pass these into motion components instead of the originals when
// `prefers-reduced-motion` is set. The ClientMotionWrapper component
// in the app handles this automatically.

export const motionNone: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
