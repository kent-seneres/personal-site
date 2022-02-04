import useSWR from "swr";
import { CommentType } from "@lib/redis";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
    .then((res) => res.json())
    .then((data) => data.comments);

const useComments = () => {
  const { data, error } = useSWR<CommentType[]>("/api/comments", fetcher);

  return { data, error };
};

export { useComments };
