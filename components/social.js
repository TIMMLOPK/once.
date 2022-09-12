import NextLink from "next/link";

const Social = ({ icon, url, children, isLink }) => {
  return (
    <>
      {isLink ? (
        <NextLink href={url}>
          <button className="h-[42px] color-gray-500 rounded-full text-[16px] w-[211px] p-[18px] inline-flex items-center gap-[8px] hover:dark:bg-hoverbg hover:bg-hoverbg2">
            <span className="flex items-center justify-center h-[24px] w-[24px] rounded-full bg-[#F2F2F2] dark:bg-[#2D2D2D]">
              {icon}
            </span>
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
