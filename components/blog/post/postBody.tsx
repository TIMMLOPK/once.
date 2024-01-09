import { MDXRemote } from "next-mdx-remote/rsc";

const PostBody = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-neutral max-w-full dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
      <MDXRemote source={content} />
    </div>
  );
};

export default PostBody;
