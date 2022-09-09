const Tooltip = ({ message, children }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute right-10 flex-col items-center hidden group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
