import Layout from "../../components/layout/main";
import Projects from "../../components/sections/projects";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <div className="mt-12 md:m-12">
        <section className="relative m-2 min-h-screen">
          <Projects />
        </section>
      </div>
    </Layout>
  );
}
