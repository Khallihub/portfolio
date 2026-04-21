import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const experiences = await prisma.experience.findMany({
    select: { slug: true },
  });
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = await prisma.experience.findUnique({ where: { slug } });
  if (!exp) return {};
  return {
    title: `${exp.role} at ${exp.company}`,
    description: exp.description,
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const exp = await prisma.experience.findUnique({ where: { slug } });
  if (!exp) notFound();

  const fullStoryHtml = exp.fullStory
    ? await markdownToHtml(exp.fullStory)
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#22C55E] text-sm font-medium transition-colors duration-200 mb-10 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to experience
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="font-archivo text-4xl md:text-5xl font-bold mb-3">
              {exp.role}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#94A3B8]">
              <span className="text-[#22C55E] font-semibold text-xl">
                {exp.company}
              </span>
              {exp.location && (
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin size={14} /> {exp.location}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm">
                <Calendar size={14} />
                {formatDate(exp.startDate)} —{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </span>
            </div>
          </header>

          {/* Highlights */}
          {exp.highlights.length > 0 && (
            <section className="mb-10 bg-[#1E293B] rounded-2xl border border-[var(--color-border)] p-6">
              <h2 className="font-archivo font-semibold text-sm text-[#22C55E] uppercase tracking-widest mb-4">
                Key Impact
              </h2>
              <ul className="flex flex-col gap-3">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#22C55E] mt-0.5 shrink-0">▸</span>
                    <span className="text-[#94A3B8] text-sm leading-relaxed">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Summary */}
          <div className="mb-10">
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              {exp.description}
            </p>
          </div>

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
