import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { GitHub } from "@/components/ui/Icons";
import Link from "next/link";
import ProjectSlider from "@/components/ui/ProjectSlider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.coverImage ? [project.coverImage] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const fullStoryHtml = project.fullStory
    ? await markdownToHtml(project.fullStory)
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#22C55E] text-sm font-medium transition-colors duration-200 mb-10 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-[#1E293B] border border-[var(--color-border)] text-[#94A3B8] text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="font-archivo text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-6">
              {project.shortDescription}
            </p>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E293B] border border-[var(--color-border)] text-[#F8FAFC] hover:border-[#22C55E]/40 font-medium text-sm transition-colors duration-200 cursor-pointer"
                >
                  <GitHub size={16} /> GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] text-[#0F172A] hover:bg-[#16A34A] font-semibold text-sm transition-colors duration-200 cursor-pointer"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </header>

          {/* Gallery Slider */}
          <div className="mb-12">
            <ProjectSlider 
              images={[
                ...(project.coverImage ? [project.coverImage] : []),
                ...(project.gallery || []),
              ]} 
              title={project.title}
              aspectRatio="cover"
            />
          </div>

          {/* YouTube video */}
          {project.videoUrl && (
            <div className="mb-10">
              <div className="flex items-center gap-2 text-[#22C55E] text-sm font-medium mb-3">
                <Play size={14} /> Demo Video
              </div>
              <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden border border-[var(--color-border)]">
                <iframe
                  src={project.videoUrl.replace("watch?v=", "embed/")}
                  title={`${project.title} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Challenges + Outcomes */}
          {(project.challenges || project.outcomes) && (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {project.challenges && (
                <div className="bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6">
                  <h2 className="font-archivo font-semibold text-sm text-[#22C55E] uppercase tracking-widest mb-3">
                    Challenges
                  </h2>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}
              {project.outcomes && (
                <div className="bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6">
                  <h2 className="font-archivo font-semibold text-sm text-[#22C55E] uppercase tracking-widest mb-3">
                    Outcomes
                  </h2>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {project.outcomes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Full story */}
          {fullStoryHtml && (
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: fullStoryHtml }}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
