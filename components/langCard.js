import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ icons, name, description }) => {
  const [showsescr, setshowDe] = useState(false);
  return (
    <div
      className={`p-4 max-w-sm mx-auto rounded-full flex items-center space-x-4 min-h-full dark:text-white dark:hover:bg-wbg hover:opacity-75 ${
        showsescr ? "transform scale-110" : ""
      }`}
      onClick={() => setshowDe(!showsescr)}
    >
      <div className="text-sm font-medium text-gray-900 dark:text-white flex">
        <span className="flex items-center">{icons}</span>
        <span className="ml-2">{name}</span>
      </div>
      <motion.div
        animate={{ opacity: showsescr ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-slate-500 dark:text-gray-400 text-sm">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

export default Card;
