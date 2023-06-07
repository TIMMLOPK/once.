"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import { usePathname, useRouter } from "next/navigation";
import ToolTip from "./shared/tooltip";
import { cn } from "../utils/cn";

const NavItem = ({ children, id }) => {
  const router = useRouter();
  const pathName = usePathname();
  const scrollTo = useCallback(
    (id: string) => {
      if (pathName !== "/") {
        router.push(`/#${id.toLowerCase()}`);
      }

      const el = document.getElementById(id.toLowerCase());

      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
    },
    [pathName, router]
  );

  return (
    <ToolTip text={id} position="top" hideArrow offset={10}>
      <button
        onClick={() => scrollTo(id)}
        className="flex cursor-pointer items-center justify-center rounded-full border border-transparent p-1 text-base transition hover:bg-hover dark:hover:border-zinc-800"
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
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  closed: {
    y: 45,
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
    setShowNav(!scrolled);
  }, [scrolled]);

  if (!mounted) return null;

  return (
    <m.nav
      className={cn(
        "rounded-full border",
        "border border-solid border-navbar bg-navbar p-2 shadow-navbar backdrop-blur-[16px] dark:border-zinc-700 dark:bg-navbarDark"
      )}
      variants={variants}
      initial="closed"
      animate={showNav ? "open" : "closed"}
      transition={{ duration: 2 }}
      onMouseEnter={() => setShowNav(true)}
    >
      <div className="flex flex-row items-center space-x-6">
        {Object.keys(Emoji).map((key, index) => (
          <NavItem id={key} key={index}>
            {Emoji[key]}
          </NavItem>
        ))}
        <div className="-ml-4 border-l border-slate-500 dark:border-slate-600">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mx-2 flex cursor-pointer items-center justify-center rounded-full border border-transparent p-1 text-base text-white transition hover:bg-hover dark:hover:border-slate-500"
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </m.nav>
  );
};

export default Navbar;
