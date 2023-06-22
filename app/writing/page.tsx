"use client";

import { useReducer, Suspense, useCallback } from "react";
import Table from "../../components/blog/writing/table";
import usePublishPost from "../../utils/dataHook/usePublishPost";
import { getAuthorIcon, getAuthorName } from "../../utils/author";
import * as Tabs from "@radix-ui/react-tabs";
import { Loading } from "../../components/shared/loading";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "../../components/blog/writing/bubbleMenu";
import { StartKit } from "../../utils/editor/extensions";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "../../components/shared/button";
import useSavePost from "../../utils/dataHook/useSavePost";
import useLogin from "../../utils/dataHook/useLogin";

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
  // const [postID, setPostID] = useState(0);
  const { trigger, isError, isMutating, data } = usePublishPost();
  const { isError: isDraftError, data: draftData } = useSavePost();
  const error =
    isError ||
    (data as any)?.error ||
    isDraftError ||
    (draftData as any)?.error;

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
    title: state.title,
    content: state.content,
    author: getAuthorName(session?.user.email),
    authorImage: getAuthorIcon(session?.user.email),
    description: state.description,
    coverImage: state.coverImage,
    date: new Date().toLocaleDateString(),
    ogImageURL: state.ogImageURL,
  };

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

      // if (postID === 0) {
      //   saveDraft({
      //     ...triggerData,
      //     published: false,
      //   }).then((res) => {
      //     setPostID(res?.id || 0);
      //   });
      // }
    },
    autofocus: "end",
  });

  if (!session || isLoading) {
    return (
      <div className="container mx-auto flex max-w-4xl justify-center p-8">
        <Loading />
      </div>
    );
  }

  return (
    <Tabs.Root
      className="container mx-auto max-w-4xl p-8"
      defaultValue="writing"
    >
      <Tabs.List className="mb-8 flex gap-4">
        <Tabs.Trigger
          className="rounded-md px-4 py-2 text-lg font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:hover:bg-hover dark:hover:text-gray-300"
          value="writing"
        >
          Writing
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-md px-4 py-2 text-lg font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:hover:bg-hover dark:hover:text-gray-300"
          value="posts"
        >
          Posts
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="writing">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">
            Welcome Back {getAuthorName(session.user.email)}
          </h1>
          <h3 className="mt-4 bg-gradient-to-tr from-sky-400 to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
            Let&apos;s start writing
          </h3>
        </div>
        <div className="my-14">
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
              className="bg-slate-900 dark:bg-[#f6f1e6] dark:text-black"
              onClick={() => {
                trigger({
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
          <div className="relative min-h-[600px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
            <h1
              className="text-left text-4xl font-bold text-neutral-800 focus:outline-none"
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
            <p className="my-4 text-sm font-bold text-gray-500 dark:text-gray-300">
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
      </Tabs.Content>
      <Tabs.Content value="posts">
        <Suspense>
          <Table />
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
}
