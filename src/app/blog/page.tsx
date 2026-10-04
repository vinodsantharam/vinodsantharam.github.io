import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";
import { getAllMarkdownPosts } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Vinod Santharam on software development, AI-assisted coding, UX, agility, and engineering leadership.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function BlogPage() {
  const posts = getAllMarkdownPosts("blog").map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    // gray-matter parses YAML dates into Date objects; normalise to YYYY-MM-DD.
    date: new Date(post.frontmatter.date).toISOString().slice(0, 10),
    description: post.frontmatter.description,
    tags: post.frontmatter.tags ?? [],
    readingTime: post.readingTime,
  }));

  // The most used tags become the topic filter.
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  const topics = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([tag]) => tag);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-20">
      <BlogList posts={posts} topics={topics} />
    </div>
  );
}
