import CoverImage from "./coverImage";
import Avatar from "./avatar";
import PostTitle from "./postTitle";
import React from "react";

const HighlightPost = ({ slug, title, coverImage, date, description }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <CoverImage title={title} src={coverImage} slug={slug} />
      <div className="flex w-full flex-col justify-between lg:col-span-5">
        <div className="flex h-full flex-col justify-between">
          <PostTitle title={title} slug={slug} size="text-3xl" />
          <div className="mt-5 flex flex-col justify-between">
            <p className="mb-4 text-lg leading-relaxed">{description}</p>
            <div className="flex items-center">
              <Avatar />
              <div className="ml-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightPost;
