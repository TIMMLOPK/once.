import { cn } from "../../utils/cn";

const PostTitle = ({
  title,
  className,
}: {
  title: string;
  id?: number;
  className?: string;
}) => {
  return (
    <h1 className={cn("mt-4 font-bold leading-relaxed md:mt-0", className)}>
      {title}
    </h1>
  );
};

export default PostTitle;
