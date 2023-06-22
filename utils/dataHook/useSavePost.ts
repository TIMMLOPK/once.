import useSWRMutation from "swr/mutation";
import { PostData } from "../api";

export type SavePostDataToSend = Omit<PostData, "id"> & { published: false };

async function publishPost(url: string, { arg }: { arg: SavePostDataToSend }) {
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  const body = data.json();

  return body;
}

function useSavePost() {
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/api/post",
    publishPost
  );

  return {
    data,
    isError: error ? true : false,
    isMutating,
    trigger,
  };
}

export default useSavePost;
