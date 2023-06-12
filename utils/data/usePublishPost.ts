import useSWRMutation from "swr/mutation";
import { PostData } from "../api";

export type PublishPostDataToSend = Omit<PostData, "id"> & { published: true };

async function publishPost(
  url: string,
  { arg }: { arg: PublishPostDataToSend }
) {
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  const body = data.json();

  return body;
}
function usePublishPost() {
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/api/post",
    publishPost
  );

  return {
    data,
    isError: error,
    isMutating,
    trigger,
  };
}

export default usePublishPost;
