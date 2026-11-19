import type { Chapter } from "@/lib/content";

interface Education {
  id: string;
  institution: string;
  degree: string;
  description?: string | null;
  startYear: number;
  endYear?: number | null;
}

interface EducationProps {
  chapter: Chapter;
  education: Education[];
}

export default function Education({ chapter, education }: EducationProps) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-24 md:pb-36"
    >
      <div className="folio gap-y-10 border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="folio-label sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
        <ol className="folio-text flex flex-col gap-10">
          {education.map((edu) => (
            <li key={edu.id} className="rise">
              <h3 className="text-[28px] font-normal leading-[1.12] tracking-[-0.015em] md:text-[34px]">
                {edu.degree}
              </h3>
              <p className="sc mt-2.5 text-muted">
                {edu.institution} · {edu.startYear} — {edu.endYear ?? "present"}
              </p>
              {edu.description && (
                <p className="mt-4 text-pretty">{edu.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
