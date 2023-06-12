const PreviewWindow = ({ title, markdown, description }) => {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 shadow-small dark:border-gray-700 dark:bg-gray-800">
      <h1 className="m-4 p-4 text-left text-xl font-bold">
        You are <span className="text-blue-600">writing</span> now
      </h1>
      <hr />
      <div className="trasnform m-4 max-h-96 overflow-y-auto p-4 transition-all duration-500">
        {title !== "" ? (
          <h1 className="text-left text-xl font-bold">{title}</h1>
        ) : (
          <h1 className="text-left text-xl font-bold">Untitled</h1>
        )}
        {description !== "" ? (
          <p className="mt-2 text-left text-xs font-bold text-neutral-500 dark:text-neutral-300 md:text-sm">
            {description}
          </p>
        ) : (
          <p className="mt-2 text-left text-xs font-bold text-neutral-500 dark:text-neutral-300 md:text-sm">
            The writer is too lazy. No description here
          </p>
        )}
        <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-300">
          {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-slate dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
          {markdown !== "" ? (
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;
