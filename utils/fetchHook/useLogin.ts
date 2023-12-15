import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useLogin(): { data: any; isLoading: boolean; isError: any } {
  const { data, error, isLoading } = useSWR(`/api/session`, fetcher);

  return {
    data: data?.session,
    isLoading,
    isError: error,
  };
}
