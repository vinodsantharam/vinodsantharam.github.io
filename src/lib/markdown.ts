import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    description?: string
    author?: string
    tags?: string[]
    [key: string]: any
  }
  content: string
}

export function getMarkdownFiles(directory: string): string[] {
  const fullPath = path.join(contentDirectory, directory)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const files = fs.readdirSync(fullPath)
  return files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
}

export function getMarkdownContent(filePath: string): MarkdownPost | null {
  const fullPath = path.join(contentDirectory, filePath)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const slug = path.basename(filePath, path.extname(filePath))

  return {
    slug,
    frontmatter: data as MarkdownPost['frontmatter'],
    content,
  }
}

export function getAllMarkdownPosts(directory: string): MarkdownPost[] {
  const files = getMarkdownFiles(directory)
  
  const posts = files
    .map(filename => {
      const filePath = path.join(directory, filename)
      return getMarkdownContent(filePath)
    })
    .filter((post): post is MarkdownPost => post !== null)
    .sort((a, b) => {
      // Sort by date, newest first
      if (a.frontmatter.date && b.frontmatter.date) {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      }
      return 0
    })

  return posts
}

export function getPostBySlug(directory: string, slug: string): MarkdownPost | null {
  const filePath = path.join(directory, `${slug}.md`)
  return getMarkdownContent(filePath)
}

