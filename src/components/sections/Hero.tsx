import type { CSSProperties } from "react";
import Link from "next/link";
import { parseEmphasis } from "@/lib/format";
import type { Chapter } from "@/lib/content";
import { site } from "@/lib/site";

interface HeroProps {
  headline: string;
  subheadline?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  chapters: Chapter[];
}

/** Splits the headline into words so each can settle in on load. */
function Headline({ text }: { text: string }) {
  let index = 0;
  return (
    <>
      {parseEmphasis(text).map((run, r) =>
        run.text.split(/(\s+)/).map((token, t) => {
          if (!token) return null;
          if (/^\s+$/.test(token)) return token;
          const style = { "--i": index++ } as CSSProperties;
          return (
            <span key={`${r}-${t}`} className="settle" style={style}>
              {run.em ? <em className="font-light">{token}</em> : token}
            </span>
          );
        }),
      )}
    </>
  );
}

export default function Hero({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  chapters,
}: HeroProps) {
  const deck = subheadline ?? site.description;

  return (
    <section aria-labelledby="hero-title" className="wrap pt-16 md:pt-28 lg:pt-32">
      <p className="sc mb-7 text-muted md:mb-9">
        {site.name} — {site.role}
      </p>
      <h1
        id="hero-title"
        className="max-w-[1140px] text-[clamp(44px,7.5vw,114px)] font-light leading-[0.98] tracking-[-0.028em] text-balance"
      >
        <Headline text={headline} />
      </h1>

      <div className="folio mt-10 gap-y-6 md:mt-14">
        <p className="folio-text text-[21px] leading-[1.45] text-pretty text-muted md:text-[24px]">
          {deck}
        </p>
        {(ctaText || site.resume) && (
          <p className="folio-text flex flex-wrap items-baseline gap-x-9 gap-y-3">
            {ctaText && (
              <Link href={ctaLink || "/#projects"} className="link italic">
                {ctaText} →
              </Link>
            )}
            {site.resume && (
              <a href={site.resume} type="application/pdf" className="link italic text-muted">
                Résumé <span className="sc not-italic">PDF</span>
              </a>
            )}
          </p>
        )}
      </div>

      {chapters.length > 0 && (
        <nav
          aria-labelledby="contents-title"
          className="folio mt-20 gap-y-3 pb-24 md:mt-28 md:pb-36"
        >
          <h2
            id="contents-title"
            className="folio-label sc text-muted lg:pt-[18px]"
          >
            Contents
          </h2>
          <ol className="folio-wide border-t border-rule">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="border-b border-rule">
                <Link
                  href={`#${chapter.id}`}
                  className="toc-link flex items-baseline gap-4 py-3 md:gap-5 md:py-3.5"
                >
                  <span className="sc w-8 shrink-0 text-muted">
                    {chapter.numeral}
                  </span>
                  <span className="text-[23px] leading-tight tracking-[-0.01em] md:text-[30px]">
                    {chapter.label}
                  </span>
                  {chapter.descriptor && (
                    <>
                      <span aria-hidden="true" className="leader hidden sm:block" />
                      <span className="sc hidden text-right text-muted sm:block">
                        {chapter.descriptor}
                      </span>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </section>
  );
}
