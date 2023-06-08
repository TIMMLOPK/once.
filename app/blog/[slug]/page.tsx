import { getPostBySlug, getAllPosts } from "../../../utils/api";
import markdownToHtml from "../../../utils/markdownToHtml";
import PostBody from "../../../components/blog/postBody";
import PostHeader from "../../../components/blog/postHeader";
import Layout from "../../../components/Layout/main";
import { Metadata } from "next";

export default async function Post({ params }) {
  const { post } = await getPost(params);

  return (
    <Layout className="px-0">
      <div className="container mx-auto max-w-4xl p-8">
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            description={post.description}
          />
          <div className="mx-auto max-w-3xl">
            <PostBody content={post.content} />
          </div>
        </article>
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
    "description",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    post: {
      ...post,
      content,
    },
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
