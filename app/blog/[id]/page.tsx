import PostBody from "../../../components/blog/postBody";
import PostHeader from "../../../components/blog/postHeader";
import Layout from "../../../components/layout/main";
import { Metadata } from "next";
import { ReturnData } from "../../../utils/api";

export default async function Post({ params }) {
  const { post } = await getPost(params);

  return (
    <Layout className="px-0">
      <div className="mx-auto max-w-4xl p-8">
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverimage}
            date={post.date}
            description={post.description}
            author={post.author}
            authorImage={post.authorimage}
          />
          <div className="max-w-3xl">
            <PostBody content={post.content} />
          </div>
        </article>
      </div>
    </Layout>
  );
}

export const dynamicParams = true;

async function getPost(params): Promise<{ post: ReturnData }> {
  const post = await fetch(process.env.API_URL + "/post/" + params.id, {
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
      images: post.ogimageurl,
      description: post.description,
    },
  };
}
