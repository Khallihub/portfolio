"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { heroHeadline, fadeUp, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface HeroProps {
  headline: string;
  subheadline?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}

export default function Hero({ headline, subheadline, ctaText, ctaLink }: HeroProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? motionNone : undefined;

  const words = headline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22C55E 1px, transparent 1px), linear-gradient(to bottom, #22C55E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] border border-[var(--color-border)] text-[#22C55E] text-sm font-medium mb-8"
        >
          <Sparkles size={14} />
          Available for new opportunities
        </motion.div>

        {/* Headline */}
        <h1 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <motion.span
            variants={variants ?? staggerContainer}
            initial="hidden"
            animate="visible"
            className="block"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={variants ?? heroHeadline}
                className={`inline-block mr-[0.25em] ${
                  word.startsWith("*") && word.endsWith("*")
                    ? "text-[#22C55E]"
                    : ""
                }`}
              >
                {word.replace(/\*/g, "")}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <motion.p
            variants={variants ?? fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {subheadline}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          variants={variants ?? fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={ctaLink ?? "/#projects"}
            id="hero-cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#22C55E] text-[#0F172A] font-semibold text-lg hover:bg-[#16A34A] transition-colors duration-200 cursor-pointer shadow-lg shadow-[rgba(34,197,94,0.2)]"
          >
            {ctaText ?? "See My Work"}
          </Link>
          <Link
            href="/#contact"
            id="hero-contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[var(--color-border)] text-[#F8FAFC] font-medium text-lg hover:border-[#22C55E] hover:text-[#22C55E] transition-colors duration-200 cursor-pointer"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#94A3B8]"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
