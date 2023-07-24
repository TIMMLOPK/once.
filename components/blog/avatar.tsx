import Image from "next/image";
import { cn } from "../../utils/cn";

const Avatar = ({ name = "Timmy", picture = "/icon.webp", className = "" }) => {
  return (
    <div className="flex items-center">
      <div className={cn("relative mr-2 h-8 w-8", className)}>
        <Image
          src={picture}
          className="rounded-full shadow"
          height={48}
          width={48}
          alt={name}
        />
      </div>
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {name}
      </div>
    </div>
  );
};

export default Avatar;
