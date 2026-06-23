// Central site configuration used by metadata, sitemap, robots, and JSON-LD.
// `url` is the canonical origin. This is a `username.github.io` root site,
// so there is no basePath — keep it in sync with next.config.js if that changes.
export const siteConfig = {
  name: "Vinod Santharam",
  url: "https://vinodsantharam.github.io",
  title: "Vinod Santharam — Team Lead, Frontend Engineer & UX Product Design",
  description:
    "Personal website of Vinod Santharam — Team Lead, Frontend Engineer and UX Product Design specialist. Writing on software development, AI-assisted coding, UX, and the books that shape my thinking.",
  author: "Vinod Santharam",
  locale: "en_US",
} as const;
