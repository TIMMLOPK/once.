import Layout from "@/components/layout/main";
// import { cache } from "react";
// import { getPosts } from "@/app/actions";
import { PostsGrid } from "@/components/blog/postsGrid";
import { PostData } from "@/lib/types/post";
import { SectionTitle } from "@/components/shared/sectionTitle";
// import { PostData } from "@/lib/types/post";

// async function getSortedPosts(): Promise<PostData[]> {
//   const posts = await getPosts();

//   const publishedPosts = posts.filter((post: PostData) => post.published);

//   return publishedPosts.sort((a: any, b: any) => {
//     if (a.id > b.id) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });
// }

// const loadPosts = cache(async () => {
//   return await getSortedPosts();
// });

export default async function BlogPage() {
  const posts = [] as PostData[];

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
    );
  }
  return (
    <Layout className="mx-4 md:mx-auto">
      <section className="relative mt-12 min-h-screen overflow-y-hidden md:m-12">
        <SectionTitle>Blog</SectionTitle>
        <PostsGrid posts={posts} />
      </section>
    </Layout>
  );
}
