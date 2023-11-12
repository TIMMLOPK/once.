import Layout from "../../components/layout/main";
import About from "../../components/sections/about";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <section className="relative mt-12 flex min-h-screen items-center justify-center md:m-12 md:px-6">
        <About />
      </section>
    </Layout>
  );
}
