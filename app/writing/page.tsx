"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("../../components/blog/writing/postsTable"));
const Editor = dynamic(() => import("../../components/blog/writing/editor"));

export default function Writing() {
  const [active, setActive] = useState("writing");

  return (
    <Tabs.Root
      className="container mx-auto max-w-4xl p-8"
      defaultValue="writing"
      onValueChange={(value) => setActive(value)}
    >
      <Tabs.List className="mb-8 flex gap-4">
        <Tabs.Trigger
          className="rounded-md px-4 py-2 text-lg font-bold text-gray-500 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 data-[state=active]:dark:text-gray-800"
          value="writing"
        >
          Writing
        </Tabs.Trigger>
        <Tabs.Trigger
          className="rounded-md px-4 py-2 text-lg font-bold text-gray-500 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 data-[state=active]:dark:text-gray-800"
          value="posts"
        >
          Posts
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="writing">
        {active === "writing" && <Editor />}
      </Tabs.Content>
      <Tabs.Content value="posts">
        {active === "posts" && <Table />}
      </Tabs.Content>
    </Tabs.Root>
  );
}
