import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useState,useEffect } from "react";

const ProjectCard = ({ title, children, link, inview }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inview) {
      setShow(true);
    }
  }, [inview]);

  return (
    <Transition
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="transform scale-0"
      enterTo="transform scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform scale-100"
      leaveTo="transform scale-0"
    >
      <div className="dark:text-white m-6 relative">
        <Link href={link} passHref>
          <Image
            src="/card.png"
            className="rounded-lg"
            width={460 * 0.5}
            height={240 * 0.5}
            alt="card"
          />
        </Link>
        <div className="mt-4">
          <span className="font-mono tracking-wide text-lg">{title}</span>
        </div>
        <div className="mt-2 opacity-70 text-sm font-mono">{children}</div>
      </div>
    </Transition>
  );
};

export default ProjectCard;
