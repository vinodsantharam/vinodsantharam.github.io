import { getPostBySlug, getAllMarkdownPosts } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const posts = getAllMarkdownPosts("blog");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    return {};
  }

  const { title, description, date, tags } = post.frontmatter;
  const canonical = `/blog/${slug}/`;

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: post.frontmatter.author ?? siteConfig.author }],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: date,
      modifiedTime: date,
      authors: [post.frontmatter.author ?? siteConfig.author],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/blog/${slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    keywords: post.frontmatter.tags?.join(", "),
    author: {
      "@type": "Person",
      name: post.frontmatter.author ?? siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-8 pb-20">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center font-mono text-xs text-muted-foreground hover:text-foreground mb-8"
      >
        ← Writing
      </Link>

      <article>
        <header className="mb-10 grid gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
            {post.frontmatter.date && (
              <time
                dateTime={new Date(post.frontmatter.date)
                  .toISOString()
                  .slice(0, 10)}
              >
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
            {post.frontmatter.author && (
              <span>by {post.frontmatter.author}</span>
            )}
            <span>{post.readingTime}</span>
          </div>

          <h1 className="font-mono font-semibold tracking-tight text-[clamp(1.5rem,3vw,2rem)] leading-tight text-balance">
            {post.frontmatter.title}
          </h1>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer content={post.content} />
      </article>
    </div>
  );
}
