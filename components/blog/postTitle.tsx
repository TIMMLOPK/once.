import Link from "next/link";
import { cn } from "../../utils/cn";

const PostTitle = ({
  title,
  id,
  className,
}: {
  title: string;
  id?: number;
  className: string;
}) => {
  return (
    <h1 className={cn("mt-4 font-bold leading-relaxed md:mt-0", className)}>
      {id !== undefined ? (
        <Link href={`/blog/${id}`} className="hover:underline">
          {title}
        </Link>
      ) : (
        title
      )}
    </h1>
  );
};

export default PostTitle;
