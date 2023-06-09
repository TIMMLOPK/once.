import Image from "next/image";
import usePosts from "../../../utils/data/usePosts";

function TableBody({ children }) {
  return (
    <div className="mx-auto w-full rounded-lg bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}

export default function Table() {
  const { posts, isLoading } = usePosts();

  if (isLoading)
    return (
      <TableBody>
        <h2 className="animate-pulse text-xl font-semibold">Loading...</h2>
      </TableBody>
    );

  if (!posts || posts.length === 0) {
    return (
      <TableBody>
        <h2 className="text-xl font-semibold">No Posts</h2>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">There are no posts yet</p>
      </TableBody>
    );
  }

  return (
    <TableBody>
      <h2 className="text-xl font-semibold">Posts</h2>
      <div className="divide-y divide-gray-900/5">
        {posts.map((post) => (
          <div key={post.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-10 w-10">
                <Image
                  src={post.authorImage}
                  className="rounded-full"
                  height={40}
                  width={40}
                  alt={post.author}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-100">
                  {post.author}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </TableBody>
  );
}
