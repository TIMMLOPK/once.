import Navbar from "../navbar";
import Footer from "../footer";
import useScroll from "../../utils/useScroll";

const Layout = ({ children }) => {
  const scrolled = useScroll();

  return (
    <main className="container mx-auto px-4">
      <Navbar scrolled={scrolled} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
