import Image from "next/image";

const Avatar = ({ name = "Timmy", picture = "/icon.webp" }) => {
  return (
    <div className="flex items-center">
      <div className="relative mr-2 h-8 w-8">
        <Image
          src={picture}
          className="rounded-full"
          height={48}
          width={48}
          alt={name}
        />
      </div>
      <div className="text-sm font-semibold">{name}</div>
    </div>
  );
};

export default Avatar;
