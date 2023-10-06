import Image from "next/image";
import { cn } from "../../utils/cn";

const Avatar = ({
  name = "Timmy",
  picture = "/icon.webp",
  className = "",
  imageClassName = "",
}) => {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className={cn("relative h-8 w-8", imageClassName)}>
        <Image
          src={picture}
          className="rounded-full shadow"
          height={48}
          width={48}
          alt={name}
        />
      </div>
      <p
        className={cn(
          "text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100",
          className,
        )}
      >
        {name}
      </p>
    </div>
  );
};

export default Avatar;
