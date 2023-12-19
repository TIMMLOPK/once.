import useSWRMutation from "swr/mutation";
import { PostData } from "../types";

export type SavePostDataToSend = PostData & { published: false };

async function savePost(url: string, { arg }: { arg: SavePostDataToSend }) {
  const data = await fetch(url + "?id=" + arg.id, {
    method: "PUT",
    body: JSON.stringify(arg),
  });

  const body = data.json();

  return body;
}

export function useSavePost() {
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/api/post",
    savePost,
  );

  return {
    data,
    isError: error ? true : false,
    isMutating,
    trigger,
  };
}
