import { PostData } from '@/lib/types/post'
import { PostCard } from './postCard'
import { AnimatedBackground } from '@/components/motions/animatedBackground'
import { cn } from '@/lib/cn'
import { caveat } from '@/app/fonts'
import PostBody from './post/postBody'

async function getPostContent(slug: string) {
  try {
    const { default: MDXContent } = await import(`@/content/posts/${slug}.mdx`)
    return (
      <PostBody>
        <MDXContent />
      </PostBody>
    )
  } catch {
    return null
  }
}

export const PostsGrid = async ({ posts }: { posts: PostData[] }) => {
  const postsWithContent = await Promise.all(
    posts.map(async post => ({
      post,
      content: await getPostContent(post.slug)
    }))
  )

  const groupedPosts = postsWithContent.reduce(
    (acc: Record<string, typeof postsWithContent>, { post, content }) => {
      const [day, month, year] = post.date.split('/')
      const dateObj = new Date(`${year}-${month}-${day}`)

      const time = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })

      if (!acc[time]) {
        acc[time] = []
      }

      acc[time].push({ post, content })
      return acc
    },
    {}
  )

  return (
    <div className="flex flex-col space-y-5">
      {Object.entries(groupedPosts).map(([time]) => (
        <div
          key={time}
          className="relative flex flex-col space-x-2 md:flex-row"
        >
          <h2
            className={cn(
              `${caveat.className} min-w-20 font-bold text-zinc-400 dark:text-zinc-200`,
              'uppercase'
            )}
          >
            {time}
          </h2>
          <div className="flex grow flex-col space-y-4">
            <AnimatedBackground
              className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6
              }}
              enableHover
            >
              {groupedPosts[time].map(({ post, content }) => (
                <div data-id={`card-${post.slug}`} key={post.slug}>
                  <PostCard post={post} content={content} />
                </div>
              ))}
            </AnimatedBackground>
          </div>
        </div>
      ))}
    </div>
  )
}
