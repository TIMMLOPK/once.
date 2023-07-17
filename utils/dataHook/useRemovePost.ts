import useSWRMutation from "swr/mutation";

async function removePost(url: string, { arg }: { arg: number }) {
  await fetch(`${url}?id=${arg}`, {
    method: "DELETE",
  });
}

function useRemovePost() {
  const { data, error, trigger, isMutating } = useSWRMutation(
    "/api/post",
    removePost,
  );

  return {
    data,
    isError: error,
    isMutating,
    trigger,
  };
}

export default useRemovePost;
