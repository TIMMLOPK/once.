"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import { usePathname, useRouter } from "next/navigation";
import ToolTip from "./shared/tooltip";

const NavItem = ({ children, id }) => {
  const router = useRouter();
  const pathName = usePathname();
  const scrollTo = useCallback((id: string) => {
    if (pathName === "/") {
      const el = document.getElementById(id.toLowerCase());
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id.toLowerCase()}`);

      setTimeout(() => {
        const el = document.getElementById(id.toLowerCase());
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [pathName, router]);

  return (
    <ToolTip text={id} position="left">
      <button
        onClick={() => scrollTo(id)}
        className="flex cursor-pointer items-center justify-center rounded-full p-2 text-sm hover:bg-hover"
      >
        {children}
      </button>
    </ToolTip>
  );
};

const Emoji = {
  About: "🏡",
  Tech: "🔧",
  Projects: "🗂️",
  Blog: "📝",
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
      <div className="flex flex-col items-center space-y-6 pt-3">
        {Object.keys(Emoji).map((key, index) => (
          <NavItem id={key} key={index}>
            {Emoji[key]}
          </NavItem>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center border-t border-slate-600 pt-6 dark:border-slate-800">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-sm hover:bg-hover"
        >
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </m.nav>
  );
};

export default Navbar;
