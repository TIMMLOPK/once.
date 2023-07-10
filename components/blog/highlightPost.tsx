import CoverImage from "./coverImage";
import Avatar from "./avatar";
import PostTitle from "./postTitle";

const HighlightPost = ({
  id,
  title,
  coverImage,
  date,
  author,
  authorImage,
}: {
  id: number;
  title: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <CoverImage title={title} src={coverImage} id={id} />
      <div className="flex w-full flex-col justify-between space-y-8">
        <PostTitle title={title} id={id} className="text-3xl" />
        <div className="flex items-center">
          <Avatar name={author} picture={authorImage} />
          <p className="ml-4 text-sm font-bold text-gray-500 dark:text-gray-300">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HighlightPost;
