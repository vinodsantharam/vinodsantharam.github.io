import type { MetadataRoute } from "next";
import { getAllMarkdownPosts } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

// Statically generated at build time (output: 'export') -> /sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/books/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
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

  return [...staticRoutes, ...blogRoutes];
}
