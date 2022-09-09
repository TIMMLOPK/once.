import NextLink from "next/link";

const Social = ({ icon, url, children, isLink }) => {
  return (
    <>
      {isLink ? (
        <NextLink href={url}>
          <button className="h-[40px] color-gray-500 rounded-full text-[14px] w-[177px] p-[12px] inline-flex items-center gap-[8px] hover:dark:bg-hoverbg hover:bg-hoverbg2">
            {icon}
            {children}
          </button>
        </NextLink>
      ) : (
        <button className="h-[40px] color-gray-500 rounded-full text-[14px] w-[177px] p-[12px] inline-flex items-center gap-[8px] hover:dark:bg-hoverbg hover:bg-hoverbg2">
          {icon}
          {children}
        </button>
      )}
    </>
  );
};

export default Social;
