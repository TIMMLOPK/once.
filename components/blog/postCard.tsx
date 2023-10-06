import Link from "next/link";
import { cn } from "../../utils/cn";
import Avatar from "./avatar";
import PostTitle from "./postTitle";
import Image from "next/image";

const PostCard = ({
  id,
  title,
  coverImage,
  date,
  author,
  authorImage,
  size = "large",
}: {
  id: number;
  title: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
  size?: "small" | "large";
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-2xl dark:border-b dark:border-zinc-700 dark:shadow-none",
        size === "small" ? "max-w-xl" : "max-w-3xl",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 z-10 h-[200px] bg-gradient-to-t from-black dark:from-zinc-900"></div>
      <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-6 text-left md:space-y-4">
        <PostTitle
          title={title}
          className={cn(
            "text-white",
            size === "small" ? "text-lg" : "text-xl md:text-3xl",
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar
              name={author}
              picture={authorImage}
              className="text-xs text-gray-100 md:text-sm"
              imageClassName="h-6 w-6 md:w-8 md:h-8"
            />
            <p className="text-xs text-white/80 md:text-sm">{date}</p>
          </div>
          <Link
            href={`/blog/${id}`}
            className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80 transition hover:bg-white/20 hover:text-white md:px-4 md:text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          className="object-cover"
          width={size === "small" ? 600 : 1500}
          height={size === "small" ? 400 : 750}
        />
      </div>
    </div>
  );
};

export default PostCard;
