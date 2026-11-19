import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { sectionLabel, toRoman } from "@/lib/format";

/** Section types that render as numbered chapters (the hero is the cover). */
export const CHAPTER_TYPES = [
  "about",
  "projects",
  "experience",
  "skills",
  "education",
  "contact",
] as const;

export interface Chapter {
  /** Anchor id on the homepage; equals the section type. */
  id: string;
  label: string;
  numeral: string;
  descriptor?: string;
}

/** Visible sections in admin-defined order. Deduplicated per request. */
export const getVisibleSections = cache(() =>
  prisma.section.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  }),
);

/**
 * Numbers the visible chapter sections I, II, III… in order.
 * `present` drops sections whose content is missing so numbering stays
 * continuous with what is actually rendered.
 */
export function toChapters(
  sections: { type: string; title: string }[],
  descriptors: Partial<Record<string, string>> = {},
  present?: Set<string>,
): Chapter[] {
  const seen = new Set<string>();
  return sections
    .filter((s) => {
      if (!(CHAPTER_TYPES as readonly string[]).includes(s.type)) return false;
      if (present && !present.has(s.type)) return false;
      if (seen.has(s.type)) return false;
      seen.add(s.type);
      return true;
    })
    .map((s, i) => ({
      id: s.type,
      label: sectionLabel(s.type, s.title),
      numeral: toRoman(i + 1),
      descriptor: descriptors[s.type],
    }));
}

/** Chapters for pages other than the homepage (masthead navigation only). */
export async function getChapters(): Promise<Chapter[]> {
  return toChapters(await getVisibleSections());
}
