import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";

const NavItem = ({ children, id }) => {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <span
      className="flex cursor-pointer items-center justify-center rounded-full p-2 text-sm hover:bg-hover"
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
      className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover"
    >
      {children}
    </button>
  );
};

const Emoji = {
  about: "🏡",
  tech: "🔧",
  projects: "🗂️",
};

const SectionController = () => {
  return (
    <m.div className="flex flex-col items-center space-y-6 pt-3">
      {Object.keys(Emoji).map((key, index) => (
        <NavItem id={key} key={index}>
          {Emoji[key]}
        </NavItem>
      ))}
    </m.div>
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
  const [showNav, setShowNav] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const scrolled = useScroll();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (scrolled) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [scrolled]);

  if (!mounted) return null;

  return (
    <m.nav
      className="fixed top-[27%] right-2 z-10 h-[270px] rounded-lg border bg-black bg-opacity-80 p-1 text-white shadow-lg backdrop-blur-lg backdrop-filter dark:border-zinc-800"
      variants={variants}
      initial="closed"
      animate={showNav ? "open" : "closed"}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowNav(true)}
    >
      <SectionController />
      <div className="mt-6 space-y-6 border-t border-slate-600 pt-6 dark:border-slate-800">
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </Button>
      </div>
    </m.nav>
  );
};

export default Navbar;
