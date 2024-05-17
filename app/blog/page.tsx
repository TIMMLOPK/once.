import Layout from "../../components/layout/main";
import { cache } from "react";
import { getPosts } from "../../utils/actions";
import { PostsGrid } from "../../components/blog/postsGrid";

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

export default async function BlogPage() {
  const posts = await loadPosts();
  return (
    <Layout className="px-5">
      <section className="relative mt-12 min-h-screen overflow-y-hidden md:m-12">
        <div className="space-y-10">
          <h1 className="text-3xl font-bold">📝 Blog</h1>
          <PostsGrid posts={posts} />
        </div>
      </section>
    </Layout>
  );
}
