import Image from "next/image";
import { cn } from "../../utils/cn";

const Avatar = ({ name = "Timmy", picture = "/icon.webp", className = "" }) => {
  return (
    <div className="flex items-center">
      <div className={cn("relative mr-2 h-6 w-6 md:h-8 md:w-8", className)}>
        <Image
          src={picture}
          className="rounded-full shadow"
          height={32}
          width={32}
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
