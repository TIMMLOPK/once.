import { useEffect, useState, useCallback } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const Layout = ({ children, inView }) => {
  const [scrolling, setScrolling] = useState(0);
  const [show, setShow] = useState(true);

  const handleScroll = useCallback(() => {
    setScrolling(scrolling++);
  }, [scrolling]);

  useEffect(() => {
    if (scrolling > 5) {
      setShow(false);
    }
    setTimeout(() => {
      setShow(true);
    }, 2500);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, scrolling]);

  return (
    <main className="container mx-auto px-4">
      <Navbar show={show} inView={inView} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
