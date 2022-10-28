import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

const ProjectCard = ({ title, children, link }) => {
  return (
    <div className="dark:text-white m-6 relative">
      <Image
        src="/card.png"
        className="rounded-lg"
        width={460 * 0.5}
        height={240 * 0.5}
        alt="card"
      />
      <div className="mt-4 cursor-pointer">
        <div className="flex items-center space-x-2">
          <span className="font-mono tracking-wide text-lg font-semibold">
            {title}
          </span>
          <Link href={link} passHref>
            <MdOpenInNew className="text-gray-500 hover:text-blue-500 active:text-blue-500" />
          </Link>
        </div>
      </div>
      <div className="mt-2 opacity-70 text-sm font-mono max-w-[230px]">
        {children}
      </div>
    </div>
  );
};

export default ProjectCard;
