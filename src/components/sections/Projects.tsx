"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHub } from "@/components/ui/Icons";
import { fadeUp, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";
import ProjectSlider from "@/components/ui/ProjectSlider";

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage?: string | null;
  gallery: string[];
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
        {/* Header content unchanged... */}
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

        <motion.div
          variants={shouldReduce ? motionNone : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => {
            const allImages = [
              ...(project.coverImage ? [project.coverImage] : []),
              ...(project.gallery || []),
            ];

            return (
              <motion.article
                key={project.id}
                variants={shouldReduce ? motionNone : fadeUp}
                whileHover={shouldReduce ? {} : "hover"}
                whileTap={shouldReduce ? {} : "tap"}
                className="group relative bg-[#1E293B] rounded-3xl border border-[var(--color-border)] overflow-hidden hover:border-[#22C55E]/40 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-lg hover:shadow-[#22C55E]/5"
              >
                <Link href={`/project/${project.slug}`} className="flex flex-col h-full">
                  {/* Gallery Slider */}
                  <div className="shrink-0 p-1">
                    <ProjectSlider images={allImages} title={project.title} />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-archivo text-2xl font-bold mb-3 group-hover:text-[#22C55E] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-grow text-justify tracking-wide line-clamp-3">
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

                    <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold mt-auto group/link">
                      <span>View Case Study</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
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
                      className="p-3 rounded-xl bg-[#0F172A]/90 backdrop-blur-md text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
