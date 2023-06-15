"use client";

import { Post } from "../blog/posts";
import HighlightPost from "../blog/highlightPost";
import { useState } from "react";
import usePosts from "../../utils/data/usePosts";
import { Loading } from "../shared/loading";
import Button from "../shared/button";

const Blog = () => {
  const { posts, isLoading } = usePosts();
  const [postsToShow, setPostsToShow] = useState(3);

  if (isLoading) {
    return <Loading />;
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
            coverImage={posts[0].coverimage}
            date={posts[0].date}
            author={posts[0].author}
            authorImage={posts[0].authorimage}
          />
          <hr className="my-28 min-w-full border-gray-300 dark:border-gray-700" />
          <Post posts={posts.slice(1, postsToShow)} />
          {posts.length > postsToShow && (
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
      </div>
    </div>
  );
};

export default Blog;
