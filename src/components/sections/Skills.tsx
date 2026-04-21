"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, staggerFast, viewportOnce, motionNone } from "@/lib/animations";

interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number | null;
}

interface SkillsProps {
  skills: Skill[];
}

const PREFERRED_ORDER = ["AI Systems", "Backend", "Frontend", "DevOps"];

export default function Skills({ skills }: SkillsProps) {
  const shouldReduce = useReducedMotion();

  // Dynamically extract all unique categories
  const categories = Array.from(new Set(skills.map(s => s.category)));
  
  // Sort categories: preferred ones first, then alphabetical
  const sortedCategories = categories.sort((a, b) => {
    const aIdx = PREFERRED_ORDER.indexOf(a);
    const bIdx = PREFERRED_ORDER.indexOf(b);
    
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });

  const grouped = sortedCategories.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Skills
        </motion.p>
        <motion.h2
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="font-archivo text-4xl md:text-5xl font-bold mb-16"
        >
          What I Work With
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([category, catSkills]) => {
            if (!catSkills.length) return null;
            return (
              <motion.div
                key={category}
                variants={shouldReduce ? motionNone : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6"
              >
                <h3 className="font-archivo text-sm font-semibold text-[#22C55E] tracking-widest uppercase mb-5">
                  {category}
                </h3>
                <motion.div
                  variants={shouldReduce ? motionNone : staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex flex-wrap gap-2.5"
                >
                  {catSkills.map((skill) => (
                    <motion.span
                      key={skill.id}
                      variants={shouldReduce ? motionNone : fadeUp}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] border border-[var(--color-border)] text-[#F8FAFC] text-sm font-medium hover:border-[#22C55E]/50 hover:text-[#22C55E] transition-colors duration-200 cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
