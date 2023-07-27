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
    <Layout className="px-5">
      <Section className="flex items-center">
        <Home />
      </Section>
      <Section isLast>
        <Suspense fallback="Loading...">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 md:max-w-none md:grid-cols-2">
            <div className="flex flex-col">
              <HomeBlog />
            </div>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <div className="rounded-lg border border-zinc-100 p-6 dark:border-zinc-600 md:max-w-lg">
                <h1 className="text-xl font-bold">Soical Media</h1>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  You can find me on these social media platforms.
                </p>
                <div className="mt-8 flex flex-col space-y-4">
                  {SOCIALS.map((social, index) => (
                    <Link
                      href={social.link}
                      passHref
                      aria-label="Open in new tab"
                      key={index}
                    >
                      <div className="flex items-center space-x-2 rounded-full text-gray-500 transition hover:text-blue-500 active:text-blue-500">
                        {social.icon}
                        <p className="text-xs">{social.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </Section>
    </Layout>
  );
}

const SOCIALS = [
  {
    name: "Twitter",
    link: "https://twitter.com/0xZ0F",
    icon: <FaTwitter />,
  },
  {
    name: "GitHub",
    link: "https://github.com/TIMMLOPK",
    icon: <FaGithub />,
  },
  {
    name: "Discord(timmy_y)",
    link: "/",
    icon: <FaDiscord />,
  },
];
