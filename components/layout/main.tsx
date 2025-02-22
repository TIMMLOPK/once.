import Navbar from "@/components/navbar";
import { cn } from "@/lib/cn";
import Footer from "../footer";

const Layout = ({
  children,
  className,
  activeSection,
}: {
  children: React.ReactNode;
  className?: string;
  activeSection?: string;
}) => {
  return (
    <>
      <main className={cn("container", className)}>{children}</main>
      <Navbar activeSection={activeSection} />
      <Footer />
    </>
  );
};

export default Layout;
