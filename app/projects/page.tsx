import Layout from "../../components/layout/main";
import Projects from "../../components/sections/projects";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <section className="relative mt-12 min-h-screen md:m-12">
        <Projects />
      </section>
    </Layout>
  );
}
