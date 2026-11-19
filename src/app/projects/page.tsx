import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getChapters } from "@/lib/content";
import { pad2 } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import SiteShell from "@/components/layout/SiteShell";
import { CaseTitle } from "@/components/work/CaseParts";

export const metadata: Metadata = pageMetadata({
  title: "All projects",
  description: `Every project and case study by ${site.name}, ${site.role.toLowerCase()}.`,
  path: "/projects",
});

export const revalidate = 3600;

export default async function ProjectsPage() {
  const [projects, chapters] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    getChapters(),
  ]);

  return (
    <SiteShell chapters={chapters}>
      <section aria-labelledby="archive-title" className="wrap pb-24 pt-12 md:pb-32 md:pt-16">
        <p className="sc">
          <Link href="/#projects" className="link text-muted hover:text-bone">
            ← Selected work
          </Link>
        </p>

        <header className="folio mt-14 gap-y-5 md:mt-20">
          <p className="folio-label sc text-muted lg:pt-[1.3em]">Archive</p>
          <h1
            id="archive-title"
            className="folio-wide text-[clamp(44px,6vw,92px)] font-light leading-none tracking-[-0.028em]"
          >
            All projects
          </h1>
          <p className="folio-text text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
            An archive of everything I&apos;ve built — ranging from AI systems to other
            projects.
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="folio mt-16 text-muted">
            <span className="folio-text">No projects published yet.</span>
          </p>
        ) : (
          <ol className="mt-16 border-t border-rule md:mt-20">
            {projects.map((project, i) => (
              <li key={project.id} className="rise border-b border-rule">
                <article
                  aria-labelledby={`archive-${project.slug}`}
                  className="folio gap-y-3 py-10 md:py-12"
                >
                  <p className="folio-label sc text-muted lg:pt-[0.9em]">
                    No. {pad2(i + 1)}
                    {project.isFeatured && (
                      <>
                        <span className="lg:hidden"> · </span>
                        <span className="lg:block">Featured</span>
                      </>
                    )}
                  </p>
                  <CaseTitle
                    slug={project.slug}
                    as="h2"
                    id={`archive-${project.slug}`}
                    className="folio-text text-[30px] font-normal leading-[1.08] tracking-[-0.02em] text-balance md:text-[40px]"
                  >
                    <Link
                      href={`/project/${project.slug}`}
                      className="transition-colors duration-200 hover:text-bone-dim"
                    >
                      {project.title}
                    </Link>
                  </CaseTitle>
                  {project.techStack.length > 0 && (
                    <p className="folio-note note hidden md:block lg:pt-[0.9em]">
                      {project.techStack.join(", ")}
                    </p>
                  )}
                  <p className="folio-text text-pretty text-bone-dim">
                    {project.shortDescription}
                  </p>
                  {(project.demoUrl || project.githubUrl) && (
                    <p className="folio-text sc flex gap-6">
                      {project.demoUrl && (
                        <a href={project.demoUrl} className="link" rel="noopener noreferrer">
                          Live demo ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="link" rel="noopener noreferrer">
                          Source code ↗
                        </a>
                      )}
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ol>
        )}
      </section>
    </SiteShell>
  );
}
