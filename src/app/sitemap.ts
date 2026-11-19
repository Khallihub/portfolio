import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

// No lastModified: the schema has no updatedAt, and a date that changes on
// every request (or a creation date) teaches Google to ignore the field.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({ select: { slug: true }, orderBy: { order: "asc" } }),
    prisma.experience.findMany({ select: { slug: true }, orderBy: { order: "asc" } }),
  ]);

  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/projects`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${baseUrl}/project/${p.slug}`, priority: 0.7 })),
    ...experiences.map((e) => ({ url: `${baseUrl}/experience/${e.slug}`, priority: 0.5 })),
  ];
}
