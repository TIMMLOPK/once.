import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ icon, name, description }) => {
  const [showsescr, setshowDe] = useState(false);
  return (
    <motion.div
      className="p-4 max-w-sm rounded-full flex items-center space-x-2 dark:text-white dark:hover:bg-wbg"
      animate={{ scale: showsescr ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setshowDe(true)}
      onHoverEnd={() => setshowDe(false)}
      onClick={() => setshowDe(!showsescr)}
    >
      <div className="text-md text-gray-900 dark:text-white inline-flex place-items-center">
        {icon}
        <span className="ml-2">{name}</span>
      </div>
      <motion.div
        animate={{ opacity: showsescr ? 1 : 0 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
        whileTap={{ scale: 1.2 }}
      >
        <p className="text-slate-500 dark:text-gray-400 text-sm">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Card;
