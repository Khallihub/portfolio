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
          <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-[#22C55E] via-[#334155] to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={shouldReduce ? motionNone : fadeUp}
                className="relative md:pl-20 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18.5px] top-4 hidden md:flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#22C55E] ring-4 ring-[#0F172A] group-hover:ring-[#22C55E]/20 transition-all duration-300" />
                </div>

                <Link href={`/experience/${exp.slug}`} className="block">
                  <article className="bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6 hover:border-[#22C55E]/40 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-archivo text-xl font-semibold group-hover:text-[#22C55E] transition-colors duration-200">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-[#94A3B8] text-sm">
                          <span className="font-medium text-[#F8FAFC]">
                            {exp.company}
                          </span>
                          {exp.location && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-[#94A3B8]">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </p>
                        <p className="text-xs text-[#22C55E] font-medium mt-0.5">
                          {getYearSpan(exp.startDate, exp.endDate)}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 text-justify tracking-wide">
                      {exp.description}
                    </p>

                    {exp.highlights.length > 0 && (
                      <ul className="flex flex-col gap-1.5 mb-4">
                        {exp.highlights.slice(0, 3).map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[#94A3B8]"
                          >
                            <span className="text-[#22C55E] mt-0.5 shrink-0">
                              ▸
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center gap-1 text-[#22C55E] text-sm font-medium">
                      View full story <ArrowRight size={14} />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
