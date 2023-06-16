import { BsMarkdownFill } from "react-icons/bs";
import { getAuthorIcon, getAuthorName } from "../../../utils/author";
import Button from "../../shared/button";
import PreviewWindow from "./writingPreview";

const WritingSection = ({
  session,
  state,
  dispatch,
  content,
  setContent,
  markdown,
  preview,
  publishHook,
}) => {
  const { data, isMutating, isError, trigger } = publishHook;
  return (
    <>
      <PreviewWindow
        title={state.title}
        markdown={markdown}
        description={state.description}
      />
      <div className="relative mb-10">
        <p className="mb-2 text-xs text-gray-500 dark:text-gray-100 md:text-sm">
          Tell some informations about this post
        </p>
        <input
          className="mb-2 h-12 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-indigo-500 dark:text-white placeholder:dark:text-white"
          type="text"
          placeholder="Give me a Title"
          onChange={(e) =>
            dispatch({ type: "TITLE_CHANGED", payload: e.target.value })
          }
          value={state.title}
        />
        <input
          className="mb-2 h-12 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-indigo-500 dark:text-white placeholder:dark:text-white"
          type="text"
          placeholder="A eye-catching description"
          onChange={(e) =>
            dispatch({ type: "DESCRIPTION_CHANGED", payload: e.target.value })
          }
          value={state.description}
        />
        <input
          className="mb-2 h-12 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-indigo-500 dark:text-white placeholder:dark:text-white"
          type="url"
          placeholder="A beautiful picture to display"
          onChange={(e) =>
            dispatch({ type: "COVER_IMAGE_CHANGED", payload: e.target.value })
          }
          value={state.coverImage}
        />
        <hr className="my-4" />
        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-100 md:text-sm">
          <BsMarkdownFill className="mx-2" />
          Markdown syntax supported
        </span>
        <textarea
          className="h-64 w-full rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-500 focus:outline-indigo-500 dark:text-white placeholder:dark:text-white"
          placeholder="# Write down your ideas...✨"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        {isError ||
          (data && !data.success && (
            <div className="w-full rounded-md bg-red-500 p-4 text-white">
              {data.error}
            </div>
          ))}
        <div className="flex justify-end space-x-4">
          <Button
            className="bg-green-500"
            onClick={() => {
              trigger({
                title: state.title,
                content,
                author: getAuthorName(session.user.email),
                authorImage: getAuthorIcon(session.user.email),
                description: state.description,
                coverImage: state.coverImage,
                published: true,
                date: new Date().toLocaleDateString(),
                ogImageURL: state.ogImageURL,
              });
              setContent("");
              dispatch({ type: "CLEAR" });
            }}
            loading={isMutating}
          >
            Publish
          </Button>
          <Button
            className="bg-transparent text-blue-500 shadow-none"
            onClick={preview}
          >
            Preview
          </Button>
        </div>
      </div>
    </>
  );
};

export default WritingSection;
