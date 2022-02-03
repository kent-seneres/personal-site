import useSWR, { useSWRConfig } from "swr";
import { CommentType } from "@lib/redis";
import { FormEvent } from "react";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
    .then((res) => res.json())
    .then((data) => data.comments);

const useComments = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<CommentType[]>("/api/comments", fetcher);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      content: { value: string };
    };

    const comment: CommentType = {
      name: target.name.value,
      content: target.content.value,
      createdAt: Date.now(),
    };

    const res = await fetch("/api/comments/add", {
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);

    await mutate("/api/comments");
  };

  return {
    data,
    error,
    submit,
  };
};

export { useComments };
