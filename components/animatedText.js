import { useState } from "react";
import { useRandomInterval, random } from "../utils/useRandomInterval";

const generateSparkle = (color) => {
  const sparkle = {
    id: random(10000, 99999),
    createdAt: Date.now(),
    size: random(10, 30),
    color,
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
    },
  };
  return sparkle;
};

const Sparkles = ({ children }) => {
  const [sparkles, setSparkles] = useState([]);

  useRandomInterval(
    () => {
      const sparkle = generateSparkle("hsl(50deg, 100%, 50%)");
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    600
  );

  return (
    <span className="inline-block relative">
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative z-[-1] font-bold">{children}</strong>
    </span>
  );
};
const Sparkle = ({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";
  return (
    <span className="sparkle-wrapper" style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        className="sparkle-svg"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;
