"use client";

import Navbar from "../navbar";
import Footer from "../footer";
import { m } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <main className={cn("container", className)}>
        <m.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          {children}
        </m.div>
        <Footer />
      </main>
      <div className="fixed bottom-4 z-10 flex w-full justify-center">
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
