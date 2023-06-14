"use client";

import { Post } from "../blog/posts";
import HighlightPost from "../blog/highlightPost";
import { useState } from "react";
import usePosts from "../../utils/data/usePosts";

const Blog = () => {
  const { posts, isLoading } = usePosts();
  const [postsToShow, setPostsToShow] = useState(3);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">📝 Blog</h1>
        <br />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div className="mt-10">
        <div className="container mx-auto space-y-6 p-6 sm:space-y-12">
          <HighlightPost
            id={posts[0].id}
            title={posts[0].title}
            coverImage={posts[0].coverImage}
            date={posts[0].date}
          />
          <hr className="my-28 min-w-full border-gray-300 dark:border-gray-700" />
          <Post posts={posts.slice(1, postsToShow)} />
          {posts.length > 1 && (
            <div className="flex justify-center">
              <button
                onClick={() => setPostsToShow(postsToShow + 3)}
                className="rounded-full bg-black px-4 py-2 font-bold text-white"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
