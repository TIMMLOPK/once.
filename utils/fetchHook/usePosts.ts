import useSWR from "swr";
import { fetcher } from "../fetcher";
import { PostData } from "../../types/postData";

export function usePosts(): {
  posts: PostData[];
  isLoading: boolean;
  isError: any;
} {
  const { data, error, isLoading } = useSWR("/api/posts", fetcher);

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  };
}
