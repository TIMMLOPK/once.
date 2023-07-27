import Layout from "../../components/layout/main";
import { Blog } from "../../components/sections/blog";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <div className="mt-12 md:m-12">
        <section className="relative m-2 min-h-screen">
          <Suspense fallback="Loading...">
            <Blog />
          </Suspense>
        </section>
      </div>
    </Layout>
  );
}
