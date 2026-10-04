"use client";

import * as React from "react";
import Link from "next/link";

export interface BlogListItem {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
  readingTime: string;
}

interface BlogListProps {
  posts: BlogListItem[];
  topics: string[];
}

function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Posts grouped by year with a topic filter. The full list is rendered at
// build time; the filter only hides rows on the client.
export function BlogList({ posts, topics }: BlogListProps) {
  const [topic, setTopic] = React.useState<string | null>(null);
  const visible = topic ? posts.filter((p) => p.tags.includes(topic)) : posts;

  const years: { year: string; posts: BlogListItem[] }[] = [];
  for (const post of visible) {
    const year = post.date.slice(0, 4);
    const group = years.find((g) => g.year === year);
    if (group) group.posts.push(post);
    else years.push({ year, posts: [post] });
  }

  return (
    <div className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-8 md:gap-12">
      <div className="grid gap-4 content-start">
        <h1 className="font-mono font-semibold tracking-tight text-2xl">
          Writing
        </h1>
        <p className="text-sm text-muted-foreground">
          Notes on UX, frontend, AI-assisted coding and leading teams.
        </p>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filter by topic"
        >
          {[null, ...topics].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className="rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:border-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {t ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 min-w-0">
        {years.length === 0 && (
          <p className="text-muted-foreground">No posts on this topic yet.</p>
        )}
        {years.map((group) => (
          <section key={group.year} aria-label={group.year}>
            <h2 className="font-mono text-xs text-muted-foreground pb-2 border-b border-border">
              {group.year}
            </h2>
            <ul>
              {group.posts.map((post) => (
                <li key={post.slug} className="border-b border-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid sm:grid-cols-[64px_minmax(0,1fr)_auto] gap-1 sm:gap-4 py-4 items-baseline"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {shortDate(post.date)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug group-hover:text-primary">
                        {post.title}
                      </span>
                      {post.description && (
                        <span className="block mt-1 text-sm text-muted-foreground line-clamp-2">
                          {post.description}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {post.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
