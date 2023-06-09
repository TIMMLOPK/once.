"use client";

import Navbar from "../navbar";
import Footer from "../footer";
import { AnimatePresence, m } from "framer-motion";
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
      <AnimatePresence mode="wait">
        <div className="fixed bottom-4 z-10 flex w-full justify-center">
          <Navbar />
        </div>
        <main className={cn("container mx-auto px-5", className)}>
          <m.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, easings: "easeInOut" }}
          >
            {children}
          </m.div>
          <Footer />
        </main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
