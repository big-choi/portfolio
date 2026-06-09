import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1
    },
    ...projectRoutes
  ];
}
