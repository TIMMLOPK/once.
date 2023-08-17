"use client";

import { useState } from "react";
import { ReturnData } from "../../utils/api";
import PostCard from "./postCard";
import Button from "../shared/button";

export const PostsGrid = ({ posts }: { posts: ReturnData[] }) => {
  const [postsToShow, setPostsToShow] = useState(3);
  const publishedPosts = posts?.filter((post) => post.published);
  return (
    <>
      {publishedPosts.length !== 0 && (
        <div className="space-y-8 sm:space-y-16">
          <PostCard
            id={publishedPosts[0].id}
            title={publishedPosts[0].title}
            coverImage={publishedPosts[0].coverimage}
            date={publishedPosts[0].date}
            author={publishedPosts[0].author}
            authorImage={publishedPosts[0].authorimage}
          />
          <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-2 md:space-x-6">
            {publishedPosts.slice(1, postsToShow).map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                coverImage={post.coverimage}
                date={post.date}
                author={post.author}
                authorImage={post.authorimage}
                size="small"
              />
            ))}
          </div>
          {publishedPosts.length > postsToShow && (
            <div className="flex justify-center">
              <Button
                onClick={() => setPostsToShow(postsToShow + 3)}
                className="rounded-full bg-black text-white dark:bg-white dark:text-black"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
