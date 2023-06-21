import StarterKit from "@tiptap/starter-kit";

export const StartKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: "list-disc list-outside leading-3",
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: "list-decimal list-outside leading-3",
    },
  },
  listItem: {
    HTMLAttributes: {
      class: "leading-normal",
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: "border-l-4 border-gray-300 pl-4",
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: "rounded-md bg-gray-200 p-5 font-mono font-medium text-gray-800",
    },
  },
  code: {
    HTMLAttributes: {
      class:
        "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-black",
    },
  },
});
