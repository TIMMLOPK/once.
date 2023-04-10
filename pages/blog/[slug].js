import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
import PostBody from "../../components/blog/postBody";
import PostHeader from "../../components/blog/postHeader";
import Layout from "../../components/Layout/main";
import { PostPreview } from "../../components/blog/posts";

export default function Post({ post, morePosts }) {
  const router = useRouter();
  const title = `${post.title} | ONCE`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout className="px-0">
      <div className="container mx-auto max-w-4xl p-8">
        {router.isFallback ? (
          <PostHeader title="Loading…" />
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
                <meta property="og:description" content={post.description} />
              </Head>
              <div className="mx-auto max-w-3xl">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </div>
              {morePosts.length > 0 && (
                <div className="mt-8 min-w-full">
                  <h3 className="mb-4 text-2xl font-bold">More Posts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {morePosts.map((post) => (
                      <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        description={post.description}
                        slug={post.slug}
                      />
                    ))}
                  </div>
                </div>
              )}
            </article>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
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
    props: {
      post: {
        ...post,
        content,
      },
      morePosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
