import Layout from "../components/layout/main";
import { Line } from "../components/icons/line";
import Home from "../components/sections/home";
import { cn } from "../utils/cn";
import { Suspense } from "react";
import { HomeBlog } from "../components/sections/blog";
import Link from "next/link";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

const Section = ({
  children,
  className,
  isLast,
}: {
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}) => {
  return (
    <section className={cn("relative m-2 min-h-screen", className)}>
      {children}
      {!isLast && <Line />}
    </section>
  );
};

export default async function HomePage() {
  return (
    <Layout>
      <Section className="flex items-center lg:px-5">
        <Home />
      </Section>
      <Section isLast className="min-h-full px-5">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <Suspense fallback="Loading...">
            <HomeBlog />
          </Suspense>
          <div className="lg:pl-16 xl:pl-24">
            <div className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800 md:max-w-lg lg:p-6">
              <h1 className="text-xl font-bold">Soical Media</h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
                You can find me on these social media platforms.
              </p>
              <div className="mt-6 flex flex-col space-y-4">
                {SOCIALS.map((social, index) => (
                  <Link
                    href={social.link}
                    passHref
                    aria-label="Open in new tab"
                    key={index}
                  >
                    <div className="flex items-center space-x-2 rounded-full text-zinc-500 transition hover:text-blue-500 active:text-blue-500 dark:text-zinc-200">
                      {social.icon}
                      <p className="text-xs">{social.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

const SOCIALS = [
  {
    name: "Twitter",
    link: "https://twitter.com/once_wu",
    icon: <FaTwitter />,
  },
  {
    name: "GitHub",
    link: "https://github.com/TIMMLOPK",
    icon: <FaGithub />,
  },
  {
    name: "Discord (timmy_y)",
    link: "https://discord.com",
    icon: <FaDiscord />,
  },
];
