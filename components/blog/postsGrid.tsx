"use client";

import { useState } from "react";
import { PostData } from "../../types";
import PostItem from "./postItem";
import Button from "../shared/button";
import { AnimatePresence } from "framer-motion";
import { PostCard } from "./postCard";
import { Dialog } from "@radix-ui/react-dialog";

export const PostsGrid = ({ posts }: { posts: PostData[] }) => {
  const [postsToShow, setPostsToShow] = useState(3);
  const [postId, setPostId] = useState<number | null>(null);

  return (
    <div>
      <AnimatePresence>
        <Dialog open={postId !== null} onOpenChange={() => setPostId(null)}>
          {postId && (
            <PostCard
              post={posts.find((post) => post.id === postId)}
              onDismiss={() => setPostId(null)}
            />
          )}
        </Dialog>
      </AnimatePresence>
      {posts.length !== 0 && (
        <div className="space-y-8 sm:space-y-16">
          <PostItem
            id={posts[0].id}
            title={posts[0].title}
            coverImage={posts[0].coverImage}
            date={posts[0].date}
            author={posts[0].author}
            authorImage={posts[0].authorImage}
            setPostId={setPostId}
          />
          <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-2 md:space-x-6">
            {posts.slice(1, postsToShow).map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                authorImage={post.authorImage}
                size="small"
                setPostId={setPostId}
              />
            ))}
          </div>
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
      )}
    </div>
  );
};
