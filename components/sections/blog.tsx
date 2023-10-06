import { PostsGrid } from "../blog/postsGrid";

const Blog = async () => {
  const posts = await getPosts();
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">📝 Blog</h1>
        <p className="text-base text-gray-600 dark:text-gray-200">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
};

async function getPosts() {
  const req = await fetch(process.env.API_URL + "/posts", {
    next: { revalidate: 60 },
  });
  const posts = await req.json();

  return posts.sort((a: any, b: any) => {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
}

export { Blog };
