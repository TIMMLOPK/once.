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
      className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg text-sm"
      onClick={() => {
        scrollTo(id);
      }}
    >
      {children}
    </span>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
    >
      {children}
    </button>
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
      <div className="h-[325px] bg-black text-white rounded-md shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80 p-1 border dark:border-zinc-800">
        <div className="flex flex-col items-center space-y-6 pt-3">
          <NavItem id="about">🏡</NavItem>
          <NavItem id="tech">🔧</NavItem>
          <NavItem id="projects">🗂️</NavItem>
          <div className="mt-6 pt-6 border-t border-slate-600 dark:border-slate-800 space-y-6">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <FiMoon /> : <FiSun />}
            </Button>

            <Button onClick={() => setShowNav(!showNav)}>
              <BsArrowBarRight />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
