import { PostData } from "../../utils/types";
import { motion } from "framer-motion";
import PostHeader from "./post/postHeader";
import PostBody from "./post/postBody";
import { MdClose } from "react-icons/md";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export const PostCard = ({
  post,
  onDismiss,
}: {
  post: PostData;
  onDismiss: () => void;
}) => {
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        layoutId={post.id.toString()}
        className="h-full w-full max-w-4xl overflow-hidden bg-white pl-6 shadow-2xl dark:border-b dark:border-zinc-700 dark:bg-black dark:shadow-none md:rounded-xl"
      >
        <motion.div className="flex justify-end px-4 py-4">
          <div className="flex items-center space-x-2">
            <Link href={`/blog/${post.id}`} passHref>
              <button
                className="rounded-full bg-gray-100 p-2 dark:bg-zinc-800"
                aria-label="Open in new tab"
              >
                <LuExternalLink />
              </button>
            </Link>
            <button
              onClick={() => onDismiss()}
              className="z-10 rounded-full bg-gray-100 p-2 dark:bg-zinc-800"
              aria-label="Close"
            >
              <MdClose />
            </button>
          </div>
        </motion.div>
        <motion.div className="h-[calc(100%-4rem)] overflow-y-auto p-4">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            authorImage={post.authorImage}
            description={post.description}
          />
          <PostBody content={post.content} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
