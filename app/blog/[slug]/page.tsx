import { getPostBySlug, getAllPosts } from "../../../utils/api";
import markdownToHtml from "../../../utils/markdownToHtml";
import PostBody from "../../../components/blog/postBody";
import PostHeader from "../../../components/blog/postHeader";
import Layout from "../../../components/Layout/main";
import { Metadata } from "next";

export default async function Post({ params }) {
  const { post, morePosts } = await getPost(params);

  return (
    <Layout className="px-0">
      <div className="container mx-auto max-w-4xl p-8">
        <>
          <article className="mb-32">
            <div className="mx-auto max-w-3xl">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
              <PostBody content={post.content} />
            </div>
            {morePosts.length > 0 && (
              <div className="mt-8 min-w-full">
                <h3 className="mb-4 text-2xl font-bold">More Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* {morePosts.map((post) => (

                    ))} */}
                </div>
              </div>
            )}
          </article>
        </>
      </div>
    </Layout>
  );
}

async function getPost(params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const posts = getAllPosts(["title", "date", "slug", "coverImage"]);
  const content = await markdownToHtml(post.content || "");

  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  const morePosts = otherPosts.sort(() => 0.5 - Math.random()).slice(0, 3);
  return {
    post: {
      ...post,
      content,
    },
    morePosts,
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => post.slug);
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { post } = await getPost(params);

  return {
    title: `${post.title} | ONCE`,
    openGraph: {
      images: post.ogImage.url,
      description: post.description,
    },
  };
}
