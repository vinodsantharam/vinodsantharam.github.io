import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapStrip } from "@/components/MapStrip";
import { books } from "@/lib/books";
import { getAllMarkdownPosts } from "@/lib/markdown";
import { getResume, yearsOfExperience } from "@/lib/resume";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Home() {
  const posts = getAllMarkdownPosts("blog").slice(0, 3);
  const shelf = books.slice(0, 10);
  const years = yearsOfExperience(getResume());

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.author,
        url: siteConfig.url,
        jobTitle: "Team Lead, Frontend Engineer & UX Product Design specialist",
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        author: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-20 grid gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="grid md:grid-cols-[1.15fr_1fr] gap-10 items-center">
        <div className="min-w-0">
          <h1 className="font-mono font-semibold tracking-tight text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-balance">
            I design the experience, then I build it.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[60ch] leading-relaxed">
            Team lead and frontend engineer in Bangkok. {years} years of
            shipping products across payments, SaaS and collaboration tools, in
            France, Switzerland, Canada and Thailand. I write about UX,
            AI-assisted coding and how teams actually work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90"
            >
              Read the resume
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:border-foreground/40"
            >
              Latest writing
            </Link>
          </div>
        </div>
        <MapStrip
          current="bangkok"
          previous={["montreal", "basel", "strasbourg"]}
        />
      </section>

      <section className="grid gap-4" aria-labelledby="latest-writing">
        <div className="flex justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <h2 id="latest-writing">Latest writing</h2>
          <Link
            href="/blog"
            className="normal-case tracking-normal text-primary"
          >
            All posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-2 content-start border-t border-border pt-4"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatDate(post.frontmatter.date)} · {post.readingTime}
              </span>
              <h3 className="font-semibold leading-snug group-hover:text-primary">
                {post.frontmatter.title}
              </h3>
              {post.frontmatter.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.frontmatter.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4" aria-labelledby="shelf">
        <div className="flex justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <h2 id="shelf">On the shelf</h2>
          <Link
            href="/books"
            className="normal-case tracking-normal text-primary"
          >
            {books.length} books →
          </Link>
        </div>
        <Link
          href="/books"
          className="flex items-end gap-3 overflow-x-auto pb-1 border-b-[3px] border-foreground"
          aria-label="See all books"
        >
          {shelf.map((book) => (
            <Image
              key={book.title}
              src={book.coverImage}
              alt={book.title}
              width={84}
              height={128}
              className="flex-none h-32 w-auto rounded-t-sm shadow-sm transition-transform hover:-translate-y-1"
            />
          ))}
        </Link>
      </section>
    </div>
  );
}
