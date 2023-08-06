const PostBody = ({ content }: { content: string | TrustedHTML }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="prose prose-slate dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default PostBody;
