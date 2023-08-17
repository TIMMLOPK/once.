import { PostsGrid } from "../blog/postsGrid";
import Link from "next/link";

const Blog = async () => {
  const posts = await getPosts();
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">📝 Blog</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
};

const HomeBlog = async () => {
  const posts = await getPosts();
  return (
    <div className="md:max-w-lg">
      <div className="mx-auto">
        {posts.map((post: any, index: number) => (
          <Link href={`/blog/${post.id}`} key={index}>
            <div className="group my-4 space-y-6 md:p-6">
              <div className="flex items-center">
                {index === 0 ? (
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                ) : (
                  <span className="h-4 w-1 bg-gray-300 dark:bg-gray-600" />
                )}
                <p className="ml-1 text-sm font-bold text-gray-500 dark:text-gray-300">
                  {post.date}
                </p>
              </div>
              <div className="space-y-4 rounded-lg p-4 group-hover:bg-gray-100 dark:group-hover:bg-hover md:p-8">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

async function getPosts() {
  const req = await fetch(process.env.API_URL + "/posts", {
    next: { revalidate: 60 },
  });
  const posts = await req.json();

  return posts;
}

export { Blog, HomeBlog };
