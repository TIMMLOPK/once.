import { PostData } from "@/lib/types/post";
import { PostCard } from "./postCard";
import { AnimatedBackground } from "@/components/motions/animatedBackground";
import { cn } from "@/lib/cn";
import { caveat } from "@/app/fonts";

export const PostsGrid = ({ posts }: { posts: PostData[] }) => {
  const groupedPosts = posts.reduce((acc: Record<string, PostData[]>, post) => {
    // Convert dd/mm/yyyy to yyyy-mm-dd for proper Date parsing
    const [day, month, year] = post.date.split("/");
    const dateObj = new Date(`${year}-${month}-${day}`);

    const time = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    if (!acc[time]) {
      acc[time] = [];
    }

    acc[time].push(post);
    return acc;
  }, {}) as Record<string, PostData[]>;

  return (
    <div className="flex flex-col space-y-5">
      {Object.entries(groupedPosts).map(([time]) => (
        <div
          key={time}
          className="relative flex flex-col space-x-2 md:flex-row"
        >
          <h2
            className={cn(
              `${caveat.className} min-w-20 font-bold text-zinc-400 dark:text-zinc-200`,
              "uppercase",
            )}
          >
            {time}
          </h2>
          <div className="flex grow flex-col space-y-4">
            <AnimatedBackground
              className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6,
              }}
              enableHover
            >
              {groupedPosts[time].map((post) => (
                <div data-id={`card-${post.id}`} key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
            </AnimatedBackground>
          </div>
        </div>
      ))}
    </div>
  );
};
