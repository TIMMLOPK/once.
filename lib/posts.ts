import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostData, PostFrontmatter } from './types/post'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function calculateReadingTime(content: string): number {
  const text = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/[#*`>_~\[\]()]/g, '')
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs
    .readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): PostData | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)

  const frontmatter = data as PostFrontmatter

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    coverImage: frontmatter.coverImage,
    date: frontmatter.date,
    ogImageURL: frontmatter.coverImage,
    author: frontmatter.author || 'TIMMLOPK',
    authorImage: frontmatter.authorImage || '/images/avatar.png',
    published: frontmatter.published ?? true,
    readingTime: calculateReadingTime(fileContents)
  }
}

export function getAllPosts(): PostData[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is PostData => post !== null && post.published)

  return posts.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/')
    const [dayB, monthB, yearB] = b.date.split('/')
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`)
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`)
    return dateB.getTime() - dateA.getTime()
  })
}
