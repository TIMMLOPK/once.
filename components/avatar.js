import Image from "next/image";

const Icon = ({ src }) => {
  const before =
    "before:absolute before:z-[-1] before:animate-rotate before:w-[200%] before:h-[200%] before:content-[''] before:bg-[conic-gradient(#00000080,#00000040,#00000030,#00000020,#00000010,#00000010,#00000080)] dark:before:bg-[conic-gradient(#ffffff80,#ffffff40,#ffffff30,#ffffff20,#ffffff10,#ffffff10,#ffffff80)]";
  const after =
    "after:absolute after:z-[-1] after:inset-0 after:p-[1px] after:rounded-full after:bg-gradient-to-br after:from-startRgba after:to-endRgba after:content-[''] after:bg-clip-content dark:after:from-startRgbaDark dark:after:to-endRgbaDark";
  return (
    <div
      className={`relative flex justify-center w-[240px] h-[240px] items-center rounded-full overflow-hidden shadow-logo ${after} ${before}`}
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
