const LangBox = ({ icon, name }) => {
  return (
    <>
      <div className="text-md text-gray-900 dark:text-white inline-flex place-items-center mt-6 md:0">
        <span className="flex justify-center items-center w-11 h-11 mr-3 rounded-full dark:bg-[#141517] dark:border-t dark:border-slate-700">
          <span className="w-4">{icon}</span>
        </span>
        <span className="ml-2">{name}</span>
      </div>
    </>
  );
};

export default LangBox;
