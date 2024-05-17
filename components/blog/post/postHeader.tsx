import Image from "next/image";
import Avatar from "../avatar";

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
    <div className="relative mb-4 space-y-8">
      <div className="flex items-center text-sm font-bold text-gray-500 dark:text-gray-300">
        <p>Blog</p>
        <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-300"></span>
        <p>{date}</p>
      </div>
      <div className="space-y-6">
        <h1 className="text-left text-3xl font-bold leading-relaxed text-gray-900 dark:text-gray-100 md:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-gray-900 dark:text-gray-100">
          {description}
        </p>
        <div>
          <Avatar name={author} picture={authorImage} />
        </div>
      </div>
      <Image
        src={coverImage}
        alt={`Cover Image for ${title}`}
        width={1440}
        height={700}
        className="aspect-video rounded-lg border border-zinc-200 shadow-small dark:border-zinc-700 dark:shadow-none"
      />
    </div>
  );
};

export default PostHeader;
