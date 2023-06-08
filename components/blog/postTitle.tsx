import Link from "next/link";
import { cn } from "../../utils/cn";

const PostTitle = ({
  title,
  slug,
  className,
}: {
  title: string;
  slug?: string;
  className: string;
}) => {
  return (
    <h1 className={cn("mt-4 font-bold leading-snug md:mt-0", className)}>
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
