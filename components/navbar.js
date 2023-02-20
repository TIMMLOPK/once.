import { SiAboutdotme } from "react-icons/si";
import { BsArrowBarRight } from "react-icons/bs";
import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import useScroll from "../utils/useScroll";

const NavItem = ({ children, id }) => {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <span
      className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
      onClick={() => {
        scrollTo(id);
      }}
    >
      {children}
    </span>
  );
};

const variants = {
  open: {
    x: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  closed: {
    x: 40,
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 100,
    },
  },
};

const Navbar = () => {
  const scrolled = useScroll();
  const [mounted, setMounted] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setShowNav(!scrolled);
  }, [scrolled]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed top-[27%] right-2 z-10"
      variants={variants}
      initial="closed"
      animate={showNav ? "open" : "closed"}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowNav(true)}
    >
      <div className="h-[340px] bg-black text-white rounded-md shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80 p-1 border dark:border-zinc-800">
        <div className="mt-6 flex flex-col items-center">
          <NavItem id="about">
            <SiAboutdotme />
          </NavItem>

          <div className="mt-8 text-xs">
            <NavItem id="lang">🔧</NavItem>
          </div>

          <div className="mt-8 text-xs">
            <NavItem id="projects">🗂️</NavItem>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <FiMoon /> : <FiSun />}
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowNav(!showNav)}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
              aria-label="Close"
            >
              <BsArrowBarRight />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
