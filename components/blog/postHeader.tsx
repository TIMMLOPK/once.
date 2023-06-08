import Image from "next/image";
import Avatar from "./avatar";
import React from "react";

const PostHeader = ({
  title,
  coverImage,
  date,
  description,
}: {
  title: string;
  coverImage: string;
  date: string;
  description: string;
}) => {
  return (
    <div>
      <div className="mx-14">
        <div className="mb-8 flex items-center text-sm font-bold text-gray-500 dark:text-gray-300">
          <p>Blog</p>
          <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-300"></span>
          <div>
            <p>{date}</p>
          </div>
        </div>
        <h1 className="mb-4 text-left text-3xl font-black leading-relaxed tracking-tighter md:text-5xl">
          {title}
        </h1>
        <div className="mb-8 text-xl font-medium leading-relaxed md:text-2xl">
          {description}
        </div>
        <div className="flex items-center">
          <Avatar />
        </div>
      </div>
      <div className="mb-12 md:mt-8 md:block">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          width={2000}
          height={1000}
          className="rounded-lg border border-gray-200 shadow-small dark:border-gray-700"
        />
      </div>
    </div>
  );
};

export default PostHeader;
