import Link from "next/link";
import { cn } from "../../utils/cn";

const PostTitle = ({ title, slug, size }) => {
  return (
    <h1 className={cn("mt-4 font-bold leading-snug md:mt-0", size)}>
      {slug ? (
        <Link
          as={`/blog/${slug}`}
          href="/blog/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      ) : (
        title
      )}
    </h1>
  );
};

export default PostTitle;
