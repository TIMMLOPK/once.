import Button from "../../../components/shared/button";
import { getAuthorIcon, getAuthorName } from "../../../utils/author";
import { useEditor, EditorContent } from "@tiptap/react";
import { StartKit } from "../../../utils/editor/extensions";
import Placeholder from "@tiptap/extension-placeholder";
import { useReducer, useCallback, useState } from "react";
import usePublishPost from "../../../utils/fetchHook/usePublishPost";
import useLogin from "../../../utils/fetchHook/useLogin";
import useSavePost from "../../../utils/fetchHook/useSavePost";
import useDebounce from "../../../utils/useDebounce";
import { Loading } from "../../shared/loading";
import { BubbleMenu } from "./bubbleMenu";

interface Post {
  title: string;
  description: string;
  coverImage: string;
  ogImageURL: string;
  content: string;
}

interface InfoAction {
  type:
    | "TITLE_CHANGED"
    | "DESCRIPTION_CHANGED"
    | "COVER_IMAGE_CHANGED"
    | "CLEAR"
    | "CONTENT_CHANGED";
  payload?: string;
}

function reducer(state: Post, action: InfoAction) {
  const { type, payload } = action;
  switch (type) {
    case "TITLE_CHANGED":
      return {
        ...state,
        title: payload,
      };
    case "DESCRIPTION_CHANGED":
      return {
        ...state,
        description: payload,
      };
    case "COVER_IMAGE_CHANGED":
      return {
        ...state,
        coverImage: payload,
        ogImageURL: payload,
      };
    case "CONTENT_CHANGED":
      return {
        ...state,
        content: payload,
      };
    case "CLEAR":
      return {
        ...state,
        title: "",
        description: "",
      };
    default:
      break;
  }
}

export default function Writing() {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    content: "",
    coverImage: "/card.png",
    ogImageURL: "/card.png",
  });
  const { data: session, isLoading } = useLogin();
  const [postID, setPostID] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { trigger, isError, isMutating, data } = usePublishPost();
  const {
    isError: isDraftError,
    data: draftData,
    isMutating: updating,
    trigger: saveDraft,
  } = useSavePost();
  const error =
    isError ||
    (data as any)?.error ||
    isDraftError ||
    (draftData as any)?.error;
  const isLoadingPost = isMutating || updating;

  const handleBlur = useCallback((field: string, e: any) => {
    if (field === "coverImage") {
      dispatch({
        type: "COVER_IMAGE_CHANGED",
        payload: e.currentTarget.textContent,
      });
    }

    if (field === "title") {
      dispatch({ type: "TITLE_CHANGED", payload: e.currentTarget.textContent });
    }

    if (field === "description") {
      dispatch({
        type: "DESCRIPTION_CHANGED",
        payload: e.currentTarget.textContent,
      });
    }
  }, []);

  const triggerData = {
    author: getAuthorName(session?.user.email),
    authorImage: getAuthorIcon(session?.user.email),
    date: new Date().toLocaleDateString(),
  };

  useDebounce(
    () => {
      if (postID === null && shouldUpdate) {
        console.log("publish");
        trigger({
          ...state,
          ...triggerData,
          published: false,
        }).then((res) => {
          setPostID(res?.id || null);
        });
      } else if (postID !== null && shouldUpdate) {
        console.log("save draft");
        saveDraft({
          ...state,
          ...triggerData,
          id: postID,
          published: false,
        });
      }
      console.log("debounce");
      console.log(postID);

      setShouldUpdate(false);
    },
    1000,
    shouldUpdate,
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl prose-headings:font-display focus:outline-none",
      },
    },
    extensions: [
      StartKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const regex = /<[^\/>][^>]*><\/[^>]+>/g;
      const contentWithoutEmptyTags = content.replace(regex, "");
      if (contentWithoutEmptyTags !== "") {
        dispatch({ type: "CONTENT_CHANGED", payload: contentWithoutEmptyTags });
      }
      setShouldUpdate(true);
    },
    autofocus: "end",
    editable: isLoadingPost ? false : true,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">
          Welcome Back {getAuthorName(session.user.email)}
        </h1>
        <h3 className="mt-4 bg-gradient-to-tr from-orange-400 to-orange-200 bg-clip-text text-2xl font-bold text-transparent">
          Let&apos;s start writing
        </h3>
      </div>
      <div className="my-14 space-y-2">
        <div className="flex items-center justify-between p-2">
          {error ? (
            <p className="text-red-500">
              {data?.error || draftData?.error || "Something went wrong"}
            </p>
          ) : (
            <p className="text-gray-500">
              {draftData?.success ? "Saved" : <Loading />}
            </p>
          )}
          <Button
            className="bg-slate-900 px-5 py-2 font-semibold dark:bg-[#f6f1e6] dark:text-black"
            onClick={() => {
              trigger({
                ...state,
                published: true,
                ...triggerData,
              }).then(() => {
                if (error) return;
                dispatch({ type: "CLEAR" });
                editor.commands.clearContent();
              });
            }}
            loading={isMutating}
          >
            Publish
          </Button>
        </div>
        <div className="relative min-h-[600px] w-full max-w-screen-lg p-12 px-8 dark:border-stone-600 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
          <h1
            className="text-left text-4xl font-bold text-neutral-800 focus:outline-none dark:text-neutral-200"
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => handleBlur("title", e)}
          >
            {state.title === "" ? "Untitled" : state.title}
          </h1>
          <p
            className="my-4 text-left text-base font-bold text-neutral-500 focus:outline-none dark:text-neutral-300 md:text-sm"
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => handleBlur("description", e)}
          >
            {state.description === ""
              ? "Give a brief description of your post here."
              : state.description}
          </p>
          <p className="my-4 text-sm font-bold text-neutral-500 dark:text-neutral-300">
            {new Date().toLocaleDateString()}
          </p>
          {editor ? (
            <div
              onClick={() => {
                editor.chain().focus().run();
              }}
            >
              <EditorContent editor={editor} />
              <BubbleMenu editor={editor} />
            </div>
          ) : (
            <div className="container mx-auto flex max-w-4xl justify-center p-8">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
