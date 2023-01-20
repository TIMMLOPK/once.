import Image from "next/image";

const before =
  "before:absolute before:z-[-1] before:animate-rotate before:w-[200%] before:h-[200%] before:content-[''] before:bg-[conic-gradient(#00000080,#00000040,#00000030,#00000020,#00000010,#00000010,#00000080)]";
const after =
  "after:absolute after:z-[-1] after:inset-0 after:p-[1px] after:rounded-full after:bg-gradient-to-br after:from-startRgba after:to-endRgba after:content-[''] after:bg-clip-content";

const Icon = ({ src }) => {
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
