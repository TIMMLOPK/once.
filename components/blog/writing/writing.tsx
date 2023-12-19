"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import Editor from "./editor";
import Table from "./postsTable";
import { PostData, ServerActionResult } from "../../../utils/types";
import { Session } from "next-auth";

interface WritingProps {
    user: Session["user"];
    posts: PostData[];
    // eslint-disable-next-line no-unused-vars
    deletePost: (id: number) => ServerActionResult<void>;
}

export default function Writing({ user, posts, deletePost }: WritingProps) {
  const [active, setActive] = useState("writing");

  return (
    <div className="min-h-screen">
      <Tabs.Root
        className="mx-auto max-w-4xl p-8"
        defaultValue="writing"
        onValueChange={(value) => setActive(value)}
      >
        <Tabs.List className="mb-8 flex gap-4">
          <Tabs.Trigger
            className="rounded-md px-4 py-2 text-xl font-bold text-gray-500 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 data-[state=active]:dark:text-gray-800"
            value="writing"
          >
            Writing
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded-md px-4 py-2 text-xl font-bold text-gray-500 hover:text-gray-700 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 data-[state=active]:dark:text-gray-800"
            value="posts"
          >
            Posts
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="writing">
          {active === "writing" && <Editor user={user}/>}
        </Tabs.Content>
        <Tabs.Content value="posts">
          {active === "posts" && <Table posts={posts} deletePost={deletePost} />}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
