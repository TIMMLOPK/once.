import Layout from "../../components/layout/main";
import { Blog } from "../../components/sections/blog";

export default async function BlogPage() {
  return (
    <Layout className="px-5">
      <section className="relative mt-12 min-h-screen md:m-12">
        <Blog />
      </section>
    </Layout>
  );
}
