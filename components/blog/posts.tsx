import Avatar from "./avatar";
import CoverImage from "./coverImage";
import PostTitle from "./postTitle";
import { ReturnData } from "../../utils/api";

export const PostPreview = ({
  title,
  coverImage,
  date,
  id,
  author,
  authorImage,
}: {
  title: string;
  coverImage: string;
  date: string;
  id: number;
  author: string;
  authorImage: string;
}) => {
  return (
    <div className="space-y-6 md:p-8">
      <div className="hidden md:block">
        <CoverImage id={id} title={title} src={coverImage} />
      </div>
      <div className="space-y-6">
        <PostTitle title={title} id={id} className="text-2xl" />
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

export const Posts = ({ posts }: { posts: ReturnData[] }) => {
  return (
    <div className="mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-3">
        {posts.map((post: ReturnData, index: number) => (
          <PostPreview
            key={index}
            title={post.title}
            coverImage={post.coverimage}
            date={post.date}
            id={post.id}
            author={post.author}
            authorImage={post.authorimage}
          />
        ))}
      </div>
    </div>
  );
};
