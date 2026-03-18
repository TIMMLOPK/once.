import PostBody from '@/components/blog/post/postBody'
import PostHeader from '@/components/blog/post/postHeader'
import { ReadingProgress } from '@/components/blog/post/readingProgress'
import Layout from '@/components/layout/main'
import { Metadata } from 'next'
import { getPostBySlug, getPostSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const post = getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | ONCE`,
    openGraph: {
      images: post.ogImageURL,
      description: post.description
    }
  }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Post(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const { default: MDXContent } = await import(
    `@/content/posts/${params.slug}.mdx`
  )

  return (
    <>
      <ReadingProgress />
      <Layout className="px-0">
        <article className="mx-auto mb-24 max-w-3xl space-y-10 px-6 pt-8 md:px-8">
          <PostHeader
            title={post.title}
            date={post.date}
            readingTime={post.readingTime}
          />
          <hr className="border-dashed border-zinc-200 dark:border-zinc-800" />
          <PostBody>
            <MDXContent />
          </PostBody>
        </article>
      </Layout>
    </>
  )
}

export const dynamicParams = true
