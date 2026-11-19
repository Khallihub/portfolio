import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { brandFonts, ink } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** "Full-stack engineer focused on X" → "Focused on X", since the role is set just above. */
function strapline() {
  const { description, role } = site;
  const rest = description.toLowerCase().startsWith(`${role.toLowerCase()} `)
    ? description.slice(role.length + 1)
    : description;
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

/** The default share card: name, role and one line, set like the site's title page. */
export default async function OpengraphImage() {
  const fonts = await brandFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px 76px",
          background: ink.ground,
          color: ink.bone,
          fontFamily: "Newsreader",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Instrument Sans",
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ink.muted,
          }}
        >
          <div>Portfolio</div>
          {site.availability && <div>{site.availability}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 148,
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 54,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: ink.boneDim,
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            paddingTop: 28,
            borderTop: `1px solid ${ink.rule}`,
            fontFamily: "Instrument Sans",
            fontSize: 27,
            lineHeight: 1.4,
            color: ink.muted,
          }}
        >
          <div style={{ maxWidth: 720 }}>{strapline()}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
