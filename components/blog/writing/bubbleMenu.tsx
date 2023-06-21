"use client";

import { BubbleMenu as Menu, BubbleMenuProps } from "@tiptap/react";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuList,
  LuListOrdered,
  LuText,
  LuBold,
  LuCode,
  LuItalic,
  LuStrikethrough,
} from "react-icons/lu";
import { cn } from "../../../utils/cn";

export const BubbleMenu = ({ editor }: Omit<BubbleMenuProps, "children">) => {
  const menuItem = [
    {
      name: "Text",
      icon: LuText,
      command: () => editor.chain().focus().setParagraph().run(),
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: LuHeading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: LuHeading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: LuHeading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Bullet List",
      icon: LuList,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: LuListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "bold",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: LuBold,
    },
    {
      name: "italic",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: LuItalic,
    },
    {
      name: "strike",
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: LuStrikethrough,
    },
    {
      name: "code",
      isActive: () => editor.isActive("code"),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: LuCode,
    },
  ];

  return (
    <Menu
      editor={editor}
      tippyOptions={{
        moveTransition: "transform 0.15s ease-out",
      }}
      className="flex overflow-hidden rounded-md border border-stone-300 bg-white shadow-xl"
    >
      {menuItem.map((item, index) => (
        <button
          key={index}
          onClick={item.command}
          className="p-2 text-gray-600 hover:bg-stone-100 active:bg-stone-200"
        >
          <item.icon
            className={cn("h-4 w-4", item.isActive() && "text-blue-500")}
          />
        </button>
      ))}
    </Menu>
  );
};
