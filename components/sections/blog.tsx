import { PostsGrid } from "../blog/postsGrid";

const Blog = async () => {
  const posts = await getPosts();
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">📝 Blog</h1>
        <br />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div className="mt-10">
        <PostsGrid posts={posts} />
      </div>
    </>
  );
};

async function getPosts() {
  const req = await fetch(process.env.API_URL + "/posts", {
    next: { revalidate: 60 },
  });
  const posts = await req.json();

  return posts;
}

export default Blog;
