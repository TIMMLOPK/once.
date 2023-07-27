import { PostsGrid } from "../blog/postsGrid";
import Link from "next/link";

const Blog = async () => {
  const posts = await getPosts();
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">📝 Blog</h1>
        <br />
        <p className="text-base text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div className="mt-10">
        <PostsGrid posts={posts} />
      </div>
    </>
  );
};

const HomeBlog = async () => {
  const posts = await getPosts();
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mx-auto space-y-6 sm:space-y-12">
          {posts.map((post: any, index: number) => (
            <Link href={`/blog/${post.id}`} key={index}>
              <div className="cursor-pointer space-y-6 rounded-md p-6 hover:bg-gray-100 dark:hover:bg-gray-800 md:p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    ✨
                    <p className="ml-1 text-sm font-bold text-gray-500 dark:text-gray-300">
                      {post.date}
                    </p>
                  </div>
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
