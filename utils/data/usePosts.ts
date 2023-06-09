import useSWR from "swr";
import { fetcher } from "../fetcher";

function usePosts() {
  const { data, error, isLoading } = useSWR(`/api/posts`, fetcher);

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  };
}

export default usePosts;
