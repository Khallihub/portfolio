import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { getChapters } from "@/lib/content";
import { toYouTubeEmbed } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import SiteShell from "@/components/layout/SiteShell";
import { CaseRows, CaseTitle, Figure, FigureImage } from "@/components/work/CaseParts";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/project/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/project/${project.slug}`,
    image: project.coverImage,
    imageAlt: `Cover image for ${project.title}`,
    type: "article",
  });
}

export default async function ProjectPage(props: PageProps<"/project/[slug]">) {
  const { slug } = await props.params;
  const [project, all, chapters] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    prisma.project.findMany({
      orderBy: { order: "asc" },
      select: { slug: true, title: true },
    }),
    getChapters(),
  ]);
  if (!project) notFound();

  const storyHtml = project.fullStory ? await markdownToHtml(project.fullStory) : null;
  // Align the margin label with the story's first rule when it opens on a heading.
  const storyOpensWithHeading = /^\s*<h2/.test(storyHtml ?? "");
  const embed = project.videoUrl ? toYouTubeEmbed(project.videoUrl) : null;
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;
  let figure = 0;

  return (
    <SiteShell chapters={chapters}>
      <article aria-labelledby="case-title" className="wrap pb-24 pt-12 md:pb-32 md:pt-16">
        <p className="sc">
          <Link href="/#projects" className="link text-muted hover:text-bone">
            ← Selected work
          </Link>
        </p>

        <header className="folio mt-14 gap-y-5 md:mt-20">
          <p className="folio-label sc text-muted lg:pt-[1.3em]">Case study</p>
          <CaseTitle
            slug={project.slug}
            as="h1"
            id="case-title"
            className="folio-wide text-[clamp(40px,5.4vw,80px)] font-normal leading-[1.02] tracking-[-0.026em] text-balance"
          >
            {project.title}
          </CaseTitle>
          <p className="folio-text text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
            {project.shortDescription}
          </p>
        </header>

        {project.coverImage && (
          <div className="mt-12 md:mt-16">
            <Figure number={++figure} caption={`${project.title}, cover.`}>
              <FigureImage src={project.coverImage} alt={`${project.title} — cover image`} priority />
            </Figure>
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <CaseRows project={project} />
        </div>

        {embed && (
          <div className="mt-14 md:mt-20">
            <Figure number={++figure} caption="Demo video." aspect="aspect-video">
              <iframe
                src={embed}
                title={`${project.title} — demo video`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </Figure>
          </div>
        )}

        {storyHtml && (
          <div className="folio mt-14 md:mt-20">
            <p
              className={`folio-label sc text-muted ${
                storyOpensWithHeading ? "lg:pt-[15px]" : "lg:pt-[0.6em]"
              }`}
            >
              The full story
            </p>
            <div
              className="prose-mono folio-text"
              dangerouslySetInnerHTML={{ __html: storyHtml }}
            />
          </div>
        )}

        {project.gallery.length > 0 && (
          <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
            {project.gallery.map((src, i) => (
              <Figure
                key={src}
                number={++figure}
                caption={`${project.title}, image ${i + 1} of ${project.gallery.length}.`}
              >
                <FigureImage src={src} alt={`${project.title} — gallery image ${i + 1}`} />
              </Figure>
            ))}
          </div>
        )}
      </article>

      <nav aria-label="More work" className="wrap pb-24 md:pb-32">
        <div className="folio gap-y-4 border-t border-rule pt-7">
          <p className="folio-label sc text-muted lg:pt-[1em]">
            {next ? "Next case" : "More work"}
          </p>
          <div className="folio-wide flex flex-col gap-6">
            {next && (
              <Link
                href={`/project/${next.slug}`}
                className="text-[clamp(32px,3.8vw,56px)] font-light leading-[1.05] tracking-[-0.022em] text-balance transition-colors duration-200 hover:text-bone-dim"
              >
                {next.title} →
              </Link>
            )}
            <Link href="/projects" className="sc link self-start">
              All projects
            </Link>
          </div>
        </div>
      </nav>
    </SiteShell>
  );
}
