import Layout from "../../components/layout/main";
import About from "../../components/sections/about";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Layout className="px-5">
      <div className="mt-12 md:m-12 md:p-8">
        <section className="relative m-2 flex min-h-screen items-center justify-center px-6">
          <Suspense fallback="Loading...">
            <About />
          </Suspense>
        </section>
      </div>
    </Layout>
  );
}
