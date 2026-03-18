import Layout from '@/components/layout/main'
import { PostsGrid } from '@/components/blog/postsGrid'
import { getAllPosts } from '@/lib/posts'
import { SectionTitle } from '@/components/shared/sectionTitle'

export default async function BlogPage() {
  const posts = await getAllPosts()

  if (posts.length === 0) {
    return (
      <Layout className="mx-4 md:mx-auto">
        <section className="relative mt-12 min-h-screen overflow-y-hidden md:m-12">
          <SectionTitle>Blog</SectionTitle>
          <div className="mt-10 space-y-1">
            <p className="font-vt323">There are no posts yet.</p>
            <p className="font-vt323">
              I am <del>lazy</del> busy writing.
            </p>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout className="mx-4 md:mx-auto">
      <section className="relative mt-12 min-h-screen overflow-y-hidden md:m-12">
        <SectionTitle>Blog</SectionTitle>
        <PostsGrid posts={posts} />
      </section>
    </Layout>
  )
}
