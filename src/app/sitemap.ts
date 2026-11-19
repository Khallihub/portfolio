import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({ select: { slug: true, createdAt: true } }),
    prisma.experience.findMany({ select: { slug: true } }),
  ]);

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), priority: 0.8 },
    ...projects.map((p) => ({
      url: `${baseUrl}/project/${p.slug}`,
      lastModified: p.createdAt,
      priority: 0.7,
    })),
    ...experiences.map((e) => ({
      url: `${baseUrl}/experience/${e.slug}`,
      lastModified: new Date(),
      priority: 0.5,
    })),
  ];
}
