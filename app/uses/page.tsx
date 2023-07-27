import Layout from "../../components/layout/main";
import TechStack from "../../components/sections/techStack";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <div className="mt-12 md:m-12">
        <section className="relative m-2 min-h-screen">
          <TechStack />
        </section>
      </div>
    </Layout>
  );
}
