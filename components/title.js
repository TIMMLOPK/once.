const Title = ({ children }) => {
  const gradientLabelBefore =
    "before:absolute before:z-10 before:rounded-full before:border-transparent before:box-border before:border-4 before:lg:border-4 before:bg-clip-border";

  const gradientLabelAfter =
    "after:absolute after:z-10 after:inset-0 after:rounded-full after:border-transparent after:box-border after:border-4 after:bg-white after:dark:bg-[#121212] after:lg:border-4 after:bg-clip-content";
  return (
    <div
      className={`relative w-24 rounded-full border-0 bg-gradient-to-r from-[#002585] to-[#209DEE] bg-no-repeat py-2 md:w-36 md:py-2 ${gradientLabelBefore} ${gradientLabelAfter} mb-8`}
    >
      <span className="relative z-20 block bg-inherit bg-clip-text text-center text-lg font-semibold leading-tight text-transparent md:text-[1.75rem]">
        {children}
      </span>
    </div>
  );
};

export default Title;
