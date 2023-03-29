import Link from "next/link";

const Blog = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">📝 Blog(Testing)</h1>
        <br />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          I write about my experiences and what I learn.
        </p>
      </div>
      <div className="mt-10 flex">
        <div className="grid gap-4 md:grid-flow-col md:grid-rows-2 md:gap-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg font-semibold tracking-wide text-gray-400 dark:text-gray-600">
                <Link href="/blog/first-post" className="pointer-events-none">
                  → First Post(Testing)
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
