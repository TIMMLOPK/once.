import Link from "next/link";
import CoverImage from "./coverImage";
import Avatar from "./avatar";

const HighlightPost = ({ slug, title, coverImage, date, description }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <CoverImage title={title} src={coverImage} slug={slug} />
      <div className="flex w-full flex-col justify-between lg:col-span-5">
        <div className="flex h-full flex-col justify-between">
          <h1 className="mt-4 text-3xl font-bold leading-snug md:mt-0">
            {slug ? (
              <Link
                as={`/blog/${slug}`}
                href="/blog/[slug]"
                className="hover:underline"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h1>
          <div className="mt-5 flex flex-col justify-between">
            <p className="mb-4 text-lg leading-relaxed">{description}</p>
            <div className="flex items-center">
              <Avatar name="Timmy" picture="/icon.webp" />
              <div className="ml-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightPost;
