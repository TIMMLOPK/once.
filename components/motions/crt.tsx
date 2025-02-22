import { motion } from "motion/react";
import { useTheme } from "next-themes";

const CRTEffect = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  // Adjust flicker opacity based on theme
  const flickerVariants = {
    animate: {
      opacity: [
        0.27861, 0.34769, 0.23604, 0.90626, 0.18128, 0.83891, 0.65583, 0.67807,
        0.26559, 0.84693, 0.96019, 0.08594, 0.20313, 0.71988, 0.53455, 0.37288,
        0.71428, 0.70419, 0.7003, 0.36108, 0.24387,
      ].map((value) => (theme === "light" ? value * 0.5 : value)),
      transition: {
        duration: 0.15,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
      },
    },
  };

  const textShadowVariants = {
    animate: {
      textShadow:
        theme === "light"
          ? [
              "0.439px 0 1px rgba(0,30,255,0.3), -0.439px 0 1px rgba(255,0,80,0.2), 0 0 2px",
              "2.793px 0 1px rgba(0,30,255,0.3), -2.793px 0 1px rgba(255,0,80,0.2), 0 0 2px",
              "2.621px 0 1px rgba(0,30,255,0.3), -2.621px 0 1px rgba(255,0,80,0.2), 0 0 2px",
            ]
          : [
              "0.439px 0 1px rgba(0,30,255,0.5), -0.439px 0 1px rgba(255,0,80,0.3), 0 0 3px",
              "2.793px 0 1px rgba(0,30,255,0.5), -2.793px 0 1px rgba(255,0,80,0.3), 0 0 3px",
              "2.621px 0 1px rgba(0,30,255,0.5), -2.621px 0 1px rgba(255,0,80,0.3), 0 0 3px",
            ],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="crt-container"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scan lines */}
      <motion.div
        className="scanlines"
        initial={{
          background: `linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, ${theme === "light" ? "0.15" : "0.25"}) 50%
          )`,
          backgroundSize: "100% 2px",
        }}
        animate={{
          background: [
            `linear-gradient(
              rgba(18, 16, 16, 0) 50%,
              rgba(0, 0, 0, ${theme === "light" ? "0.15" : "0.25"}) 50%
            )`,
            `linear-gradient(
              rgba(18, 16, 16, 0) 52%,
              rgba(0, 0, 0, ${theme === "light" ? "0.15" : "0.25"}) 48%
            )`,
          ],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* RGB mask with adjusted opacity for light theme */}
      <motion.div
        className="rgb-mask"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            90deg,
            rgba(255, 0, 0, ${theme === "light" ? "0.03" : "0.06"}),
            rgba(0, 255, 0, ${theme === "light" ? "0.01" : "0.02"}),
            rgba(0, 0, 255, ${theme === "light" ? "0.03" : "0.06"})
          )`,
          backgroundSize: "3px 100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Flicker overlay */}
      <motion.div
        className="flicker-overlay"
        variants={flickerVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme === "light"
              ? "rgba(18, 16, 16, 0.05)"
              : "rgba(18, 16, 16, 0.1)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Content with text effect */}
      <motion.div
        variants={textShadowVariants}
        animate="animate"
        style={{
          position: "relative",
          zIndex: 1,
          filter:
            theme === "light"
              ? "contrast(1.05) brightness(0.95)"
              : "contrast(1.1) brightness(0.9)",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { CRTEffect };
