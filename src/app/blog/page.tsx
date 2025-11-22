import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'

export default function BlogPage() {
  const posts = getAllMarkdownPosts('blog')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-0">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                  {post.frontmatter.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                {post.frontmatter.date && (
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.frontmatter.author && (
                  <span>by {post.frontmatter.author}</span>
                )}
              </div>

              {post.frontmatter.description && (
                <p className="text-gray-700 mb-3">
                  {post.frontmatter.description}
                </p>
              )}

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

