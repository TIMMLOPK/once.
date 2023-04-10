import Image from "next/image";
import Avatar from "./avatar";

const PostTitle = ({ children }) => {
  return (
    <h1 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-4xl md:leading-none">
      {children}
    </h1>
  );
};

const PostHeader = ({ title, coverImage, date }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-12 md:mt-8 md:block">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          width={2000}
          height={1000}
          className="rounded-lg shadow-small"
        />
      </div>
      <div className="mb-16 text-center md:mb-10 md:px-4">
        <Avatar name="Timmy" picture="/icon.webp" />
        <h4 className="mb-4 mt-4 text-left text-lg">{date}</h4>
      </div>
    </>
  );
};

export default PostHeader;
