import PostBody from '@/components/blog/post/postBody'
import PostHeader from '@/components/blog/post/postHeader'
import Layout from '@/components/layout/main'
import { Metadata } from 'next'
import { PostData } from '@/lib/types/post'

async function getPost(id: string): Promise<{ post: PostData }> {
  const post = await fetch(process.env.API_URL + '/posts/' + id).then(res =>
    res.json()
  )

  return { post }
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { post } = await getPost(params.id)

  return {
    title: `${post.title} | ONCE`,
    openGraph: {
      images: post.ogImageURL,
      description: post.description
    }
  }
}

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { post } = await getPost(params.id)

  return (
    <Layout className="px-0">
      <article className="mx-auto mb-20 max-w-4xl space-y-12 p-8">
        <PostHeader
          id={post.id}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          description={post.description}
          author={post.author}
          authorImage={post.authorImage}
        />
        <PostBody content={post.content} />
      </article>
    </Layout>
  )
}

export const dynamicParams = true
