import Image from "next/image";
import type { Chapter } from "@/lib/content";
import { site } from "@/lib/site";

interface AboutProps {
  chapter: Chapter;
  statement: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export default function About({ chapter, statement, bio, avatarUrl }: AboutProps) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-24 md:pb-36"
    >
      <div className="folio gap-y-8 border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="folio-label sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
        <p className="rise folio-wide text-[clamp(32px,3.6vw,52px)] font-light italic leading-[1.08] tracking-[-0.02em] text-balance">
          {statement}
        </p>
        {bio && (
          <p className="rise dropcap folio-text text-[19px] leading-[1.62] text-pretty md:text-[21px]">
            {bio}
          </p>
        )}
        {avatarUrl && (
          <figure className="folio-note rise">
            <div className="plate aspect-[4/5] w-full max-w-[260px]">
              <Image
                src={avatarUrl}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
