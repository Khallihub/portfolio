import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getVisibleSections, toChapters, type Chapter } from "@/lib/content";
import { groupSkills } from "@/lib/format";
import { site } from "@/lib/site";
import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ExperienceSection from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Revalidate every hour; admin changes also call revalidatePath("/").
export const revalidate = 3600;

async function getData() {
  // Two batches keep concurrent pool connections low.
  const [sections, hero, about, contactConfig] = await Promise.all([
    getVisibleSections(),
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
    // Most recent first: ongoing studies, then by completion year.
    prisma.education.findMany({
      orderBy: [{ endYear: { sort: "desc", nulls: "first" } }, { startYear: "desc" }],
    }),
  ]);

  return { sections, hero, about, contactConfig, projects, experiences, skills, education };
}

type Data = Awaited<ReturnType<typeof getData>>;

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

/** Which chapters have content, and the one-line descriptor for each. */
function describe(data: Data) {
  const present = new Set<string>();
  const descriptors: Record<string, string> = {};

  if (data.about) {
    present.add("about");
    descriptors.about = "Introduction";
  }
  if (data.projects.length) {
    present.add("projects");
    descriptors.projects = plural(data.projects.length, "case study", "case studies");
  }
  if (data.experiences.length) {
    present.add("experience");
    const first = Math.min(
      ...data.experiences.map((e) => new Date(e.startDate).getUTCFullYear()),
    );
    const current = data.experiences.some((e) => !e.endDate);
    const last = Math.max(
      ...data.experiences.map((e) =>
        new Date(e.endDate ?? e.startDate).getUTCFullYear(),
      ),
    );
    descriptors.experience = `${plural(data.experiences.length, "role", "roles")} · ${first} — ${current ? "now" : last}`;
  }
  if (data.skills.length) {
    present.add("skills");
    descriptors.skills = `${plural(data.skills.length, "tool", "tools")} · ${plural(
      groupSkills(data.skills).length,
      "discipline",
      "disciplines",
    )}`;
  }
  if (data.education.length) {
    present.add("education");
    const first = Math.min(...data.education.map((e) => e.startYear));
    const ongoing = data.education.some((e) => e.endYear == null);
    const last = Math.max(...data.education.map((e) => e.endYear ?? e.startYear));
    descriptors.education = `${first} — ${ongoing ? "present" : last}`;
  }
  if (data.contactConfig) {
    present.add("contact");
    descriptors.contact = "Write to me";
  }

  return { present, descriptors };
}

function render(type: string, data: Data, chapter: Chapter | undefined, chapters: Chapter[]) {
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
          chapters={chapters}
        />
      );
    case "about":
      if (!data.about || !chapter) return null;
      return (
        <About
          key="about"
          chapter={chapter}
          statement={data.about.statement}
          bio={data.about.bio}
          avatarUrl={data.about.avatarUrl}
        />
      );
    case "projects":
      if (!chapter) return null;
      return <Projects key="projects" chapter={chapter} projects={data.projects} />;
    case "experience":
      if (!chapter) return null;
      return (
        <ExperienceSection key="experience" chapter={chapter} experiences={data.experiences} />
      );
    case "skills":
      if (!chapter) return null;
      return <Skills key="skills" chapter={chapter} skills={data.skills} />;
    case "education":
      if (!chapter) return null;
      return <Education key="education" chapter={chapter} education={data.education} />;
    case "contact":
      if (!data.contactConfig || !chapter) return null;
      return <Contact key="contact" chapter={chapter} config={data.contactConfig} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const data = await getData();
  const { present, descriptors } = describe(data);
  const chapters = toChapters(data.sections, descriptors, present);
  const byId = new Map(chapters.map((c) => [c.id, c]));

  const sameAs = [
    data.contactConfig?.githubUrl,
    data.contactConfig?.linkedinUrl,
    data.contactConfig?.twitterUrl,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: data.hero?.subheadline ?? site.description,
    url: site.url,
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <SiteShell chapters={chapters}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {data.sections.map((section) =>
        render(section.type, data, byId.get(section.type), chapters),
      )}
    </SiteShell>
  );
}
