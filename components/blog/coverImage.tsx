import Image from "next/image";
import Link from "next/link";

const CoverImage = ({
  title,
  src,
  id,
}: {
  title: string;
  src: string;
  id?: number;
}) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className="w-full rounded-md border shadow-small transition-shadow duration-300 hover:shadow-medium dark:border-zinc-700"
      width={600}
      height={400}
    />
  );

  return (
    <div className="sm:mx-0">
      {id !== undefined ? (
        <Link as={`/blog/${id}`} href="/blog/[id]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
