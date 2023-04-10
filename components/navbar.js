import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import { useRouter } from "next/router";
import { ToolTip } from "./tooltip";
import { cn } from "../utils/cn";

const NavItem = ({ children, id }) => {
  const router = useRouter();
  const scrollTo = useCallback((id) => {
    if (router.pathname === "/") {
      const el = document.getElementById(id.toLowerCase());
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }, []);

  return (
    <ToolTip text={id} position="left" tigger="hover">
      <Button onClick={() => scrollTo(id)}>{children}</Button>
    </ToolTip>
  );
};

const Button = ({ children, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className={
        cn(
          "flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover",
          size === "md" ? "text-md" : "text-sm"
        )
      }
    >
      {children}
    </button>
  );
};

const Emoji = {
  About: "🏡",
  Tech: "🔧",
  Projects: "🗂️",
  Blog: "📝",
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
      className="fixed right-2 top-[25%] z-10 h-[330px] rounded-lg border bg-black bg-opacity-80 p-1 text-white shadow-lg backdrop-blur-lg backdrop-filter dark:border-zinc-800"
      variants={variants}
      initial="closed"
      animate={showNav ? "open" : "closed"}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowNav(true)}
    >
      <SectionController />
      <div className="mt-6 flex flex-col items-center border-t border-slate-600 pt-6 dark:border-slate-800 ">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          size="md"
        >
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </Button>
      </div>
    </m.nav>
  );
};

export default Navbar;
