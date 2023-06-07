import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoverImage = ({
  title,
  src,
  slug,
}: {
  title: string;
  src: string;
  slug?: string;
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
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
