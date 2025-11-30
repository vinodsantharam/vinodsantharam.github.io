import { getPostBySlug, getAllMarkdownPosts } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        ← Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            {post.frontmatter.date && (
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.frontmatter.author && (
              <span>by {post.frontmatter.author}</span>
            )}
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-300/40 text-primary rounded-full text-sm"
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
