"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, staggerFast, viewportOnce, motionNone, scaleEntrance } from "@/lib/animations";

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
                className="bg-[#1E293B] rounded-3xl border border-[var(--color-border)] p-8 hover:border-[#22C55E]/40 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/10 flex items-center justify-center">
                    <span className="text-[#22C55E] text-lg font-bold">
                      {category[0]}
                    </span>
                  </div>
                  <h3 className="font-archivo text-xl font-bold uppercase tracking-wider text-[#F8FAFC]">
                    {category}
                  </h3>
                </div>
                <motion.div 
                  variants={shouldReduce ? motionNone : staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex flex-wrap gap-3"
                >
                  {catSkills.map((skill) => (
                    <motion.span
                      key={skill.id}
                      variants={shouldReduce ? motionNone : scaleEntrance}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 197, 94, 0.1)", borderColor: "rgba(34, 197, 94, 0.4)" }}
                      className="px-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-[#94A3B8] text-sm font-semibold transition-all cursor-default"
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
