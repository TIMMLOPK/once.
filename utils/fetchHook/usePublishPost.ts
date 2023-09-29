import useSWRMutation from "swr/mutation";
import { PostData } from "../../types/postData";

export type PublishPostDataToSend = Omit<PostData, "id">;

async function publishPost(
  url: string,
  { arg }: { arg: PublishPostDataToSend },
) {
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      password: process.env.API_PASSWORD || "",
      "Content-Type": "application/json",
    },
  });

  const body = data.json();

  return body;
}
function usePublishPost() {
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/api/post",
    publishPost,
  );

  return {
    data,
    isError: error ? true : false,
    isMutating,
    trigger,
  };
}

export default usePublishPost;
