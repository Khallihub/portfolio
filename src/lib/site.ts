/**
 * The site's public address, without a trailing slash. Canonical tags, the
 * sitemap, robots.txt and share links are all built from it, so it must be the
 * production domain. NEXT_PUBLIC_APP_URL wins; on Vercel, the project's
 * production domain is the fallback.
 */
function siteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return configured.replace(/\/+$/, "");
}

/**
 * Site identity. The database stores section content but not the owner's
 * name or role, so they live here. Edit these values to rebrand the site.
 */
export const site = {
  name: "Khalid Kemal",
  role: "Full-stack engineer",
  /** Short line used when the hero subheadline is empty and for metadata. */
  description:
    "Full-stack engineer focused on AI-powered products, clean architecture, and delightful interfaces.",
  /** Shown in the masthead. Set to null to hide. */
  availability: "Available for new opportunities" as string | null,
  /** A file in public/. Set to null to hide the résumé links. */
  resume: "/resume.pdf" as string | null,
  url: siteUrl(),
} as const;
