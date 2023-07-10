import Image from "next/image";
import Avatar from "./avatar";

const PostHeader = ({
  title,
  coverImage,
  date,
  description,
  author,
  authorImage,
}: {
  title: string;
  coverImage: string;
  date: string;
  description: string;
  author: string;
  authorImage: string;
}) => {
  return (
    <div>
      <div className="md:mx-14">
        <div className="mb-8 flex items-center text-sm font-bold text-gray-500 dark:text-gray-300">
          <p>Blog</p>
          <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-300"></span>
          <p>{date}</p>
        </div>
        <h1 className="mb-4 text-left text-3xl font-bold leading-relaxed tracking-tighter md:text-4xl">
          {title}
        </h1>
        <p className="mb-8 text-base font-medium md:text-xl">{description}</p>
        <div className="flex items-center">
          <Avatar name={author} picture={authorImage} className="h-8 w-8" />
        </div>
      </div>
      <div className="mb-12 mt-8">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          width={1500}
          height={750}
          className="rounded-lg border border-gray-200 shadow-small dark:border-gray-700"
        />
      </div>
    </div>
  );
};

export default PostHeader;
