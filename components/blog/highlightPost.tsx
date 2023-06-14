import CoverImage from "./coverImage";
import Avatar from "./avatar";
import PostTitle from "./postTitle";
import React from "react";

const HighlightPost = ({
  id,
  title,
  coverImage,
  date,
}: {
  id: number;
  title: string;
  coverImage: string;
  date: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <CoverImage title={title} src={coverImage} id={id} />
      <div className="flex w-full flex-col justify-between">
        <div className="flex h-full flex-col justify-between">
          <PostTitle title={title} id={id} className="text-3xl" />
          <div className="mt-6 flex flex-col justify-between md:mt-0">
            <div className="flex items-center">
              <Avatar />
              <div className="ml-4 text-sm text-gray-500 dark:text-gray-300">
                <p className="font-bold">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightPost;
