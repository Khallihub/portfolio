"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface Experience {
  id: string;
  slug: string;
  role: string;
  company: string;
  location?: string | null;
  description: string;
  highlights: string[];
  startDate: Date;
  endDate?: Date | null;
}

interface ExperienceProps {
  experiences: Experience[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getYearSpan(start: Date, end?: Date | null) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y}yr ${m}mo` : `${y}yr`;
}

export default function Experience({ experiences }: ExperienceProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Experience
        </motion.p>
        <motion.h2
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="font-archivo text-4xl md:text-5xl font-bold mb-16"
        >
          Where I&apos;ve Worked
        </motion.h2>

        {/* Timeline */}
        <motion.div
          variants={shouldReduce ? motionNone : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          {/* Vertical line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={viewportOnce}
            className="absolute left-6 top-3 w-px bg-gradient-to-b from-[#22C55E] via-[#334155] to-transparent hidden md:block" 
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={shouldReduce ? motionNone : fadeUp}
                className="relative md:pl-20 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18.5px] top-4 hidden md:flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                    className="w-3 h-3 rounded-full bg-[#22C55E] ring-4 ring-[#0F172A] group-hover:ring-[#22C55E]/20 transition-all duration-300" 
                  />
                </div>

                <Link href={`/experience/${exp.slug}`} className="block">
                  <motion.article 
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1E293B] rounded-3xl border border-[var(--color-border)] p-8 hover:border-[#22C55E]/40 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[#22C55E]/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-archivo text-2xl font-bold group-hover:text-[#22C55E] transition-colors duration-200">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-[#94A3B8] text-sm">
                          <span className="font-semibold text-[#F8FAFC] px-3 py-1 bg-[#0F172A] rounded-lg border border-[#334155]">
                            {exp.company}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                              <MapPin size={14} className="text-[#22C55E]" />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <p className="text-sm font-bold text-[#F8FAFC]">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </p>
                        <p className="text-xs text-[#22C55E] font-bold tracking-widest uppercase mt-1">
                          {getYearSpan(exp.startDate, exp.endDate)}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#94A3B8] text-base leading-relaxed mb-6 text-justify tracking-wide">
                      {exp.description}
                    </p>

                    {exp.highlights.length > 0 && (
                      <ul className="flex flex-col gap-3 mb-8">
                        {exp.highlights.slice(0, 3).map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={viewportOnce}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start gap-3 text-sm text-[#94A3B8]"
                          >
                            <span className="text-[#22C55E] mt-1 shrink-0 font-bold">
                              ▸
                            </span>
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold group/link">
                      <span>Explore full journey</span> 
                      <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform duration-300" />
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
