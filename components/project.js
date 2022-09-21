import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ title, children, link }) => {
  return (
    <div className="dark:text-white m-6 relative text-center">
      <Link href={link} passHref>
        <Image
          src="/card.png"
          className="rounded-lg"
          width={620 * 0.5}
          height={320 * 0.5}
          alt="card"
        />
      </Link>
      <div className="mt-4">
        <span className="font-mono">{title}</span>
      </div>
      <div className="mt-3 opacity-70 text-sm font-mono">{children}</div>
    </div>
  );
};

export default ProjectCard;
