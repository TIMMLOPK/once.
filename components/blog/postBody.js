import markdownStyles from "./markdown-styles.module.css";

const PostBody = ({ content }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
