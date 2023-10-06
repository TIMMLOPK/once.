import Layout from "../components/layout/main";
import { Line } from "../components/icons/line";
import Home from "../components/sections/home";
import { cn } from "../utils/cn";

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
      <Section className="flex items-center lg:px-5" isLast>
        <Home />
      </Section>
    </Layout>
  );
}
