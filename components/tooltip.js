import { motion } from "framer-motion";
import { useState } from "react";

function transformTocss(input) {
  switch (input) {
    case "top":
      return "top-2";
    case "bottom":
      return "bottom-6";
    case "left":
      return "left-7 top-0";
    case "right":
      return "right-2 top-0";
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
      <motion.p
        className={`absolute ${transformTocss(position)} ${
          isHovered ? "z-[999]" : "-z-1"
        } p-[8px] w-[100px] h-[25px] bg-black flex items-center justify-center text-gray-100 text-[10px] rounded-full backdrop-filter 
        backdrop-blur-lg bg-opacity-80`}
        initial="hidden"
        transition={{ duration: 0.3, easings: "easeInOut" }}
        exit={{ opacity: 0, y: 10 }}
        animate={isHovered ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
      >
        {text}
      </motion.p>
    </div>
  );
};
