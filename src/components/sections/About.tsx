"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeLeft, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface AboutProps {
  statement: string;
  bio?: string | null;
}

export default function About({ statement, bio }: AboutProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Statement (big) */}
          <motion.div
            variants={shouldReduce ? motionNone : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-archivo text-4xl md:text-5xl font-bold leading-tight">
              {statement}
            </h2>
          </motion.div>

          {/* Bio */}
          {bio && (
            <motion.div
              variants={shouldReduce ? motionNone : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: 0.15 }}
            >
              <p className="text-[#94A3B8] text-lg leading-relaxed text-justify tracking-wide">
                {bio}
              </p>

              {/* Decorative accent line */}
              <div className="mt-8 h-px bg-gradient-to-r from-[#22C55E] to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
