const PostBody = ({ content }: { content: string | TrustedHTML }) => {
  return (
    <div className="prose prose-slate mx-auto max-w-2xl dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
