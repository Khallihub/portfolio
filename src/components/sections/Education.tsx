"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface Education {
  id: string;
  institution: string;
  degree: string;
  description?: string | null;
  startYear: number;
  endYear?: number | null;
}

interface EducationProps {
  education: Education[];
}

export default function Education({ education }: EducationProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Education
        </motion.p>
        <motion.h2
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="font-archivo text-4xl md:text-5xl font-bold mb-16"
        >
          Academic Background
        </motion.h2>

        <motion.div
          variants={shouldReduce ? motionNone : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => (
            <motion.article
              key={edu.id}
              variants={shouldReduce ? motionNone : fadeUp}
              className="bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6 flex gap-4"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#22C55E]" />
              </div>
              <div>
                <h3 className="font-archivo font-semibold text-lg leading-tight mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[#22C55E] text-sm font-medium mb-1">
                  {edu.institution}
                </p>
                <p className="text-[#94A3B8] text-sm mb-2">
                  {edu.startYear} — {edu.endYear ?? "Present"}
                </p>
                {edu.description && (
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
