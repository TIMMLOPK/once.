import Navbar from "../navbar";
import Footer from "../footer";
import { Variants } from "framer-motion";
import * as motion from "framer-motion/client";
import { cn } from "../../utils/cn";

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};

const Layout = ({
  children,
  className,
  motionVariants,
}: {
  children: React.ReactNode;
  className?: string;
  motionVariants?: Variants;
}) => {
  return (
    <>
      <main className={cn("container mx-auto", className)}>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={motionVariants || variants}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
        <Footer />
      </main>
      <div className="fixed bottom-4 z-10 flex w-full justify-center">
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
