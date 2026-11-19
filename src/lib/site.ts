/**
 * Site identity. The database stores section content but not the owner's
 * name or role, so they live here. Edit these values to rebrand the site.
 */
export const site = {
  name: "Khalid Abdu",
  role: "Full-stack engineer",
  /** Short line used when the hero subheadline is empty and for metadata. */
  description:
    "Full-stack engineer focused on AI-powered products, clean architecture, and delightful interfaces.",
  /** Shown in the masthead. Set to null to hide. */
  availability: "Available for new opportunities" as string | null,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
