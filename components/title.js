const gradientLabelBefore =
  "before:absolute before:z-10 before:inset-0 before:rounded-full before:border-transparent before:box-border before:border-[3px] before:lg:border-4 before:bg-clip-border before:content-['']";

const gradientLabelAfter =
  "after:absolute after:z-10 after:inset-0 after:rounded-full after:border-transparent after:box-border after:border-[3px] after:bg-white after:dark:bg-[#121212] after:lg:border-4 after:bg-clip-content after:content-['']";
const Title = ({ children }) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#002585] to-[#209DEE] bg-no-repeat rounded-full relative border-0 py-2 w-24 md:py-2 md:w-36 ${gradientLabelBefore} ${gradientLabelAfter} mb-8`}
    >
      <span className="relative block z-20 text-transparent font-semibold leading-tight text-center text-lg md:text-[1.75rem] bg-clip-text bg-inherit">
        {children}
      </span>
    </div>
  );
};

export default Title;
