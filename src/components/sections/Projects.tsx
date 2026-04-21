"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHub } from "@/components/ui/Icons";
import { fadeUp, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  techStack: string[];
  isFeatured: boolean;
}

interface ProjectsProps {
  projects: Project[];
  hideHeader?: boolean;
}

export default function Projects({ projects, hideHeader = false }: ProjectsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <motion.p
                variants={shouldReduce ? motionNone : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
              >
                Projects
              </motion.p>
              <motion.h2
                variants={shouldReduce ? motionNone : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: 0.1 }}
                className="font-archivo text-4xl md:text-5xl font-bold"
              >
                Selected Work
              </motion.h2>
            </div>
            <motion.div
              variants={shouldReduce ? motionNone : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#22C55E] font-medium transition-colors duration-200 cursor-pointer"
              >
                All projects <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        )}

        {/* Grid */}
        <motion.div
          variants={shouldReduce ? motionNone : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={shouldReduce ? motionNone : fadeUp}
              className="group relative bg-[#1E293B] rounded-3xl border border-[var(--color-border)] overflow-hidden hover:border-[#22C55E]/40 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-lg hover:shadow-[#22C55E]/5"
            >
              <Link href={`/project/${project.slug}`} className="flex flex-col h-full">
                {/* Cover image */}
                {project.coverImage ? (
                  <div className="relative overflow-hidden h-64 shrink-0">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-60" />
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-[#22C55E] font-archivo font-bold text-2xl">
                        {project.title[0]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-archivo text-2xl font-bold mb-3 group-hover:text-[#22C55E] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-grow">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[#0F172A]/50 border border-[var(--color-border)] text-[#94A3B8] text-[10px] uppercase tracking-wider font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-3 py-1 rounded-lg bg-[#0F172A]/50 border border-[var(--color-border)] text-[#475569] text-[10px] font-bold">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* View case study link indicator */}
                  <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold mt-auto group/link">
                    <span>View Case Study</span>
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Quick links overlay */}
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} GitHub repository`}
                    className="p-3 rounded-xl bg-[#0F172A]/90 backdrop-blur-md text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <GitHub size={20} />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} live demo`}
                    className="p-3 rounded-xl bg-[#0F172A]/90 backdrop-blur-md text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
