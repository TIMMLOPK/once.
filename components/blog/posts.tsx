import React from "react";
import Avatar from "./avatar";
import CoverImage from "./coverImage";
import PostTitle from "./postTitle";
import { PostData } from "../../utils/api";

export const PostPreview = ({
  title,
  coverImage,
  date,
  description,
  id,
}: {
  title: string;
  coverImage: string;
  date: string;
  description: string;
  id: number;
}) => {
  return (
    <div className="p-8">
      <div className="mb-5">
        <CoverImage id={id} title={title} src={coverImage} />
      </div>
      <PostTitle title={title} id={id} className="text-2xl" />
      <div className="mt-5 flex flex-col justify-between">
        <p className="mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center">
          <Avatar name="Timmy" picture="/icon.webp" />
          <div className="ml-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Post = ({ posts }: { posts: PostData[] }) => {
  return (
    <div className="container mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-3">
        {posts.map((post: any) => (
          <PostPreview
            key={post.id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            description={post.description}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
};
