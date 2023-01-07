import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

const ProjectCard = ({ title, children, link }) => {
  return (
    <div className="dark:text-white m-6 relative w-auto h-auto items-center">
      <div className="after:content group relative after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
        <Image
          src={"/card.png"}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL={"/card.png"}
          width={250}
          height={120}
          alt="card"
        />
      </div>
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
