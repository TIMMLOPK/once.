"use client";

import { useState } from "react";
import { ReturnData } from "../../utils/api";
import { Posts } from "../blog/posts";
import HighlightPost from "../blog/highlightPost";
import Button from "../shared/button";

export const PostsGrid = ({ posts }: { posts: ReturnData[] }) => {
  const [postsToShow, setPostsToShow] = useState(3);
  const publishedPosts = posts?.filter((post) => post.published);
  return (
    <>
      {publishedPosts.length !== 0 && (
        <div className="mx-auto space-y-6 p-6 sm:space-y-12">
          <HighlightPost
            id={publishedPosts[0].id}
            title={publishedPosts[0].title}
            coverImage={publishedPosts[0].coverimage}
            date={publishedPosts[0].date}
            author={publishedPosts[0].author}
            authorImage={publishedPosts[0].authorimage}
          />
          <hr className="my-28 min-w-full border-gray-300 dark:border-gray-700" />
          <Posts posts={publishedPosts.slice(1, postsToShow)} />
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
