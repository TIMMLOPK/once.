import useSWR from "swr";
import { fetcher } from "../fetcher";
import { PostData } from "../api";

function usePosts() : { posts: PostData[], isLoading: boolean, isError: any } {
  const { data, error, isLoading } = useSWR(`/api/posts`, fetcher);

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  };
}

export default usePosts;
