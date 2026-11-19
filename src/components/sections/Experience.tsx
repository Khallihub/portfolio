import Link from "next/link";
import type { Chapter } from "@/lib/content";
import { duration, yearRange } from "@/lib/format";

interface Experience {
  id: string;
  slug: string;
  role: string;
  company: string;
  location?: string | null;
  description: string;
  fullStory?: string | null;
  highlights: string[];
  startDate: Date;
  endDate?: Date | null;
}

const HIGHLIGHTS_ON_HOME = 3;

interface ExperienceProps {
  chapter: Chapter;
  experiences: Experience[];
}

export default function Experience({ chapter, experiences }: ExperienceProps) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-24 md:pb-36"
    >
      <div className="border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
      </div>

      <ol>
        {experiences.map((exp) => {
          const span = duration(exp.startDate, exp.endDate);
          // The homepage carries the first few highlights; the role page has them all.
          const shown = exp.highlights.slice(0, HIGHLIGHTS_ON_HOME);
          const hidden = exp.highlights.length - shown.length;
          const more = exp.fullStory
            ? "Read the full account"
            : hidden > 0
              ? `See all ${exp.highlights.length} highlights`
              : null;
          return (
            <li key={exp.id} className="rise folio gap-y-3 pt-12 md:pt-16">
              <p className="folio-label text-[19px] italic text-muted [font-variant-numeric:oldstyle-nums] md:text-[20px] lg:pt-[0.5em]">
                {yearRange(exp.startDate, exp.endDate)}
                <span className="md:hidden"> · {span}</span>
              </p>
              <div className="folio-text">
                <h3 className="text-[30px] font-normal leading-[1.1] tracking-[-0.018em] md:text-[38px]">
                  {exp.role}
                </h3>
                <p className="sc mt-2.5 text-muted">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <p className="mt-5 text-pretty">{exp.description}</p>
                {shown.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2 text-[17px] leading-[1.5] text-bone-dim md:text-[18px]">
                    {shown.map((highlight) => (
                      <li key={highlight} className="flex gap-3.5">
                        <span aria-hidden="true" className="text-muted">
                          –
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {more && (
                  <Link
                    href={`/experience/${exp.slug}`}
                    className="link mt-5 inline-block italic"
                  >
                    {more}
                    <span className="sr-only">
                      {" "}
                      of {exp.role} at {exp.company}
                    </span>{" "}
                    →
                  </Link>
                )}
              </div>
              <p className="folio-note sc hidden text-muted md:block lg:pt-[1.3em]">
                {span}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
