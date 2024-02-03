import Github from "../github";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import Display from "../../public/display.jpg";
import { AnimatedTextWord } from "../animatedText";
import { caveat } from "../../app/fonts";

const socials = [
  {
    name: "Discord (timmy_y)",
    link: "https://discord.com",
    icon: <FaDiscord className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/tw_wu_as_tim/",
    icon: <FaInstagram className="h-5 w-5" />,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/once_wu",
    icon: <FaTwitter className="h-5 w-5" />,
  },
];

export const About = async () => {
  const user = await getGithubStats();
  return (
    <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12">
      <div className="lg:pl-40">
        <div className="max-w-[300px] md:max-w-[380px]">
          <Image
            src={Display}
            alt="Picture of a shop"
            sizes="300px"
            placeholder="blur"
            className="aspect-square rotate-3 rounded-2xl object-cover transition duration-500 ease-in-out hover:rotate-0"
          />
        </div>
      </div>
      <div className="lg:order-first lg:row-span-2">
        <div className="text-base leading-relaxed text-zinc-600 dark:text-zinc-100">
          <h1 className="text-2xl font-bold">👋 Hi, I&apos;m Timmy</h1>
          <br />
          <p>
            I am a developer who loves coding and creating 🪄. I am passionate
            about building things that make people’s lives better. I am also a
            fan of open source and love to contribute to the community.
          </p>
          <br />
          <p>
            I created some projects that I am proud of. If you are interested,
            you can check them out on my{" "}
            <Link href="/projects" className="underline decoration-dashed">
              🗂️ projects
            </Link>
            . Also, I am writing some articles about my experience and
            knowledge. You can check{" "}
            <Link href="/blog" className="underline decoration-dashed">
              📝 blog
            </Link>
            . If you have any questions or want to chat, feel free to reach out
            to me by way of the socials below.
          </p>
          <br />
          <p className="z-10">
            The world is{" "}
            <span className="relative mr-1">
              <span className="absolute -right-4 -top-2 rotate-12 animate-pulse text-lg">
                ⚡
              </span>
              fast
            </span>{" "}
            and ever-changing. I believe that the only way to keep up with the
            world is to keep learning. I am always learning and trying to
            improve myself. I am also a big fan of the idea of learning in
            public. I love to share my knowledge and experience with others.
            Seize the day, and make it count.
          </p>
          <br />
          <AnimatedTextWord
            text="Everything is always once."
            className={`${caveat.className} -ml-2 flex overflow-hidden text-2xl`}
          />
          <br />
          <div className="mt-8 flex flex-col space-y-6">
            <div className="flex items-center">
              <Github user={user} />
            </div>
            <div className="flex items-center space-x-6">
              {socials.map((social, index) => (
                <Link
                  href={social.link}
                  passHref
                  aria-label="Open in new tab"
                  key={index}
                  className="group"
                >
                  <div className="flex items-center space-x-2 rounded-full text-zinc-500 transition group-hover:text-blue-500 group-hover:text-opacity-100 dark:text-zinc-100">
                    {social.icon}
                    <p className="text-xs group-hover:text-opacity-100">
                      {social.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

async function getGithubStats(): Promise<{
  followers: number;
  public_repos: number;
}> {
  const res = await fetch("https://api.github.com/users/TIMMLOPK");
  const data = await res.json();

  return {
    followers: data.followers,
    public_repos: data.public_repos,
  };
}

export default About;
