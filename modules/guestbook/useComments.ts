import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { CommentType } from "@lib/redis";
import { FormData } from "./types";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
    .then((res) => res.json())
    .then((data) => data.comments);

const useComments = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<CommentType[]>("/api/comments", fetcher);

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const submit = async (event: FormData) => {
    setSubmitLoading(true);

    const comment: CommentType = {
      name: event.name,
      content: event.content,
      createdAt: Date.now(),
    };

    await fetch("/api/comments/add", {
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async (res) => await res.json())
      .finally(() => setSubmitLoading(false));

    await mutate("/api/comments");
  };

  return {
    data,
    error,
    submit,
    submitLoading,
  };
};

export { useComments };
