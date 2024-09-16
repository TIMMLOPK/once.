import { PostData } from "../../types";
import * as motion from "framer-motion/client";
import PostHeader from "./post/postHeader";
import PostBody from "./post/postBody";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import * as Dialog from "@radix-ui/react-dialog";

export const PostCard = ({
  post,
  onDismiss,
}: {
  post: PostData;
  onDismiss: () => void;
}) => {
  return (
    <Dialog.Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center md:py-2">
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 -z-10 bg-black bg-opacity-50 dark:bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            layoutId={post.id.toString()}
            className="h-full w-full max-w-4xl overflow-hidden bg-white pl-2 dark:border-b dark:border-zinc-700 dark:bg-black md:rounded-xl md:pl-6"
          >
            <motion.div className="flex justify-end px-4 py-4">
              <div className="flex items-center space-x-2">
                <Link href={`/blog/${post.id}`} passHref>
                  <button
                    className="rounded-full bg-gray-100 p-2 dark:bg-zinc-800"
                    aria-label="Open in new tab"
                  >
                    <LuExternalLink />
                    <span className="sr-only">Open in new tab</span>
                  </button>
                </Link>
                <button
                  onClick={() => onDismiss()}
                  className="z-10 rounded-full bg-gray-100 p-2 dark:bg-zinc-800"
                  aria-label="Close"
                >
                  <MdClose />
                  <span className="sr-only">Close</span>
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
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  );
};
