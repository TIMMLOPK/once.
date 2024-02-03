import { cache } from "react";
import { PostsGrid } from "../blog/postsGrid";
import { getPosts } from "../../utils/actions";

async function getSortedPosts() {
  const posts = await getPosts();

  return posts.sort((a: any, b: any) => {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
}

const loadPosts = cache(async () => {
  return await getSortedPosts();
});

export default async function Post() {
  const posts = await loadPosts();

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">📝 Blog</h1>
      </div>
      <div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
