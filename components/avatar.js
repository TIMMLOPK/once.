import Image from "next/image";
import { cn } from "../utils/cn";

const Icon = ({ src }) => {
  return (
    <div
      className={cn(
        "relative flex h-[240px] w-[240px] items-center justify-center overflow-hidden rounded-full shadow-logo",
        "after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-gradient-to-br after:from-white/60 after:to-white after:bg-clip-content after:p-px dark:after:from-black/60 dark:after:to-black",
        "before:absolute before:-z-10 before:h-full before:w-full before:animate-rotate before:bg-[conic-gradient(#00000080,#00000040,#00000030,#00000020,#00000010,#00000010,#00000080)] dark:before:bg-[conic-gradient(#ffffff80,#ffffff40,#ffffff30,#ffffff20,#ffffff10,#ffffff10,#ffffff80)]"
      )}
      style={{ transform: "translateZ(0)" }}
    >
      <Image
        src={src}
        alt="Picture of the author"
        width={220}
        height={220}
        priority
        className="rounded-full"
      />
    </div>
  );
};

export default Icon;
