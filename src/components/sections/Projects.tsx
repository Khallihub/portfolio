import Link from "next/link";
import type { Chapter } from "@/lib/content";
import { pad2 } from "@/lib/format";
import { CaseRows, CaseTitle, Figure, FigureImage } from "@/components/work/CaseParts";

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage?: string | null;
  challenges?: string | null;
  outcomes?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  techStack: string[];
}

interface ProjectsProps {
  chapter: Chapter;
  projects: Project[];
}

export default function Projects({ chapter, projects }: ProjectsProps) {
  let figure = 0;

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-10 md:pb-16"
    >
      <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
        <Link href="/projects" className="sc link">
          Full archive →
        </Link>
      </div>

      {projects.map((project, i) => {
        const href = `/project/${project.slug}`;
        return (
          <article
            key={project.id}
            aria-labelledby={`case-${project.slug}`}
            className={`py-16 md:py-24 ${i > 0 ? "border-t border-rule" : ""}`}
          >
            <div className="folio gap-y-5">
              <p className="folio-label sc text-muted lg:pt-[1.2em]">
                Case {pad2(i + 1)}
              </p>
              <CaseTitle
                slug={project.slug}
                id={`case-${project.slug}`}
                className="folio-wide text-[clamp(36px,4.6vw,68px)] font-normal leading-[1.02] tracking-[-0.025em] text-balance"
              >
                <Link href={href} className="transition-colors duration-200 hover:text-bone-dim">
                  {project.title}
                </Link>
              </CaseTitle>
              <p className="folio-text text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
                {project.shortDescription}
              </p>
            </div>

            {project.coverImage && (
              <div className="rise mt-12 md:mt-14">
                <Figure number={++figure} caption={`${project.title}, cover.`}>
                  <FigureImage src={project.coverImage} alt={`${project.title} — cover image`} />
                </Figure>
              </div>
            )}

            <div className="mt-12 md:mt-16">
              <CaseRows project={project} />
            </div>

            <div className="folio mt-10 md:mt-12">
              <p className="folio-text">
                <Link href={href} className="link text-[21px] italic md:text-[22px]">
                  Continue reading the case study
                  <span className="sr-only">: {project.title}</span> →
                </Link>
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
