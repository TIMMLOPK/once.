import { m } from "framer-motion";
import { useState } from "react";
import { cn } from "../utils/cn";

function transformTocss(input) {
  switch (input) {
    case "top":
      return "top-2";
    case "bottom":
      return "bottom-6";
    case "left":
      return "right-7 top-1 mr-4";
    case "right":
      return "left-7 -top-1";
    default:
      return "top-2";
  }
}

export const ToolTip = ({ children, text, position, tigger = "hover" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (tigger === "click") {
      setIsHovered(!isHovered);
    }
  };

  const handleMouseEnter = () => {
    if (tigger === "hover") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (tigger === "hover") {
      setIsHovered(false);
    }
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleClick()}
      >
        {children}
      </div>
      <m.p
        className={cn(
          "absolute flex h-7 w-24 items-center justify-center rounded-full bg-black p-2 text-xs text-gray-100 opacity-30 backdrop-blur-lg backdrop-filter",
          transformTocss(position),
          isHovered ? "z-[999]" : "-z-1"
        )}
        initial="hidden"
        transition={{ duration: 0.2, easings: "easeInOut", delay: 0.2 }}
        exit={{ opacity: 0, y: 10 }}
        animate={isHovered ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
      >
        {text}
      </m.p>
    </div>
  );
};
