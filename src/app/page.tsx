import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ExperienceSection from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "High-impact developer portfolio — explore projects, experience, and skills.",
};

// Revalidate every hour so admin changes propagate without full rebuild
export const revalidate = 3600;

async function getData() {
  // We fetch core layout data first, then content.
  // This reduces the number of concurrent connections opened at once.
  const [sections, hero, about, contactConfig] = await Promise.all([
    prisma.section.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.heroContent.findFirst(),
    prisma.aboutContent.findFirst(),
    prisma.contactConfig.findFirst(),
  ]);

  const [projects, experiences, skills, education] = await Promise.all([
    prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { category: "asc" } }),
    prisma.education.findMany({ orderBy: { startYear: "asc" } }),
  ]);

  return {
    sections,
    hero,
    about,
    projects,
    experiences,
    skills,
    education,
    contactConfig,
  };
}

function renderSection(
  type: string,
  data: Awaited<ReturnType<typeof getData>>,
) {
  switch (type) {
    case "hero":
      if (!data.hero) return null;
      return (
        <Hero
          key="hero"
          headline={data.hero.headline}
          subheadline={data.hero.subheadline}
          ctaText={data.hero.ctaText}
          ctaLink={data.hero.ctaLink}
        />
      );
    case "about":
      if (!data.about) return null;
      return (
        <About
          key="about"
          statement={data.about.statement}
          bio={data.about.bio}
        />
      );
    case "projects":
      return <Projects key="projects" projects={data.projects} />;
    case "experience":
      return (
        <ExperienceSection key="experience" experiences={data.experiences} />
      );
    case "skills":
      return <Skills key="skills" skills={data.skills} />;
    case "education":
      return <Education key="education" education={data.education} />;
    case "contact":
      if (!data.contactConfig) return null;
      return <Contact key="contact" config={data.contactConfig} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      <Navbar />
      <main id="top">
        {data.sections.map((section) => renderSection(section.type, data))}
      </main>
      <Footer />
    </>
  );
}
