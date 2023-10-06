const PostBody = ({ content }: { content: string | TrustedHTML }) => {
  return (
    <div className="prose prose-neutral max-w-full dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
