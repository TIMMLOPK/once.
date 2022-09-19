import { useEffect, useState, useCallback } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import useScroll from "../../utils/useScroll";

const Layout = ({ children, inView }) => {
  const [show, setShow] = useState(true);
  const scrolled = useScroll()


  useEffect(() => {
    if (scrolled) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [scrolled]);

  return (
    <main className="container mx-auto px-4">
      <Navbar show={show} inView={inView} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
