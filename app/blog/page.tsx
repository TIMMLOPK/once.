import Layout from "../../components/layout/main";
import { Blog } from "../../components/sections/blog";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <section className="relative mt-12 min-h-screen md:m-12">
        <Suspense fallback="Loading...">
          <Blog />
        </Suspense>
      </section>
    </Layout>
  );
}
