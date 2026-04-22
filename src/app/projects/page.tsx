import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsGrid from "@/components/sections/Projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Portfolio",
  description:
    "Browse through my full collection of projects and case studies.",
};

// Revalidate every hour
export const revalidate = 3600;

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#22C55E] text-sm font-medium transition-colors duration-200 mb-8 cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <h1 className="font-archivo text-4xl md:text-6xl font-bold mb-4">
              All Projects
            </h1>
            <p className="text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
              An archive of everything I&apos;ve built—ranging from AI systems
              to other projects.
            </p>
          </div>

          <ProjectsGrid projects={projects} hideHeader={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
