import PostBody from "../../../components/blog/post/postBody";
import PostHeader from "../../../components/blog/post/postHeader";
import Layout from "../../../components/layout/main";
import { Metadata } from "next";
import { PostData } from "../../../types/postData";

export default async function Post({ params }) {
  const { post } = await getPost(params);

  return (
    <Layout className="px-0">
      <article className="mx-auto mb-20 max-w-4xl space-y-12 p-8">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          description={post.description}
          author={post.author}
          authorImage={post.authorImage}
        />
        <PostBody content={post.content} />
      </article>
    </Layout>
  );
}

export const dynamicParams = true;

async function getPost(params): Promise<{ post: PostData }> {
  const post = await fetch(process.env.API_URL + "/posts/" + params.id, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return {
    post: {
      ...post,
    },
  };
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { post } = await getPost(params);

  return {
    title: `${post.title} | ONCE`,
    openGraph: {
      images: post.ogImageURL,
      description: post.description,
    },
  };
}
