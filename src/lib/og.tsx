import { site } from "@/lib/site";

/** Brand colours, mirrored from the @theme tokens in globals.css. */
export const ink = {
  ground: "#121110",
  bone: "#ece8e1",
  boneDim: "#cfcac1",
  muted: "#a29e96",
  rule: "rgba(236,232,225,0.38)",
};

type Weight = 300 | 400 | 500;
type Style = "normal" | "italic";

/**
 * Fetch one static TrueType instance from Google Fonts. ImageResponse can't
 * read the woff2 files next/font serves, and with no browser user agent Google
 * returns TTF. Returns null on failure so the image falls back to the default
 * font rather than failing the build.
 */
async function googleFont(family: string, axes: string) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:${axes}`).then(
      (res) => res.text(),
    );
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function font(name: string, family: string, axes: string, weight: Weight, style: Style) {
  const data = await googleFont(family, axes);
  return data ? { name, data, weight, style } : null;
}

function present<T>(value: T | null): value is T {
  return value !== null;
}

/** Newsreader at display size (italic light and regular) plus Instrument Sans. */
export async function brandFonts() {
  const fonts = await Promise.all([
    font("Newsreader", "Newsreader", "ital,opsz,wght@1,72,300", 300, "italic"),
    font("Newsreader", "Newsreader", "opsz,wght@72,400", 400, "normal"),
    font("Instrument Sans", "Instrument+Sans", "wght@400", 400, "normal"),
    font("Instrument Sans", "Instrument+Sans", "wght@500", 500, "normal"),
  ]);
  return fonts.filter(present);
}

/** Italic initial on the ground colour, for favicons and touch icons. */
export async function monogram({ size, radius }: { size: number; radius: number }) {
  const fonts = (
    await Promise.all([
      font("Newsreader", "Newsreader", "ital,opsz,wght@1,72,400", 400, "italic"),
    ])
  ).filter(present);

  const element = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ink.ground,
        borderRadius: radius,
        color: ink.bone,
        fontFamily: "Newsreader",
        fontStyle: "italic",
        fontSize: size * 0.9,
        lineHeight: 1,
        // Optical centring: the line box reserves descender space below the
        // capital, and the italic leans right.
        paddingTop: size * 0.2,
        paddingRight: size * 0.04,
      }}
    >
      {site.name.charAt(0)}
    </div>
  );

  return { element, fonts };
}
