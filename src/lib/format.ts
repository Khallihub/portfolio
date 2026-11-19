/** Presentation helpers shared by the public site. Pure functions only. */

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(n: number): string {
  let out = "";
  let rest = Math.max(1, Math.floor(n));
  for (const [value, glyph] of ROMAN) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Splits CMS copy that marks emphasis with asterisks ("I build *systems*")
 * into plain and emphasised runs.
 */
export function parseEmphasis(text: string): { text: string; em: boolean }[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    );
}

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function yearRange(start: Date, end?: Date | null): string {
  const s = new Date(start).getUTCFullYear();
  if (!end) return `${s} — present`;
  const e = new Date(end).getUTCFullYear();
  return s === e ? String(s) : `${s} — ${e}`;
}

export function monthRange(start: Date, end?: Date | null): string {
  return `${monthYear.format(new Date(start))} — ${
    end ? monthYear.format(new Date(end)) : "present"
  }`;
}

/** "3 years, 10 months" between two dates (end defaults to now). */
export function duration(start: Date, end?: Date | null): string {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months = Math.max(
    0,
    (e.getUTCFullYear() - s.getUTCFullYear()) * 12 +
      (e.getUTCMonth() - s.getUTCMonth()) +
      (end ? 1 : 0), // an end date is inclusive of its month
  );
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} ${y === 1 ? "year" : "years"}`);
  if (m || !y) parts.push(`${m} ${m === 1 ? "month" : "months"}`);
  return parts.join(", ");
}

/** Converts common YouTube URLs to a privacy-enhanced embed URL. */
export function toYouTubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (u.hostname.endsWith("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2];
      else id = u.searchParams.get("v");
    }
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
  } catch {
    return null;
  }
}

/**
 * Section labels. The CMS seeds generic titles ("Projects", "Skills"); those
 * map to the site's editorial names. A title changed in the admin wins.
 */
const EDITORIAL: Record<string, { generic: string; label: string }> = {
  about: { generic: "about", label: "Foreword" },
  projects: { generic: "projects", label: "Selected work" },
  experience: { generic: "experience", label: "Experience" },
  skills: { generic: "skills", label: "Practice" },
  education: { generic: "education", label: "Education" },
  contact: { generic: "contact", label: "Correspondence" },
};

export function sectionLabel(type: string, title?: string | null): string {
  const entry = EDITORIAL[type];
  if (!entry) return title ?? type;
  if (!title || title.trim().toLowerCase() === entry.generic) return entry.label;
  return title;
}

export const SKILL_ORDER = ["AI Systems", "Backend", "Frontend", "DevOps"];

export function groupSkills<T extends { category: string }>(skills: T[]) {
  const categories = Array.from(new Set(skills.map((s) => s.category))).sort(
    (a, b) => {
      const ai = SKILL_ORDER.indexOf(a);
      const bi = SKILL_ORDER.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    },
  );
  return categories.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }));
}

export type TextBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

const BULLET = /^[-•*]\s+/;

/**
 * Turns plain multi-line admin text into paragraphs and lists.
 * Blank lines separate blocks; lines that follow a line ending in ":"
 * (or lines that all start with a bullet) become list items.
 */
export function textBlocks(text: string): TextBlock[] {
  const blocks: TextBlock[] = [];
  let expectList = false;

  for (const chunk of text.split(/\n\s*\n/)) {
    const raw = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (raw.length === 0) continue;

    if (expectList || raw.every((l) => BULLET.test(l))) {
      blocks.push({ type: "ul", items: raw.map((l) => l.replace(BULLET, "")) });
      expectList = false;
      continue;
    }

    const intro = raw.findIndex((l, i) => l.endsWith(":") && i < raw.length - 1);
    if (intro !== -1) {
      blocks.push({ type: "p", text: raw.slice(0, intro + 1).join(" ") });
      blocks.push({ type: "ul", items: raw.slice(intro + 1).map((l) => l.replace(BULLET, "")) });
      continue;
    }

    blocks.push({ type: "p", text: raw.join(" ") });
    expectList = raw[raw.length - 1].endsWith(":");
  }
  return blocks;
}

/** URL slug: lowercase ASCII words joined by single hyphens, none at the ends. */
export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
