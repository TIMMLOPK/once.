import useSWR from "swr";
import { fetcher } from "../fetcher";
import { ReturnData } from "../api";

function usePosts(): { posts: ReturnData[]; isLoading: boolean; isError: any } {
  const { data, error, isLoading } = useSWR(`/api/posts`, fetcher);

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  };
}

export default usePosts;
