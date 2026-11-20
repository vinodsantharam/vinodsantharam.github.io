import type { MetadataRoute } from "next";
import { getAllMarkdownPosts } from "@/lib/markdown";
import { getPortfolioEntries } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

// Statically generated at build time (output: 'export') -> /sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/books/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/resume/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllMarkdownPosts("blog").map(
    (post) => ({
      url: `${siteConfig.url}/blog/${post.slug}/`,
      lastModified: post.frontmatter.date
        ? new Date(post.frontmatter.date)
        : now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const portfolioRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/portfolio/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...getPortfolioEntries().map((entry) => ({
      url: `${siteConfig.url}/portfolio/${entry.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
