import { cn } from "../utils/cn";

const Title = ({ children }) => {
  return (
    <div
      className={cn(
        "before:absolute before:z-10 before:box-border before:rounded-full before:border-4 before:border-transparent before:bg-clip-border before:lg:border-4",
        "after:absolute after:inset-0 after:z-10 after:box-border after:rounded-full after:border-4 after:border-transparent after:bg-white after:bg-clip-content after:dark:bg-black after:lg:border-4",
        "relative mb-8 w-24 rounded-full border-0 bg-gradient-to-r from-[#002585] to-[#209DEE] bg-no-repeat py-2 md:w-36 md:py-2"
      )}
    >
      <span className="relative z-20 block bg-inherit bg-clip-text text-center text-lg font-semibold leading-tight text-transparent md:text-[1.75rem]">
        {children}
      </span>
    </div>
  );
};

export default Title;
