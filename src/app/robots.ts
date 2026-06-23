import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Statically generated at build time (output: 'export') -> /robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
