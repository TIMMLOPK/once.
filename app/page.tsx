import Layout from "../components/layout/main";
import Home from "../components/sections/home";
import { cn } from "../utils/cn";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("relative m-2 min-h-screen", className)}>
      {children}
    </section>
  );
};

export default async function HomePage() {
  return (
    <Layout>
      <Section className="flex items-center lg:px-5">
        <Home />
      </Section>
    </Layout>
  );
}
