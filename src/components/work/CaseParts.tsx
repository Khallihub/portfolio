import { ViewTransition } from "react";
import Image from "next/image";
import { textBlocks } from "@/lib/format";

/** Plain admin text rendered as paragraphs and dash lists. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 text-pretty ${className}`}>
      {textBlocks(text).map((block, i) =>
        block.type === "p" ? (
          <p key={i}>{block.text}</p>
        ) : (
          <ul key={i} className="flex flex-col gap-2 text-[0.9em] leading-[1.5] text-bone-dim">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span aria-hidden="true" className="text-muted">
                  –
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

/** Shared name so a case title morphs between list and detail pages. */
export function caseTransitionName(slug: string) {
  return `case-title-${slug}`;
}

export function CaseTitle({
  slug,
  as: Tag = "h3",
  id,
  className,
  children,
}: {
  slug: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ViewTransition name={caseTransitionName(slug)}>
      <Tag id={id} className={className}>
        {children}
      </Tag>
    </ViewTransition>
  );
}

interface CaseProject {
  challenges?: string | null;
  outcomes?: string | null;
  techStack: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
}

function StackNote({ stack }: { stack: string[] }) {
  return (
    <p className="note">
      <span className="sc block text-bone">Stack</span>
      {stack.join(", ")}.
    </p>
  );
}

function LinksNote({ githubUrl, demoUrl }: { githubUrl?: string | null; demoUrl?: string | null }) {
  return (
    <div className="note">
      <span className="sc block text-bone">Links</span>
      <ul>
        {demoUrl && (
          <li>
            <a href={demoUrl} className="link text-bone" rel="noopener noreferrer">
              Live demo ↗
            </a>
          </li>
        )}
        {githubUrl && (
          <li>
            <a href={githubUrl} className="link text-bone" rel="noopener noreferrer">
              Source code ↗
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

/**
 * "The problem" / "The outcome" rows. Margin notes (stack, links) sit beside
 * the rows; on phones they follow the paragraph they belong to.
 */
export function CaseRows({ project }: { project: CaseProject }) {
  const rows = [
    project.challenges ? { label: "The problem", text: project.challenges } : null,
    project.outcomes ? { label: "The outcome", text: project.outcomes } : null,
  ].filter((row): row is { label: string; text: string } => row !== null);

  const notes: React.ReactNode[] = [];
  if (project.techStack.length > 0) {
    notes.push(<StackNote key="stack" stack={project.techStack} />);
  }
  if (project.githubUrl || project.demoUrl) {
    notes.push(
      <LinksNote key="links" githubUrl={project.githubUrl} demoUrl={project.demoUrl} />,
    );
  }

  if (rows.length === 0) {
    return notes.length > 0 ? (
      <div className="folio gap-y-6">
        <div className="folio-text flex flex-col gap-5">{notes}</div>
      </div>
    ) : null;
  }

  return (
    <div className="folio gap-y-3 lg:gap-y-10">
      {rows.map((row, i) => {
        // First row takes the first note; the last row takes the rest.
        const rowNotes =
          rows.length === 1
            ? notes
            : i === 0
              ? notes.slice(0, 1)
              : notes.slice(1);
        return (
          <div key={row.label} className="pair">
            <h4
              className={`folio-label sc text-muted lg:mt-0 lg:pt-[0.55em] ${i > 0 ? "mt-9" : ""}`}
            >
              {row.label}
            </h4>
            <RichText text={row.text} className="folio-text" />
            {rowNotes.length > 0 && (
              <div className="folio-note mt-4 flex flex-col gap-5 md:mt-0 lg:pt-[0.3em]">
                {rowNotes}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** A numbered figure: plate on the text + notes measure, caption in the margin. */
export function Figure({
  number,
  caption,
  children,
  aspect = "aspect-[16/9]",
}: {
  number: number;
  caption: string;
  children: React.ReactNode;
  aspect?: string;
}) {
  return (
    <figure className="folio gap-y-3">
      <div className={`plate folio-wide ${aspect} lg:row-start-1`}>{children}</div>
      <figcaption className="folio-label note lg:row-start-1 lg:self-end">
        <span className="sc block text-bone">Fig. {number}</span>
        {caption}
      </figcaption>
    </figure>
  );
}

export function FigureImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1100px) 948px, (min-width: 760px) calc(100vw - 96px), calc(100vw - 44px)"
      className="object-cover"
    />
  );
}
