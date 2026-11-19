import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { getChapters } from "@/lib/content";
import { duration, monthRange } from "@/lib/format";
import SiteShell from "@/components/layout/SiteShell";

export const revalidate = 3600;

export async function generateStaticParams() {
  const experiences = await prisma.experience.findMany({ select: { slug: true } });
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/experience/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const exp = await prisma.experience.findUnique({ where: { slug } });
  if (!exp) return {};
  return {
    title: `${exp.role} at ${exp.company}`,
    description: exp.description,
    alternates: { canonical: `/experience/${exp.slug}` },
  };
}

export default async function ExperiencePage(props: PageProps<"/experience/[slug]">) {
  const { slug } = await props.params;
  const [exp, chapters] = await Promise.all([
    prisma.experience.findUnique({ where: { slug } }),
    getChapters(),
  ]);
  if (!exp) notFound();

  const storyHtml = exp.fullStory ? await markdownToHtml(exp.fullStory) : null;
  // Align the margin label with the story's first rule when it opens on a heading.
  const storyOpensWithHeading = /^\s*<h2/.test(storyHtml ?? "");

  return (
    <SiteShell chapters={chapters}>
      <article aria-labelledby="exp-title" className="wrap pb-24 pt-12 md:pb-32 md:pt-16">
        <p className="sc">
          <Link href="/#experience" className="link text-muted hover:text-bone">
            ← Experience
          </Link>
        </p>

        <header className="folio mt-14 gap-y-5 md:mt-20">
          <p className="folio-label text-[19px] italic text-muted [font-variant-numeric:oldstyle-nums] md:text-[20px] lg:pt-[1.1em]">
            {monthRange(exp.startDate, exp.endDate)}
          </p>
          <h1
            id="exp-title"
            className="folio-wide text-[clamp(40px,5.4vw,80px)] font-normal leading-[1.02] tracking-[-0.026em] text-balance"
          >
            {exp.role}
          </h1>
          <p className="folio-text sc text-muted">
            {exp.company}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="folio-note sc hidden text-muted md:block">
            {duration(exp.startDate, exp.endDate)}
          </p>
          <p className="folio-text mt-2 text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
            {exp.description}
          </p>
        </header>

        {exp.highlights.length > 0 && (
          <section aria-labelledby="highlights-title" className="folio mt-14 gap-y-4 md:mt-20">
            <h2 id="highlights-title" className="folio-label sc text-muted lg:pt-[0.6em]">
              Highlights
            </h2>
            <ul className="folio-text flex flex-col gap-3">
              {exp.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-4 text-pretty">
                  <span aria-hidden="true" className="text-muted">
                    –
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {storyHtml && (
          <div className="folio mt-14 md:mt-20">
            <p
              className={`folio-label sc text-muted ${
                storyOpensWithHeading ? "lg:pt-[15px]" : "lg:pt-[0.6em]"
              }`}
            >
              The full account
            </p>
            <div
              className="prose-mono folio-text"
              dangerouslySetInnerHTML={{ __html: storyHtml }}
            />
          </div>
        )}
      </article>
    </SiteShell>
  );
}
