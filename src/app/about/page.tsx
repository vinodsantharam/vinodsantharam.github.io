import { getMarkdownContent } from '@/lib/markdown'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { notFound } from 'next/navigation'

export default function AboutPage() {
  const post = getMarkdownContent('about.md')

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description && (
            <p className="text-xl text-muted-foreground">
              {post.frontmatter.description}
            </p>
          )}
        </header>
        <MarkdownRenderer content={post.content} />
      </article>
    </div>
  )
}

