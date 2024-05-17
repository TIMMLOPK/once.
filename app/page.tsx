import { AnimatedIcon } from "../components/animatedIcon";
import { HomePageTitle } from "../components/animatedText";
import Layout from "../components/layout/main";
import Icon from "../public/icon.webp";
import { caveat } from "./fonts";

export default async function HomePage() {
  return (
    <Layout>
      <section className="relative m-2 flex min-h-screen items-center lg:px-5">
        <div>
          <AnimatedIcon src={Icon} />
          <div className="relative inset-0 hidden md:absolute md:left-1/2 md:flex md:flex-col md:items-center md:justify-center">
            <HomePageTitle
              className={`${caveat.className} flex overflow-hidden text-4xl md:m-4 md:p-10`}
            />
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-36 w-36  translate-x-1/2 rounded-3xl bg-blue-400 mix-blend-multiply blur-3xl dark:bg-blue-900" />
              <div className="h-24 w-24 -translate-y-10 translate-x-1/2 rounded-3xl bg-indigo-400 mix-blend-multiply blur-3xl dark:bg-indigo-900" />
              <div className="h-28 w-28 translate-y-10 rounded-3xl bg-purple-400 mix-blend-multiply blur-3xl dark:bg-purple-900" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
